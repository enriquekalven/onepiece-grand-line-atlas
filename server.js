/**
 * Grand Line 3D Portal — Hardened Local Static HTTP Server (V2)
 *
 * Security controls implemented per mandatory-secure-web-skills:
 * - Binds strictly to 127.0.0.1 (never 0.0.0.0)
 * - HTTP method allow-list (GET and HEAD only)
 * - Strict Content-Security-Policy, X-Frame-Options: DENY, X-Content-Type-Options: nosniff
 * - Path traversal protection enforcing fs.realpathSync containment inside REAL_PUBLIC_DIR + path.sep
 *   and strict file-extension allow-list
 * - ETag (SHA-256) + Cache-Control for /assets/* to eliminate portrait/map flicker on UI re-render
 * - Generic client error responses without stack trace leakage
 *
 * TODO(security): OAuth/MFA/CSRF/Session/Database controls are intentionally omitted
 * because this application is a local, stateless, read-only educational 3D portal for
 * children with no user accounts, authentication, file uploads, or backend database.
 */

'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const HOST = '127.0.0.1';
const DEFAULT_PORT = Number(process.env.PORT) || 4173;
const PUBLIC_DIR = path.resolve(__dirname, 'public');
const REAL_PUBLIC_DIR = fs.realpathSync(PUBLIC_DIR);

const MIME_BY_EXT = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'application/javascript; charset=utf-8'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.ico', 'image/x-icon']
]);

const etagCache = new Map();

function setSecurityHeaders(res, isStaticImage) {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none';"
  );
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader(
    'Cache-Control',
    isStaticImage ? 'public, max-age=3600, stale-while-revalidate=86400' : 'no-cache'
  );
}

function resolveSafePublicFile(rawPathname) {
  let decoded;
  try {
    decoded = decodeURIComponent(rawPathname);
  } catch (_e) {
    return { error: 400 };
  }

  if (decoded.includes('\0')) {
    return { error: 400 };
  }

  const relativeReq = decoded === '/' ? 'index.html' : decoded.replace(/^\/+/, '');
  const candidatePath = path.resolve(REAL_PUBLIC_DIR, relativeReq);

  if (!candidatePath.startsWith(REAL_PUBLIC_DIR + path.sep)) {
    return { error: 403 };
  }

  const ext = path.extname(candidatePath).toLowerCase();
  const mimeType = MIME_BY_EXT.get(ext);
  if (!mimeType) {
    return { error: 404 };
  }

  let realTarget;
  try {
    realTarget = fs.realpathSync(candidatePath);
  } catch (_err) {
    return { error: 404 };
  }

  if (!realTarget.startsWith(REAL_PUBLIC_DIR + path.sep)) {
    return { error: 403 };
  }

  let stat;
  try {
    stat = fs.statSync(realTarget);
  } catch (_err) {
    return { error: 404 };
  }

  if (!stat.isFile()) {
    return { error: 404 };
  }

  return {
    filePath: realTarget,
    mimeType,
    mtimeMs: stat.mtimeMs,
    size: stat.size,
    isImage: ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.svg'
  };
}

function computeETag(filePath, mtimeMs, size, buffer) {
  const cached = etagCache.get(filePath);
  if (cached && cached.mtimeMs === mtimeMs && cached.size === size) {
    return cached.etag;
  }
  const digest = crypto.createHash('sha256').update(buffer).digest('hex').slice(0, 24);
  const etag = `"${digest}"`;
  etagCache.set(filePath, { mtimeMs, size, etag });
  return etag;
}

function createPortalServer() {
  return http.createServer((req, res) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      setSecurityHeaders(res, false);
      res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8', Allow: 'GET, HEAD' });
      res.end('Method Not Allowed');
      return;
    }

    let pathname = '/';
    try {
      const parsedUrl = new URL(req.url || '/', `http://${HOST}:${DEFAULT_PORT}`);
      pathname = parsedUrl.pathname;
    } catch (_err) {
      setSecurityHeaders(res, false);
      res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Bad Request');
      return;
    }

    const resolved = resolveSafePublicFile(pathname);
    if (resolved.error) {
      setSecurityHeaders(res, false);
      const status = resolved.error;
      const msg =
        status === 400 ? 'Bad Request' : status === 403 ? 'Forbidden' : 'Not Found';
      res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(msg);
      return;
    }

    setSecurityHeaders(res, resolved.isImage);

    fs.readFile(resolved.filePath, (err, content) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Internal Server Error');
        return;
      }

      const etag = computeETag(resolved.filePath, resolved.mtimeMs, resolved.size, content);
      res.setHeader('ETag', etag);

      if (req.headers['if-none-match'] === etag) {
        res.writeHead(304);
        res.end();
        return;
      }

      res.writeHead(200, {
        'Content-Type': resolved.mimeType,
        'Content-Length': content.length
      });
      if (req.method === 'HEAD') {
        res.end();
        return;
      }
      res.end(content);
    });
  });
}

if (require.main === module) {
  const server = createPortalServer();
  server.listen(DEFAULT_PORT, HOST, () => {
    process.stdout.write(`Grand Line 3D Portal V2 listening on http://${HOST}:${DEFAULT_PORT}\n`);
  });
}

module.exports = { createPortalServer, HOST, DEFAULT_PORT, PUBLIC_DIR };

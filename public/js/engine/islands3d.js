/**
 * Grand Line 3D Portal — All 18 Sculpted 3D Island Landmarks Renderer
 * Gives every single One Piece location its own recognizable animated silhouette on the 3D Globe!
 */

'use strict';

(function (root) {
  function drawSculptedIsland(ctx, sx, sy, loc, elapsed) {
    const shape = loc.islandShape || 'island';
    ctx.save();
    ctx.translate(sx, sy);

    // Base island platform color by biome
    const baseFill =
      shape === 'pyramid'
        ? '#d97706'
        : shape === 'cloud-bell'
        ? '#fef08a'
        : shape === 'peaks' || shape === 'x-mountain'
        ? '#b91c1c'
        : shape === 'cake'
        ? '#f472b6'
        : shape === 'fortress'
        ? '#475569'
        : shape === 'bubble'
        ? '#0d9488'
        : '#15803d';

    ctx.fillStyle = baseFill;
    ctx.strokeStyle = '#fde047';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.ellipse(0, 8, 16, 6.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    if (shape === 'windmill') {
      // Windmill Village tower + spinning blades!
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(-3.5, -5, 7, 13);
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.moveTo(-5, -5);
      ctx.lineTo(0, -10);
      ctx.lineTo(5, -5);
      ctx.closePath();
      ctx.fill();
      ctx.save();
      ctx.translate(0, -4);
      ctx.rotate(elapsed * 1.8);
      ctx.strokeStyle = '#fde047';
      ctx.lineWidth = 2;
      for (let k = 0; k < 4; k++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos((k * Math.PI) / 2) * 9, Math.sin((k * Math.PI) / 2) * 9);
        ctx.stroke();
      }
      ctx.restore();
    } else if (shape === 'tree') {
      // Ohara Giant Tree of Knowledge
      ctx.fillStyle = '#78350f';
      ctx.fillRect(-3, -4, 6, 12);
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.arc(0, -7, 9, 0, Math.PI * 2);
      ctx.arc(-6, -4, 6, 0, Math.PI * 2);
      ctx.arc(6, -4, 6, 0, Math.PI * 2);
      ctx.fill();
    } else if (shape === 'castle') {
      // North Blue / Germa twin castle spires
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(-9, -3, 18, 10);
      ctx.fillRect(-10, -8, 5, 6);
      ctx.fillRect(5, -8, 5, 6);
      ctx.fillStyle = '#6366f1';
      ctx.fillRect(-2, -10, 4, 7);
    } else if (shape === 'gears') {
      // Karakuri spinning steampunk gear
      ctx.save();
      ctx.translate(0, 0);
      ctx.rotate(elapsed * 1.4);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, 7, 0, Math.PI * 2);
      ctx.stroke();
      for (let g = 0; g < 6; g++) {
        const a = (g * Math.PI) / 3;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * 6, Math.sin(a) * 6);
        ctx.lineTo(Math.cos(a) * 10, Math.sin(a) * 10);
        ctx.stroke();
      }
      ctx.restore();
    } else if (shape === 'peaks') {
      // Red Line towering crimson cliffs
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.moveTo(-13, 8);
      ctx.lineTo(-6, -9);
      ctx.lineTo(0, 2);
      ctx.lineTo(6, -11);
      ctx.lineTo(13, 8);
      ctx.closePath();
      ctx.fill();
    } else if (shape === 'seaking') {
      // Calm Belt striped Sea King serpentine coils!
      ctx.strokeStyle = '#2dd4bf';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(-6, 4, 6, Math.PI, 0);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(6, 4, 6, Math.PI, 0);
      ctx.stroke();
    } else if (shape === 'x-mountain') {
      // Reverse Mountain + 4 blue uphill canal streams
      ctx.fillStyle = '#991b1b';
      ctx.beginPath();
      ctx.moveTo(-14, 8);
      ctx.lineTo(0, -10);
      ctx.lineTo(14, 8);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(-10, 7);
      ctx.lineTo(0, -9);
      ctx.lineTo(10, 7);
      ctx.stroke();
    } else if (shape === 'pyramid') {
      // Alabasta Golden Pyramid
      ctx.fillStyle = '#fbbf24';
      ctx.strokeStyle = '#92400e';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(-12, 8);
      ctx.lineTo(0, -9);
      ctx.lineTo(12, 8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    } else if (shape === 'cloud-bell') {
      // Skypiea Sea Cloud + Giant Jack Beanstalk + Shandora Golden Bell
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.arc(-7, 7, 6, 0, Math.PI * 2);
      ctx.arc(0, 6, 7, 0, Math.PI * 2);
      ctx.arc(8, 7, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#16a34a';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 6);
      ctx.lineTo(0, -10);
      ctx.stroke();
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(5, -6, 4.5, 0, Math.PI * 2);
      ctx.fill();
    } else if (shape === 'fountain') {
      // Water 7 Aqua Fountain City
      ctx.fillStyle = '#bae6fd';
      ctx.fillRect(-10, 2, 20, 5);
      ctx.fillRect(-6, -3, 12, 5);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, -3);
      ctx.quadraticCurveTo(-9, -12, -12, 4);
      ctx.moveTo(0, -3);
      ctx.quadraticCurveTo(9, -12, 12, 4);
      ctx.stroke();
    } else if (shape === 'fortress') {
      // Impel Down underwater tower + Gates of Justice
      ctx.fillStyle = '#94a3b8';
      ctx.beginPath();
      ctx.moveTo(-9, -7);
      ctx.lineTo(9, -7);
      ctx.lineTo(6, 9);
      ctx.lineTo(-6, 9);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 1.8;
      ctx.strokeRect(-7, -5, 14, 11);
    } else if (shape === 'mangrove') {
      // Sabaody Yarukiman Mangrove + floating resin bubbles!
      ctx.strokeStyle = '#a16207';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(-4, 8);
      ctx.lineTo(0, -4);
      ctx.lineTo(4, 8);
      ctx.stroke();
      ctx.fillStyle = '#4ade80';
      ctx.beginPath();
      ctx.ellipse(0, -6, 11, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      const bY = -12 - ((elapsed * 8) % 8);
      ctx.strokeStyle = '#e0f2fe';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(9, bY, 3.2, 0, Math.PI * 2);
      ctx.stroke();
    } else if (shape === 'bubble') {
      // Fish-Man Island Double Rainbow Bubble
      ctx.strokeStyle = '#67e8f9';
      ctx.fillStyle = 'rgba(103, 232, 249, 0.26)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 1, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.strokeStyle = '#f472b6';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 1, 12.5, 0, Math.PI * 2);
      ctx.stroke();
    } else if (shape === 'colosseum') {
      // Dressrosa Corrida Colosseum
      ctx.fillStyle = '#fde68a';
      ctx.fillRect(-11, -3, 22, 10);
      ctx.fillStyle = '#78350f';
      for (let a = -7; a <= 7; a += 5) {
        ctx.fillRect(a - 1.5, 0, 3, 6);
      }
    } else if (shape === 'elephant') {
      // Zou — Zunesha the Giant Walking Elephant!
      ctx.fillStyle = '#94a3b8';
      ctx.beginPath();
      ctx.ellipse(1, -1, 10, 7, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(-5, 3, 3, 8);
      ctx.fillRect(3, 3, 3, 8);
      // Long trunk
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 3.2;
      ctx.beginPath();
      ctx.moveTo(-8, -2);
      ctx.quadraticCurveTo(-14, 4, -11, 11);
      ctx.stroke();
      // Whale tree crown on back
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.arc(2, -8, 5, 0, Math.PI * 2);
      ctx.fill();
    } else if (shape === 'cake') {
      // Whole Cake Chateau multi-tier frosted cake!
      ctx.fillStyle = '#fbcfe8';
      ctx.fillRect(-11, 2, 22, 6);
      ctx.fillStyle = '#fdf2f8';
      ctx.fillRect(-8, -3, 16, 5);
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(0, -6, 3, 0, Math.PI * 2);
      ctx.fill();
    } else if (shape === 'wano-skull') {
      // Wano Mt. Fuji + Onigashima Red-Horned Skull Dome
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.moveTo(-9, 7);
      ctx.lineTo(0, -9);
      ctx.lineTo(9, 7);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.arc(-10, -3, 6, Math.PI * 0.6, Math.PI * 1.4);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(10, -3, 6, -Math.PI * 0.4, Math.PI * 0.4);
      ctx.stroke();
    } else if (shape === 'x-treasure') {
      // Laugh Tale 4 Crimson Road Poneglyph Laser X + Gold Crown Glow
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-16, -11);
      ctx.lineTo(16, 11);
      ctx.moveTo(16, -11);
      ctx.lineTo(-16, 11);
      ctx.stroke();
    }

    ctx.restore();
  }

  const payload = { drawSculptedIsland };
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = payload;
  }
  root.OP_ISLANDS_3D = payload;
})(typeof window !== 'undefined' ? window : globalThis);

/**
 * Grand Line 3D Portal — Interactive 3D Globe, Canonical 45° X-Axis, Pinch-Zoom,
 * Manga/Anime Maps Atlas, Shortest-Arc Ship Voyage, Pre-Cached 3D Devil Fruits & Radar Charts
 */

'use strict';

(function (root) {
  const DEG2RAD = Math.PI / 180;

  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function lerpAngle(a, b, t) {
    let diff = ((b - a + Math.PI) % (Math.PI * 2)) - Math.PI;
    if (diff < -Math.PI) diff += Math.PI * 2;
    return a + diff * t;
  }

  function latLonToVec3(latDeg, lonDeg, radiusScale) {
    const r = radiusScale || 1;
    const lat = latDeg * DEG2RAD;
    const lon = lonDeg * DEG2RAD;
    const cosLat = Math.cos(lat);
    return {
      x: r * cosLat * Math.sin(lon),
      y: r * Math.sin(lat),
      z: r * cosLat * Math.cos(lon)
    };
  }

  function rotatePoint(pt, yaw, pitch, roll) {
    const cosY = Math.cos(yaw);
    const sinY = Math.sin(yaw);
    const x1 = pt.x * cosY + pt.z * sinY;
    const z1 = -pt.x * sinY + pt.z * cosY;

    const cosP = Math.cos(pitch);
    const sinP = Math.sin(pitch);
    const y2 = pt.y * cosP - z1 * sinP;
    const z2 = pt.y * sinP + z1 * cosP;

    if (!roll) {
      return { x: x1, y: y2, z: z2 };
    }
    const cosR = Math.cos(roll);
    const sinR = Math.sin(roll);
    return {
      x: x1 * cosR + y2 * sinR,
      y: -x1 * sinR + y2 * cosR,
      z: z2
    };
  }

  class OnePiece3DEngine {
    constructor(canvas, callbacks) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.callbacks = callbacks || {};

      // 'globe' | 'manga-map' | 'timeline' | 'devil-fruit'
      this.mode = 'globe';
      this.eraFilter = 'wano';
      this.laughTaleUnlocked = false;

      // Respect OS reduced-motion preference on startup
      const reducedMotion =
        window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // 3D Globe Camera state (starts facing Reverse Mountain with Canonical 45° X-Tilt!)
      this.yaw = Math.PI * 0.42;
      this.pitch = 0.08;
      this.targetYaw = Math.PI * 0.42;
      this.targetPitch = 0.08;
      this.canonicalTilt = true;
      this.roll = Math.PI * 0.25;
      this.targetRoll = Math.PI * 0.25;
      this.zoom = 1.0;
      this.targetZoom = 1.0;
      this.autoRotate = !reducedMotion;

      // 2D Manga Map state
      this.activeMapId = 'grandline-sea-chart';
      this.mapPanX = 0;
      this.mapPanY = 0;
      this.mapZoom = 1.0;
      this.targetMapZoom = 1.0;
      this.selectedHotspotIndex = 0;

      // Multi-Pointer Drag & Pinch-to-Zoom state
      this.activePointers = new Map();
      this.lastPinchDist = 0;
      this.isDragging = false;
      this.dragStartX = 0;
      this.dragStartY = 0;
      this.pointerMoved = false;
      this.hoveredPinId = null;
      this.selectedPinId = 'east-blue';
      this.projectedPins = [];

      // Timeline Ship state
      this.activeArcIndex = 0;
      this.shipProgress = 0;
      this.targetShipProgress = 0;

      // Pre-cached Devil Fruit & Haki state
      this.activeFruit = window.ONE_PIECE_DATA.devilFruits[0];
      this.cachedFruitGeometry = [];
      this.buildFruitGeometry(this.activeFruit);
      this.powerBurstTimer = 0;
      this.hakiMode = null;
      this.hakiBurstTimer = 0;

      this.charImages = {};
      this.mapImages = {};
      this.fruitSprites = {};
      this.fruitCards = {};
      this.preloadAssets();

      this.stars = [];
      for (let i = 0; i < 120; i++) {
        this.stars.push({
          x: Math.random(),
          y: Math.random(),
          size: 0.6 + Math.random() * 1.7,
          phase: Math.random() * Math.PI * 2
        });
      }

      this.particles = [];
      for (let i = 0; i < 85; i++) {
        this.particles.push({
          angle: Math.random() * Math.PI * 2,
          elev: (Math.random() - 0.5) * Math.PI,
          dist: 0.45 + Math.random() * 1.35,
          speed: 0.6 + Math.random() * 1.7,
          size: 2 + Math.random() * 4.2,
          offset: Math.random() * Math.PI * 2
        });
      }

      this.isLoopRunning = true;
      this.lastTime = performance.now();
      this.elapsed = 0;

      this.bindEvents();
      this.handleResize();
      this.animate = this.animate.bind(this);
      requestAnimationFrame(this.animate);
    }

    preloadAssets() {
      const data = window.ONE_PIECE_DATA;
      (data.characters || []).forEach((ch) => {
        if (ch.image) {
          const img = new Image();
          img.src = ch.image;
          this.charImages[ch.id] = img;
        }
        if (ch.altImage) {
          const altImg = new Image();
          altImg.src = ch.altImage;
          this.charImages[ch.id + '-alt'] = altImg;
        }
      });
      (data.canonicalMaps || []).forEach((m) => {
        const img = new Image();
        img.src = m.imageUrl;
        this.mapImages[m.id] = img;
      });
      (data.devilFruits || []).forEach((df) => {
        if (df.sprite) {
          const sp = new Image();
          sp.src = df.sprite;
          this.fruitSprites[df.id] = sp;
        }
        if (df.image) {
          const card = new Image();
          card.src = df.image;
          this.fruitCards[df.id] = card;
        }
      });
    }

    buildFruitGeometry(fruit) {
      if (!fruit) return;
      const latSteps = 14;
      const lonSteps = 20;
      const geom = [];
      for (let i = 0; i <= latSteps; i++) {
        const v = i / latSteps;
        const lat = (v - 0.5) * Math.PI;
        let profileR = Math.cos(lat);
        if (fruit.shapeType === 'pear') {
          profileR *= 0.85 + 0.32 * (1 - v);
        } else if (fruit.shapeType === 'heart') {
          profileR *= 0.75 + 0.45 * Math.sin(v * Math.PI);
        } else if (fruit.shapeType === 'flame') {
          profileR *= 0.92 * Math.sin(v * Math.PI);
        } else if (fruit.shapeType === 'dragon') {
          profileR *= 0.95 + 0.12 * Math.cos(v * 12);
        } else if (fruit.shapeType === 'cloud') {
          profileR *= 0.88 + 0.14 * Math.sin(v * Math.PI * 3);
        }

        for (let j = 0; j < lonSteps; j++) {
          const lon = (j / lonSteps) * Math.PI * 2;
          const bump = 1 + 0.06 * Math.sin(lon * 6 + lat * 4);
          geom.push({
            v,
            basePt: {
              x: profileR * bump * Math.sin(lon),
              y: Math.sin(lat) * (fruit.shapeType === 'pear' ? 1.15 : 1.0),
              z: profileR * bump * Math.cos(lon)
            },
            rotPt: { x: 0, y: 0, z: 0 },
            hasSwirl: (i + j) % 3 === 0 && i > 2 && i < latSteps - 2
          });
        }
      }
      this.cachedFruitGeometry = geom;
    }

    bindEvents() {
      window.addEventListener('resize', () => this.handleResize());

      // Battery saver: pause 60fps loop while tab is hidden
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.isLoopRunning = false;
        } else if (!this.isLoopRunning) {
          this.isLoopRunning = true;
          this.lastTime = performance.now();
          requestAnimationFrame(this.animate);
        }
      });

      this.canvas.addEventListener('pointerdown', (e) => {
        this.activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
        try {
          this.canvas.setPointerCapture(e.pointerId);
        } catch (_err) {}

        if (this.activePointers.size === 2) {
          const pts = Array.from(this.activePointers.values());
          this.lastPinchDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
          this.pointerMoved = true;
          return;
        }

        this.isDragging = true;
        this.pointerMoved = false;
        this.dragStartX = e.clientX;
        this.dragStartY = e.clientY;
        this.autoRotate = false;
      });

      this.canvas.addEventListener('pointermove', (e) => {
        if (this.activePointers.has(e.pointerId)) {
          this.activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
        }

        // Two-finger tablet / trackpad Pinch-to-Zoom!
        if (this.activePointers.size === 2) {
          const pts = Array.from(this.activePointers.values());
          const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
          if (this.lastPinchDist > 10) {
            const deltaScale = (dist - this.lastPinchDist) * 0.0055;
            if (this.mode === 'manga-map') {
              this.targetMapZoom = clamp(this.targetMapZoom + deltaScale, 0.85, 2.5);
            } else {
              this.targetZoom = clamp(this.targetZoom + deltaScale, 0.72, 1.9);
            }
          }
          this.lastPinchDist = dist;
          return;
        }

        const rect = this.canvas.getBoundingClientRect();
        const localX = e.clientX - rect.left;
        const localY = e.clientY - rect.top;

        if (this.isDragging) {
          const dx = e.clientX - this.dragStartX;
          const dy = e.clientY - this.dragStartY;
          if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
            this.pointerMoved = true;
          }
          this.dragStartX = e.clientX;
          this.dragStartY = e.clientY;

          if (this.mode === 'manga-map') {
            this.mapPanX = clamp(this.mapPanX + dx, -420, 420);
            this.mapPanY = clamp(this.mapPanY + dy, -300, 300);
          } else {
            // Un-rotate drag vector by active roll so screen-space dragging feels natural!
            const activeRoll = this.mode === 'devil-fruit' ? 0 : this.roll;
            const cosR = Math.cos(activeRoll);
            const sinR = Math.sin(activeRoll);
            const unrotDx = dx * cosR - dy * sinR;
            const unrotDy = dx * sinR + dy * cosR;

            this.targetYaw -= unrotDx * 0.0075;
            this.targetPitch = clamp(this.targetPitch + unrotDy * 0.0065, -1.15, 1.15);
            this.yaw = this.targetYaw;
            this.pitch = this.targetPitch;
          }
          return;
        }

        if (this.mode === 'globe' || this.mode === 'timeline' || this.mode === 'manga-map') {
          let found = null;
          for (let i = this.projectedPins.length - 1; i >= 0; i--) {
            const p = this.projectedPins[i];
            if (Math.hypot(localX - p.screenX, localY - p.screenY) <= (p.hitRadius || 22)) {
              found = p.id;
              break;
            }
          }
          if (found !== this.hoveredPinId) {
            this.hoveredPinId = found;
            this.canvas.style.cursor = found ? 'pointer' : 'grab';
          }
        }
      });

      const endPointer = (e) => {
        this.activePointers.delete(e.pointerId);
        if (this.activePointers.size < 2) {
          this.lastPinchDist = 0;
        }
        if (!this.isDragging) return;
        if (this.activePointers.size === 0) {
          this.isDragging = false;
        }
        try {
          this.canvas.releasePointerCapture(e.pointerId);
        } catch (_err) {}

        if (!this.pointerMoved) {
          const rect = this.canvas.getBoundingClientRect();
          const localX = e.clientX - rect.left;
          const localY = e.clientY - rect.top;

          for (let i = this.projectedPins.length - 1; i >= 0; i--) {
            const p = this.projectedPins[i];
            if (Math.hypot(localX - p.screenX, localY - p.screenY) <= (p.hitRadius || 22)) {
              if (this.mode === 'manga-map' && p.hotspot) {
                this.selectedHotspotIndex = p.hotspotIndex;
                this.selectedPinId = p.hotspot.locationId;
                if (typeof this.callbacks.onSelectMapHotspot === 'function') {
                  this.callbacks.onSelectMapHotspot(p.hotspot, p.hotspotIndex);
                }
              } else {
                this.focusLocation(p.id, true);
              }
              break;
            }
          }
        }
      };

      this.canvas.addEventListener('pointerup', endPointer);
      this.canvas.addEventListener('pointercancel', endPointer);

      this.canvas.addEventListener(
        'wheel',
        (e) => {
          e.preventDefault();
          const delta = e.deltaY > 0 ? -0.12 : 0.12;
          if (this.mode === 'manga-map') {
            this.targetMapZoom = clamp(this.targetMapZoom + delta, 0.85, 2.5);
          } else {
            this.targetZoom = clamp(this.targetZoom + delta, 0.72, 1.9);
          }
        },
        { passive: false }
      );
    }

    handleResize() {
      const rect = this.canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.width = Math.max(300, rect.width);
      this.height = Math.max(350, rect.height);
      this.canvas.width = Math.floor(this.width * dpr);
      this.canvas.height = Math.floor(this.height * dpr);
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    isEraAllowed(itemEra) {
      return window.OP_HELPERS.isEraAllowed(itemEra, this.eraFilter);
    }

    setEraFilter(era) {
      this.eraFilter = era;
    }

    setLaughTaleUnlocked(flag) {
      this.laughTaleUnlocked = Boolean(flag);
    }

    toggleCanonicalTilt() {
      this.canonicalTilt = !this.canonicalTilt;
      this.targetRoll = this.canonicalTilt ? Math.PI * 0.25 : 0;
      return this.canonicalTilt;
    }

    setMode(mode) {
      this.mode = mode;
      if (mode === 'devil-fruit') {
        this.targetPitch = 0.18;
        this.targetZoom = 1.05;
        this.autoRotate = true;
      } else if (mode === 'timeline') {
        this.autoRotate = false;
        this.focusTimelineArc(this.activeArcIndex);
      } else if (mode === 'manga-map') {
        this.autoRotate = false;
      } else {
        this.targetZoom = 1.0;
      }
    }

    setActiveMangaMap(mapId) {
      this.activeMapId = mapId;
      this.mapPanX = 0;
      this.mapPanY = 0;
      this.targetMapZoom = 1.0;
      this.selectedHotspotIndex = 0;
    }

    getFilteredHotspotsForMap(mapObj) {
      const list = (mapObj && mapObj.hotspots) || [];
      return list.filter((hs) => this.isEraAllowed(hs.era || mapObj.era));
    }

    focusLocation(locationId, notifyCallback) {
      const loc = window.ONE_PIECE_DATA.worldLocations.find((l) => l.id === locationId);
      if (!loc) return;
      this.selectedPinId = loc.id;
      this.autoRotate = false;
      this.targetYaw = -loc.lon * DEG2RAD;
      this.targetPitch = clamp(loc.lat * DEG2RAD, -1.0, 1.0);
      if (notifyCallback && typeof this.callbacks.onSelectLocation === 'function') {
        this.callbacks.onSelectLocation(loc);
      }
    }

    focusTimelineArc(arcIndex) {
      const arcs = window.ONE_PIECE_DATA.timelineArcs.filter((a) => this.isEraAllowed(a.era));
      if (!arcs.length) return;
      const clampedIndex = clamp(arcIndex, 0, arcs.length - 1);
      this.activeArcIndex = clampedIndex;
      this.targetShipProgress = clampedIndex;
      this.focusLocation(arcs[clampedIndex].locationId, false);
    }

    setDevilFruit(fruit) {
      if (!fruit) return;
      this.activeFruit = fruit;
      this.buildFruitGeometry(fruit);
      this.powerBurstTimer = 2.4;
      this.hakiMode = null;
    }

    triggerPowerBurst() {
      this.powerBurstTimer = 4.2;
    }

    triggerHakiDemo(hakiType) {
      this.hakiMode = hakiType;
      this.hakiBurstTimer = 4.5;
    }

    panOrRotateBy(dxStep, dyStep) {
      if (this.mode === 'manga-map') {
        this.mapPanX = clamp(this.mapPanX + dxStep * 45, -420, 420);
        this.mapPanY = clamp(this.mapPanY + dyStep * 45, -300, 300);
      } else {
        this.autoRotate = false;
        this.targetYaw += dxStep * 0.18;
        this.targetPitch = clamp(this.targetPitch + dyStep * 0.15, -1.1, 1.1);
      }
    }

    resetCamera() {
      if (this.mode === 'manga-map') {
        this.mapPanX = 0;
        this.mapPanY = 0;
        this.targetMapZoom = 1.0;
      } else {
        this.targetYaw = Math.PI * 0.5;
        this.targetPitch = 0.0;
        this.targetZoom = 1.0;
        this.autoRotate = false;
      }
    }

    animate(now) {
      if (!this.isLoopRunning) return;
      const dt = Math.min(0.05, (now - this.lastTime) / 1000);
      this.lastTime = now;
      this.elapsed += dt;

      if (this.autoRotate && !this.isDragging && this.mode !== 'manga-map') {
        this.targetYaw += dt * (this.mode === 'devil-fruit' ? 0.55 : 0.13);
      }

      this.yaw = lerpAngle(this.yaw, this.targetYaw, clamp(dt * 7, 0, 1));
      this.pitch = lerp(this.pitch, this.targetPitch, clamp(dt * 7, 0, 1));
      this.roll = lerp(this.roll, this.targetRoll, clamp(dt * 7, 0, 1));
      this.zoom = lerp(this.zoom, this.targetZoom, clamp(dt * 8, 0, 1));
      this.mapZoom = lerp(this.mapZoom, this.targetMapZoom, clamp(dt * 8, 0, 1));
      this.shipProgress = lerp(this.shipProgress, this.targetShipProgress, clamp(dt * 4.5, 0, 1));

      if (this.powerBurstTimer > 0) this.powerBurstTimer = Math.max(0, this.powerBurstTimer - dt);
      if (this.hakiBurstTimer > 0) this.hakiBurstTimer = Math.max(0, this.hakiBurstTimer - dt);

      this.render();
      requestAnimationFrame(this.animate);
    }

    render() {
      const ctx = this.ctx;
      const w = this.width;
      const h = this.height;

      const bgGrad = ctx.createRadialGradient(
        w * 0.5,
        h * 0.48,
        20,
        w * 0.5,
        h * 0.5,
        Math.max(w, h) * 0.75
      );
      bgGrad.addColorStop(0, '#0f2942');
      bgGrad.addColorStop(0.55, '#081526');
      bgGrad.addColorStop(1, '#040b14');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < this.stars.length; i++) {
        const s = this.stars[i];
        const alpha = 0.25 + 0.55 * Math.abs(Math.sin(this.elapsed * 1.4 + s.phase));
        ctx.fillStyle = `rgba(226, 242, 254, ${alpha.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (this.mode === 'manga-map') {
        this.renderMangaMapScene(ctx, w, h);
      } else if (this.mode === 'devil-fruit') {
        this.renderDevilFruitScene(ctx, w, h);
      } else {
        this.renderPlanetGlobe(ctx, w, h);
      }

      if (this.hakiBurstTimer > 0 && this.hakiMode) {
        this.renderHakiOverlay(ctx, w, h);
      }
    }

    renderMangaMapScene(ctx, w, h) {
      this.projectedPins = [];
      const mapObj =
        window.ONE_PIECE_DATA.canonicalMaps.find((m) => m.id === this.activeMapId) ||
        window.ONE_PIECE_DATA.canonicalMaps[0];
      const img = this.mapImages[mapObj.id];

      if (!img || !img.complete || img.naturalWidth === 0) {
        ctx.fillStyle = '#facc15';
        ctx.font = '700 15px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Loading Canonical Manga Map Artwork...', w * 0.5, h * 0.5);
        return;
      }

      const pad = 18;
      const availW = w - pad * 2;
      const availH = h - pad * 2;
      const imgAspect = img.naturalWidth / img.naturalHeight;
      let drawW = availW;
      let drawH = drawW / imgAspect;
      if (drawH > availH) {
        drawH = availH;
        drawW = drawH * imgAspect;
      }

      drawW *= this.mapZoom;
      drawH *= this.mapZoom;

      const drawX = (w - drawW) * 0.5 + this.mapPanX;
      const drawY = (h - drawH) * 0.5 + this.mapPanY;

      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
      ctx.shadowBlur = 24;
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 3;
      ctx.strokeRect(drawX - 2, drawY - 2, drawW + 4, drawH + 4);
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
      ctx.restore();

      const hotspots = this.getFilteredHotspotsForMap(mapObj);
      for (let i = 0; i < hotspots.length; i++) {
        const hs = hotspots[i];
        const hx = drawX + (hs.x / 100) * drawW;
        const hy = drawY + (hs.y / 100) * drawH;
        const isSelected = this.selectedHotspotIndex === i;
        const isHovered = this.hoveredPinId === `hs-${i}`;

        const pulse = 18 + Math.sin(this.elapsed * 4.5 + i) * 4;
        ctx.save();
        ctx.strokeStyle = isSelected ? '#facc15' : '#38bdf8';
        ctx.lineWidth = isSelected ? 3 : 2;
        ctx.fillStyle = isSelected ? 'rgba(250, 204, 21, 0.26)' : 'rgba(14, 165, 233, 0.18)';
        ctx.beginPath();
        ctx.arc(hx, hy, pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        const medalR = isSelected || isHovered ? 19 : 15;
        const charImg = this.charImages[hs.characterId];
        if (charImg && charImg.complete && charImg.naturalWidth > 0) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(hx, hy, medalR, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(charImg, hx - medalR, hy - medalR, medalR * 2, medalR * 2);
          ctx.restore();
        } else {
          ctx.fillStyle = '#0f172a';
          ctx.beginPath();
          ctx.arc(hx, hy, medalR, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.strokeStyle = isSelected ? '#facc15' : '#ffffff';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(hx, hy, medalR, 0, Math.PI * 2);
        ctx.stroke();

        if (isSelected || isHovered) {
          ctx.font = '800 11.5px system-ui, sans-serif';
          const tw = ctx.measureText(hs.label).width;
          const bx = clamp(hx - tw * 0.5 - 9, 8, w - tw - 24);
          const by = hy - medalR - 26;
          ctx.fillStyle = 'rgba(5, 13, 24, 0.94)';
          ctx.strokeStyle = '#facc15';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.roundRect(bx, by, tw + 18, 22, 6);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#fde047';
          ctx.textAlign = 'center';
          ctx.fillText(hs.label, bx + (tw + 18) * 0.5, by + 15);
        }
        ctx.restore();

        this.projectedPins.push({
          id: `hs-${i}`,
          hotspot: hs,
          hotspotIndex: i,
          screenX: hx,
          screenY: hy,
          hitRadius: 24
        });
      }
    }

    renderPlanetGlobe(ctx, w, h) {
      const cx = w * 0.5;
      const cy = h * 0.52;
      const baseRadius = Math.min(w, h) * 0.34 * this.zoom;

      const atmosGrad = ctx.createRadialGradient(
        cx,
        cy,
        baseRadius * 0.88,
        cx,
        cy,
        baseRadius * 1.25
      );
      atmosGrad.addColorStop(0, 'rgba(56, 189, 248, 0.30)');
      atmosGrad.addColorStop(0.6, 'rgba(14, 165, 233, 0.10)');
      atmosGrad.addColorStop(1, 'rgba(14, 165, 233, 0)');
      ctx.fillStyle = atmosGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius * 1.25, 0, Math.PI * 2);
      ctx.fill();

      const oceanGrad = ctx.createRadialGradient(
        cx - baseRadius * 0.32,
        cy - baseRadius * 0.32,
        baseRadius * 0.08,
        cx,
        cy,
        baseRadius
      );
      oceanGrad.addColorStop(0, '#1e6091');
      oceanGrad.addColorStop(0.45, '#0b3c66');
      oceanGrad.addColorStop(0.85, '#072442');
      oceanGrad.addColorStop(1, '#041529');

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius, 0, Math.PI * 2);
      ctx.fillStyle = oceanGrad;
      ctx.fill();
      ctx.clip();

      ctx.strokeStyle = 'rgba(125, 211, 252, 0.12)';
      ctx.lineWidth = 1;
      for (let lat = -60; lat <= 60; lat += 30) {
        this.drawSphereRing(ctx, cx, cy, baseRadius, (angle) => latLonToVec3(lat, angle, 1.0));
      }
      for (let lon = -150; lon <= 180; lon += 30) {
        this.drawSphereRing(ctx, cx, cy, baseRadius, (angle) => latLonToVec3(angle, lon, 1.0));
      }

      this.drawBeltBand(ctx, cx, cy, baseRadius, 11, 16, 'rgba(20, 184, 166, 0.25)');
      this.drawBeltBand(ctx, cx, cy, baseRadius, -16, -11, 'rgba(20, 184, 166, 0.25)');
      this.drawBeltBand(ctx, cx, cy, baseRadius, -10, 10, 'rgba(250, 204, 21, 0.22)');

      // 7 Log Pose Magnetic Routes in Paradise
      const routeLats = [-7, -4.5, -2, 0, 2.2, 4.8, 7.2];
      ctx.save();
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = 'rgba(253, 224, 71, 0.45)';
      ctx.lineWidth = 1.2;
      for (let r = 0; r < routeLats.length; r++) {
        const peakLat = routeLats[r];
        ctx.beginPath();
        let started = false;
        for (let lon = -90; lon <= 80; lon += 5) {
          const progress = (lon + 90) / 170;
          const arch = Math.sin(progress * Math.PI) * peakLat;
          const pt = rotatePoint(latLonToVec3(arch, lon, 1.003), this.yaw, this.pitch, this.roll);
          if (pt.z > 0) {
            const sx = cx + pt.x * baseRadius;
            const sy = cy - pt.y * baseRadius;
            if (!started) {
              ctx.moveTo(sx, sy);
              started = true;
            } else {
              ctx.lineTo(sx, sy);
            }
          } else {
            started = false;
          }
        }
        ctx.stroke();
      }
      ctx.restore();

      this.drawRedLineContinent(ctx, cx, cy, baseRadius);
      this.drawReverseMountainXCanals(ctx, cx, cy, baseRadius);

      // If all 4 Road Poneglyphs are collected in Wano mode, draw crimson X-beams to Laugh Tale!
      if (this.laughTaleUnlocked && this.eraFilter === 'wano') {
        this.drawRoadPoneglyphBeams(ctx, cx, cy, baseRadius);
      }

      const seaLabels = [
        { text: 'NORTH BLUE', sub: 'Noland & Germa', lat: 34, lon: -135, color: '#a5b4fc' },
        { text: 'EAST BLUE', sub: 'Dawn Island & Roger', lat: 34, lon: -45, color: '#7dd3fc' },
        { text: 'SOUTH BLUE', sub: 'Karakuri & Baterilla', lat: -34, lon: -45, color: '#6ee7b7' },
        { text: 'WEST BLUE', sub: "Ohara & Shanks' Sea", lat: -34, lon: -135, color: '#93c5fd' },
        { text: 'PARADISE (7 ROUTES)', sub: 'Grand Line 1st Half', lat: 0, lon: -22, color: '#fde047' },
        { text: 'NEW WORLD', sub: 'Four Emperors Sea', lat: 0, lon: 138, color: '#fca5a5' }
      ];

      for (let i = 0; i < seaLabels.length; i++) {
        const lbl = seaLabels[i];
        const v = rotatePoint(latLonToVec3(lbl.lat, lbl.lon, 1.01), this.yaw, this.pitch, this.roll);
        if (v.z > 0.18) {
          const sx = cx + v.x * baseRadius;
          const sy = cy - v.y * baseRadius;
          ctx.save();
          ctx.font = '800 11px system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillStyle = lbl.color;
          ctx.globalAlpha = clamp((v.z - 0.18) * 1.4, 0, 0.9);
          ctx.fillText(lbl.text, sx, sy);
          ctx.font = '600 9.5px system-ui, sans-serif';
          ctx.fillStyle = '#e2e8f0';
          ctx.fillText(lbl.sub, sx, sy + 12);
          ctx.restore();
        }
      }

      if (this.mode === 'timeline') {
        this.renderTimelinePathAndShip(ctx, cx, cy, baseRadius);
      }

      ctx.restore(); // end sphere clip

      ctx.strokeStyle = 'rgba(125, 211, 252, 0.45)';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Compass Rose in top-left of Globe showing N / E / S / W alignment!
      this.drawCompassRose(ctx, 42, 44);

      this.renderLocationPins(ctx, cx, cy, baseRadius);
    }

    drawCompassRose(ctx, rx, ry) {
      ctx.save();
      ctx.translate(rx, ry);
      ctx.fillStyle = 'rgba(5, 13, 24, 0.82)';
      ctx.strokeStyle = 'rgba(250, 204, 21, 0.55)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, 26, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.font = '800 9px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#facc15';
      ctx.fillText('N', 0, -14);
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('S', 0, 21);
      ctx.fillText('E', 18, 3);
      ctx.fillText('W', -18, 3);

      // Diagonal X mini-indicator showing current planet axis angle
      ctx.rotate(-this.roll);
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, -10);
      ctx.lineTo(0, 10);
      ctx.stroke();
      ctx.strokeStyle = '#fde047';
      ctx.beginPath();
      ctx.moveTo(-10, 0);
      ctx.lineTo(10, 0);
      ctx.stroke();
      ctx.restore();
    }

    drawRoadPoneglyphBeams(ctx, cx, cy, radius) {
      const target = rotatePoint(latLonToVec3(0, -104, 1.03), this.yaw, this.pitch, this.roll);
      if (target.z <= 0) return;
      const tx = cx + target.x * radius;
      const ty = cy - target.y * radius;
      const sources = [
        { lat: 8, lon: 133 },
        { lat: -5, lon: 148 },
        { lat: 5, lon: 168 },
        { lat: -1, lon: 90 }
      ];
      ctx.save();
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.85)';
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 10;
      ctx.lineWidth = 2.5;
      ctx.setLineDash([6, 4]);
      for (let i = 0; i < sources.length; i++) {
        const sp = rotatePoint(
          latLonToVec3(sources[i].lat, sources[i].lon, 1.03),
          this.yaw,
          this.pitch,
          this.roll
        );
        if (sp.z > -0.2) {
          ctx.beginPath();
          ctx.moveTo(cx + sp.x * radius, cy - sp.y * radius);
          ctx.lineTo(tx, ty);
          ctx.stroke();
        }
      }
      ctx.restore();
    }

    drawReverseMountainXCanals(ctx, cx, cy, radius) {
      const center = rotatePoint(latLonToVec3(0, -90, 1.02), this.yaw, this.pitch, this.roll);
      if (center.z <= 0.05) return;
      const sx = cx + center.x * radius;
      const sy = cy - center.y * radius;
      ctx.save();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3.5;
      for (let a = 0; a < 4; a++) {
        const ang = Math.PI / 4 - this.roll + (a * Math.PI) / 2;
        ctx.beginPath();
        ctx.moveTo(sx + Math.cos(ang) * 22, sy + Math.sin(ang) * 22);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      }
      ctx.restore();
    }

    drawSphereRing(ctx, cx, cy, radius, pointGenerator) {
      ctx.beginPath();
      let started = false;
      for (let deg = -180; deg <= 180; deg += 5) {
        const pt = rotatePoint(pointGenerator(deg), this.yaw, this.pitch, this.roll);
        if (pt.z > 0) {
          const sx = cx + pt.x * radius;
          const sy = cy - pt.y * radius;
          if (!started) {
            ctx.moveTo(sx, sy);
            started = true;
          } else {
            ctx.lineTo(sx, sy);
          }
        } else {
          started = false;
        }
      }
      ctx.stroke();
    }

    drawBeltBand(ctx, cx, cy, radius, latMin, latMax, fillStyle) {
      const steps = 72;
      const topPts = [];
      const botPts = [];
      for (let i = 0; i <= steps; i++) {
        const lon = -180 + (360 * i) / steps;
        topPts.push(rotatePoint(latLonToVec3(latMax, lon, 1.0), this.yaw, this.pitch, this.roll));
        botPts.push(rotatePoint(latLonToVec3(latMin, lon, 1.0), this.yaw, this.pitch, this.roll));
      }

      ctx.fillStyle = fillStyle;
      for (let i = 0; i < steps; i++) {
        if (topPts[i].z > -0.05 && botPts[i].z > -0.05) {
          ctx.beginPath();
          ctx.moveTo(cx + topPts[i].x * radius, cy - topPts[i].y * radius);
          ctx.lineTo(cx + topPts[i + 1].x * radius, cy - topPts[i + 1].y * radius);
          ctx.lineTo(cx + botPts[i + 1].x * radius, cy - botPts[i + 1].y * radius);
          ctx.lineTo(cx + botPts[i].x * radius, cy - botPts[i].y * radius);
          ctx.closePath();
          ctx.fill();
        }
      }
    }

    drawRedLineContinent(ctx, cx, cy, radius) {
      const steps = 90;
      const halfWidthDeg = 6.5;

      const drawHalfMeridian = (centerLon) => {
        for (let i = 0; i < steps; i++) {
          const lat1 = -90 + (180 * i) / steps;
          const lat2 = -90 + (180 * (i + 1)) / steps;
          const p1L = rotatePoint(
            latLonToVec3(lat1, centerLon - halfWidthDeg, 1.015),
            this.yaw,
            this.pitch,
            this.roll
          );
          const p1R = rotatePoint(
            latLonToVec3(lat1, centerLon + halfWidthDeg, 1.015),
            this.yaw,
            this.pitch,
            this.roll
          );
          const p2R = rotatePoint(
            latLonToVec3(lat2, centerLon + halfWidthDeg, 1.015),
            this.yaw,
            this.pitch,
            this.roll
          );
          const p2L = rotatePoint(
            latLonToVec3(lat2, centerLon - halfWidthDeg, 1.015),
            this.yaw,
            this.pitch,
            this.roll
          );

          if (p1L.z > -0.05 || p1R.z > -0.05) {
            ctx.fillStyle = i % 2 === 0 ? 'rgba(220, 38, 38, 0.80)' : 'rgba(185, 28, 28, 0.80)';
            ctx.beginPath();
            ctx.moveTo(cx + p1L.x * radius, cy - p1L.y * radius);
            ctx.lineTo(cx + p1R.x * radius, cy - p1R.y * radius);
            ctx.lineTo(cx + p2R.x * radius, cy - p2R.y * radius);
            ctx.lineTo(cx + p2L.x * radius, cy - p2L.y * radius);
            ctx.closePath();
            ctx.fill();
          }
        }
      };

      drawHalfMeridian(-90);
      drawHalfMeridian(90);
    }

    renderTimelinePathAndShip(ctx, cx, cy, radius) {
      const arcs = window.ONE_PIECE_DATA.timelineArcs.filter((a) => this.isEraAllowed(a.era));
      if (arcs.length < 2) return;

      const locs = arcs.map((a) =>
        window.ONE_PIECE_DATA.worldLocations.find((l) => l.id === a.locationId)
      );
      const lerpLon = window.OP_HELPERS.lerpLonDeg;

      ctx.save();
      ctx.strokeStyle = '#fde047';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#facc15';
      ctx.shadowBlur = 10;

      for (let i = 0; i < locs.length - 1; i++) {
        const locA = locs[i];
        const locB = locs[i + 1];
        if (!locA || !locB) continue;

        ctx.beginPath();
        let started = false;
        const segSteps = 24;
        for (let s = 0; s <= segSteps; s++) {
          const t = s / segSteps;
          const lat = lerp(locA.lat, locB.lat, t);
          const lon = lerpLon(locA.lon, locB.lon, t);
          const alt = 1.02 + lerp(locA.altitude || 0, locB.altitude || 0, t);
          const pt = rotatePoint(latLonToVec3(lat, lon, alt), this.yaw, this.pitch, this.roll);
          if (pt.z > 0) {
            const sx = cx + pt.x * radius;
            const sy = cy - pt.y * radius;
            if (!started) {
              ctx.moveTo(sx, sy);
              started = true;
            } else {
              ctx.lineTo(sx, sy);
            }
          } else {
            started = false;
          }
        }
        ctx.stroke();
      }
      ctx.restore();

      const idx = Math.floor(clamp(this.shipProgress, 0, locs.length - 1));
      const nextIdx = Math.min(locs.length - 1, idx + 1);
      const frac = this.shipProgress - idx;
      const locA = locs[idx];
      const locB = locs[nextIdx] || locA;
      if (locA && locB) {
        const shipLat = lerp(locA.lat, locB.lat, frac);
        const shipLon = lerpLon(locA.lon, locB.lon, frac);
        const shipAlt = 1.05 + lerp(locA.altitude || 0, locB.altitude || 0, frac);
        const pt = rotatePoint(
          latLonToVec3(shipLat, shipLon, shipAlt),
          this.yaw,
          this.pitch,
          this.roll
        );
        if (pt.z > 0) {
          const sx = cx + pt.x * radius;
          const sy = cy - pt.y * radius + Math.sin(this.elapsed * 4.5) * 3;
          this.drawPirateShipIcon(ctx, sx, sy, idx >= 4 ? 'sunny' : 'merry');
        }
      }
    }

    drawPirateShipIcon(ctx, x, y, shipType) {
      ctx.save();
      ctx.translate(x, y);

      ctx.strokeStyle = 'rgba(250, 204, 21, 0.85)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(0, 10, 18, 6, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = shipType === 'sunny' ? '#dc2626' : '#92400e';
      ctx.beginPath();
      ctx.moveTo(-14, 2);
      ctx.lineTo(14, 2);
      ctx.lineTo(10, 10);
      ctx.lineTo(-10, 10);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.roundRect(-10, -14, 20, 14, 3);
      ctx.fill();

      ctx.fillStyle = shipType === 'sunny' ? '#facc15' : '#fef3c7';
      ctx.beginPath();
      ctx.arc(13, 0, 5.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(7, 17, 30, 0.92)';
      ctx.beginPath();
      ctx.roundRect(-48, -32, 96, 16, 8);
      ctx.fill();
      ctx.fillStyle = '#fde047';
      ctx.font = '700 10px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(shipType === 'sunny' ? '⛵ THOUSAND SUNNY' : '⛵ GOING MERRY', 0, -21);

      ctx.restore();
    }

    renderLocationPins(ctx, cx, cy, radius) {
      this.projectedPins = [];
      const locations = window.ONE_PIECE_DATA.worldLocations.filter((l) =>
        this.isEraAllowed(l.era)
      );

      const renderList = [];
      for (let i = 0; i < locations.length; i++) {
        const loc = locations[i];
        const surfacePt = rotatePoint(
          latLonToVec3(loc.lat, loc.lon, 1.0),
          this.yaw,
          this.pitch,
          this.roll
        );
        const elevatedPt = rotatePoint(
          latLonToVec3(loc.lat, loc.lon, 1.0 + (loc.altitude || 0)),
          this.yaw,
          this.pitch,
          this.roll
        );
        if (elevatedPt.z > -0.05) {
          renderList.push({ loc, surfacePt, elevatedPt });
        }
      }

      renderList.sort((a, b) => a.elevatedPt.z - b.elevatedPt.z);

      for (let i = 0; i < renderList.length; i++) {
        const { loc, surfacePt, elevatedPt } = renderList[i];
        const sx = cx + elevatedPt.x * radius;
        const sy = cy - elevatedPt.y * radius;
        const surfX = cx + surfacePt.x * radius;
        const surfY = cy - surfacePt.y * radius;

        const isSelected = loc.id === this.selectedPinId;
        const isHovered = loc.id === this.hoveredPinId;

        if (Math.abs(loc.altitude || 0) > 0.05) {
          ctx.save();
          ctx.strokeStyle = loc.color;
          ctx.lineWidth = 2.5;
          ctx.setLineDash([4, 3]);
          ctx.beginPath();
          ctx.moveTo(surfX, surfY);
          ctx.lineTo(sx, sy);
          ctx.stroke();
          ctx.restore();
        }

        // Render bespoke sculpted 3D landmark for all 18 locations!
        window.OP_ISLANDS_3D.drawSculptedIsland(ctx, sx, sy, loc, this.elapsed);

        if (isSelected || isHovered) {
          const pulseR = 21 + Math.sin(this.elapsed * 5) * 3.5;
          ctx.strokeStyle = loc.color;
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(sx, sy - 6, pulseR, 0, Math.PI * 2);
          ctx.stroke();
        }

        const medalR = isSelected ? 15 : isHovered ? 14 : 11.5;
        const medalY = sy - 10;
        const heroImg = this.charImages[loc.heroCharacterId];

        if (heroImg && heroImg.complete && heroImg.naturalWidth > 0) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(sx, medalY, medalR, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(heroImg, sx - medalR, medalY - medalR, medalR * 2, medalR * 2);
          ctx.restore();
        } else {
          ctx.fillStyle = loc.color;
          ctx.beginPath();
          ctx.arc(sx, medalY, medalR, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.strokeStyle = isSelected ? '#facc15' : '#07111e';
        ctx.lineWidth = isSelected ? 2.5 : 1.8;
        ctx.beginPath();
        ctx.arc(sx, medalY, medalR, 0, Math.PI * 2);
        ctx.stroke();

        if (elevatedPt.z > 0.14 || isSelected || isHovered) {
          const shortName = loc.name.split(' (')[0];
          ctx.font = isSelected
            ? '700 11.5px system-ui, sans-serif'
            : '600 10.5px system-ui, sans-serif';
          const textW = ctx.measureText(shortName).width;
          const boxX = sx - textW * 0.5 - 7;
          const boxY = medalY - medalR - 21;

          ctx.fillStyle = isSelected ? 'rgba(245, 158, 11, 0.95)' : 'rgba(7, 17, 30, 0.88)';
          ctx.strokeStyle = loc.color;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.roundRect(boxX, boxY, textW + 14, 18, 6);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = isSelected ? '#07111e' : '#f8fafc';
          ctx.textAlign = 'center';
          ctx.fillText(shortName, sx, boxY + 12.5);
        }

        this.projectedPins.push({
          id: loc.id,
          screenX: sx,
          screenY: medalY,
          hitRadius: 23
        });
      }
    }

    renderDevilFruitScene(ctx, w, h) {
      const rawFruit = this.activeFruit || window.ONE_PIECE_DATA.devilFruits[0];
      const fruit = window.OP_HELPERS.getDevilFruitForEra(rawFruit, this.eraFilter);
      const cx = w * 0.5;
      const cy = h * 0.51;
      const baseR = Math.min(w, h) * 0.255 * this.zoom;
      const bobY = Math.sin(this.elapsed * 2.2) * (baseR * 0.055);
      const burstMultiplier = this.powerBurstTimer > 0 ? 1.95 : 1.0;

      // 1. Pedestal Drop Shadow & Concentric Golden Akuma no Mi Zukan Astrolabe Rings
      const floorY = cy + baseR * 1.24;
      const shadowScale = 1 - (bobY / (baseR * 0.45)) * 0.2;
      ctx.save();
      ctx.fillStyle = 'rgba(2, 6, 23, 0.62)';
      ctx.beginPath();
      ctx.ellipse(cx, floorY, baseR * 0.66 * shadowScale, baseR * 0.17 * shadowScale, 0, 0, Math.PI * 2);
      ctx.fill();

      for (let r = 1; r <= 3; r++) {
        ctx.strokeStyle = r === 2 ? '#facc15' : fruit.auraColor;
        ctx.globalAlpha = 0.22 + (r === 1 ? 0.24 : 0);
        ctx.lineWidth = r === 1 ? 2.4 : 1.5;
        if (r === 2) ctx.setLineDash([7, 7]);
        else ctx.setLineDash([]);
        ctx.beginPath();
        ctx.ellipse(
          cx,
          floorY,
          baseR * (0.64 + r * 0.27 + Math.sin(this.elapsed * 2.6 + r) * 0.03),
          baseR * (0.17 + r * 0.068),
          0,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      }
      ctx.setLineDash([]);
      ctx.restore();

      // 2. Multi-Stop Elemental Aura Glow Behind Canonical Fruit
      const auraGrad = ctx.createRadialGradient(
        cx,
        cy + bobY,
        baseR * 0.14,
        cx,
        cy + bobY,
        baseR * (this.powerBurstTimer > 0 ? 2.15 : 1.58)
      );
      auraGrad.addColorStop(0, fruit.secondaryColor + 'cc');
      auraGrad.addColorStop(0.38, fruit.primaryColor + '88');
      auraGrad.addColorStop(0.72, fruit.auraColor + '33');
      auraGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = auraGrad;
      ctx.beginPath();
      ctx.arc(cx, cy + bobY, baseR * 2.15, 0, Math.PI * 2);
      ctx.fill();

      // Precompute 3D orbital particles & back/front split for true 3D occlusion
      const projectedParticles = [];
      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        const ang = p.angle + this.elapsed * p.speed * burstMultiplier;
        const rad = baseR * p.dist * (this.powerBurstTimer > 0 ? 1.24 : 0.96);
        const pt3 = rotatePoint(
          {
            x: Math.cos(ang) * Math.cos(p.elev),
            y: Math.sin(p.elev) + Math.sin(this.elapsed * 2 + p.offset) * 0.14,
            z: Math.sin(ang) * Math.cos(p.elev)
          },
          this.yaw * 0.55,
          this.pitch * 0.55,
          0
        );
        projectedParticles.push({ p, pt3, rad, idx: i });
      }

      const drawParticleLayer = (frontPass) => {
        for (let i = 0; i < projectedParticles.length; i++) {
          const item = projectedParticles[i];
          if (frontPass ? item.pt3.z < 0 : item.pt3.z >= 0) continue;
          const px = cx + item.pt3.x * item.rad;
          const py = cy + bobY - item.pt3.y * item.rad;
          const rSize = item.p.size * (this.powerBurstTimer > 0 ? 1.48 : 0.92);

          ctx.fillStyle = item.idx % 2 === 0 ? fruit.auraColor : fruit.secondaryColor;
          ctx.globalAlpha = clamp((item.pt3.z + 1.25) * 0.45, 0.14, 0.95);
          ctx.beginPath();
          ctx.arc(px, py, rSize, 0, Math.PI * 2);
          ctx.fill();

          // Canonical Karakusa mini-spiral runes on select orbital motes
          if (item.idx % 9 === 0 && rSize > 2.6) {
            ctx.save();
            ctx.translate(px, py);
            ctx.rotate(this.elapsed * 1.8 + item.idx);
            ctx.strokeStyle = '#facc15';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            for (let a = 0; a < Math.PI * 2.8; a += 0.45) {
              const sr = (a / (Math.PI * 2.8)) * (rSize * 2.1);
              if (a === 0) ctx.moveTo(Math.cos(a) * sr, Math.sin(a) * sr);
              else ctx.lineTo(Math.cos(a) * sr, Math.sin(a) * sr);
            }
            ctx.stroke();
            ctx.restore();
          }
        }
        ctx.globalAlpha = 1;
      };

      // Helper to draw 3D tilted elemental halo ring (back half z < 0, front half z >= 0)
      const drawOrbitalHaloArc = (frontPass) => {
        ctx.save();
        ctx.strokeStyle = fruit.auraColor;
        ctx.globalAlpha = this.powerBurstTimer > 0 ? 0.85 : 0.45;
        ctx.lineWidth = this.powerBurstTimer > 0 ? 3.2 : 2.0;
        ctx.beginPath();
        let started = false;
        for (let deg = 0; deg <= 360; deg += 5) {
          const radAng = (deg * Math.PI) / 180 + this.elapsed * 0.9;
          const ringPt = rotatePoint(
            { x: Math.cos(radAng) * 1.18, y: Math.sin(radAng * 2) * 0.08, z: Math.sin(radAng) * 1.18 },
            this.yaw * 0.65,
            this.pitch * 0.65 + 0.35,
            0.22
          );
          const visible = frontPass ? ringPt.z >= 0 : ringPt.z < 0;
          if (visible) {
            const sx = cx + ringPt.x * baseR;
            const sy = cy + bobY - ringPt.y * baseR;
            if (!started) {
              ctx.moveTo(sx, sy);
              started = true;
            } else {
              ctx.lineTo(sx, sy);
            }
          } else {
            started = false;
          }
        }
        ctx.stroke();
        ctx.restore();
      };

      // 3. Back Pass (Behind Devil Fruit)
      drawOrbitalHaloArc(false);
      drawParticleLayer(false);

      // 4. Centerpiece: Canonical Akuma no Mi Zukan Cutout Sprite with 3D Interactive Tilt!
      const spriteImg = this.fruitSprites[fruit.id] || this.fruitCards[fruit.id];
      const spriteSize = baseR * 2.28;
      // Interactive 3D sway & foreshortening driven by drag/auto-rotate yaw & pitch
      const swayX = Math.sin(this.yaw) * 0.26;
      const swayY = clamp(this.pitch, -0.65, 0.65) * 0.22;
      const scaleX = 1 - Math.abs(swayX) * 0.16;
      const scaleY = 1 - Math.abs(swayY) * 0.12;
      const skewY = swayX * 0.14;
      const skewX = -swayY * 0.1;

      if (spriteImg && spriteImg.complete && spriteImg.naturalWidth > 0) {
        // Multi-slice 3D rim extrusion behind sprite for tangible volumetric thickness
        ctx.save();
        ctx.translate(cx + swayX * baseR * 0.22, cy + bobY + swayY * baseR * 0.18);
        ctx.transform(scaleX, skewY, skewX, scaleY, 0, 0);

        // Glowing rim backlight
        ctx.save();
        ctx.shadowColor = this.powerBurstTimer > 0 ? '#fde047' : fruit.auraColor;
        ctx.shadowBlur = this.powerBurstTimer > 0 ? 38 : 22;
        for (let depthLayer = 3; depthLayer >= 1; depthLayer--) {
          const offX = -swayX * depthLayer * 4.2;
          const offY = -swayY * depthLayer * 3.6 + depthLayer * 1.2;
          ctx.globalAlpha = 0.22;
          ctx.drawImage(
            spriteImg,
            -spriteSize * 0.5 + offX,
            -spriteSize * 0.5 + offY,
            spriteSize,
            spriteSize
          );
        }
        ctx.globalAlpha = 1;
        ctx.drawImage(spriteImg, -spriteSize * 0.5, -spriteSize * 0.5, spriteSize, spriteSize);
        ctx.restore();

        // Subtle dynamic specular sheen sweeping across the fruit as you rotate it
        const sheenX = -swayX * spriteSize * 0.28;
        const sheenY = -spriteSize * 0.18 + swayY * spriteSize * 0.2;
        const sheenGrad = ctx.createRadialGradient(
          sheenX,
          sheenY,
          spriteSize * 0.02,
          sheenX,
          sheenY,
          spriteSize * 0.34
        );
        sheenGrad.addColorStop(0, 'rgba(255, 255, 255, 0.22)');
        sheenGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = sheenGrad;
        ctx.beginPath();
        ctx.arc(sheenX, sheenY, spriteSize * 0.34, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      } else {
        // Instant fallback silhouette while high-res Zukan PNG finishes decoding
        const bodyGrad = ctx.createRadialGradient(
          cx - baseR * 0.28,
          cy + bobY - baseR * 0.28,
          baseR * 0.1,
          cx,
          cy + bobY,
          baseR * 0.95
        );
        bodyGrad.addColorStop(0, fruit.secondaryColor);
        bodyGrad.addColorStop(0.65, fruit.primaryColor);
        bodyGrad.addColorStop(1, '#090d16');
        ctx.fillStyle = bodyGrad;
        ctx.beginPath();
        ctx.arc(cx, cy + bobY, baseR * 0.88, 0, Math.PI * 2);
        ctx.fill();
      }

      // 5. Front Pass (In Front of Devil Fruit)
      drawOrbitalHaloArc(true);
      drawParticleLayer(true);

      // 6. Top-Left Wielder Portrait & Category Medallion
      const userImgKey =
        fruit.id === 'gomu-nika' && this.eraFilter === 'wano' ? 'luffy-alt' : fruit.characterId;
      const userImg = this.charImages[userImgKey] || this.charImages[fruit.characterId];
      if (userImg && userImg.complete && userImg.naturalWidth > 0) {
        ctx.save();
        ctx.fillStyle = 'rgba(9, 13, 24, 0.78)';
        ctx.strokeStyle = 'rgba(250, 204, 21, 0.45)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(14, 22, Math.min(w - 28, 285), 76, 38);
        } else {
          ctx.rect(14, 22, Math.min(w - 28, 285), 76);
        }
        ctx.fill();
        ctx.stroke();

        ctx.save();
        ctx.beginPath();
        ctx.arc(52, 60, 31, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(userImg, 21, 29, 62, 62);
        ctx.restore();

        ctx.strokeStyle = fruit.auraColor;
        ctx.lineWidth = 2.8;
        ctx.beginPath();
        ctx.arc(52, 60, 31, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#f8fafc';
        ctx.font = '700 11.5px system-ui, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(fruit.user, 94, 54);
        ctx.fillStyle = '#fde047';
        ctx.font = '600 10.5px system-ui, sans-serif';
        ctx.fillText(fruit.category, 94, 71);
        ctx.restore();
      }

      // 7. Bottom Canonical Akuma no Mi Zukan Nameplate
      ctx.save();
      const plateW = Math.min(w - 32, 430);
      const plateX = cx - plateW * 0.5;
      const plateY = h - 54;
      ctx.fillStyle = 'rgba(9, 13, 24, 0.82)';
      ctx.strokeStyle = 'rgba(250, 204, 21, 0.55)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(plateX, plateY, plateW, 40, 12);
      } else {
        ctx.rect(plateX, plateY, plateW, 40);
      }
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#fde047';
      ctx.font = '800 12px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('📖 AKUMA NO MI ZUKAN: ' + fruit.name.toUpperCase(), cx, plateY + 17);
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '600 10px system-ui, sans-serif';
      const shortMorph = (fruit.zukanShape || fruit.englishName).slice(0, 66);
      ctx.fillText(shortMorph, cx, plateY + 32);
      ctx.restore();

      if (this.powerBurstTimer > 0) {
        this.renderFruitSpecialEffect(ctx, cx, cy + bobY, baseR, fruit);
      }
    }

    renderFruitSpecialEffect(ctx, cx, cy, baseR, fruit) {
      ctx.save();
      const effect = fruit.effectType;

      if (effect === 'room') {
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.9)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(cx, cy, baseR * 1.55, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = 'rgba(56, 189, 248, 0.14)';
        ctx.fill();
        ctx.font = '800 16px system-ui, sans-serif';
        ctx.fillStyle = '#38bdf8';
        ctx.textAlign = 'center';
        ctx.fillText('⚡ ROOM — SHAMBLES! ⚡', cx, cy - baseR * 1.62);
      } else if (effect === 'quake') {
        ctx.strokeStyle = '#f8fafc';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 14;
        ctx.lineWidth = 3.2;
        for (let k = 0; k < 8; k++) {
          const ang = (k / 8) * Math.PI * 2 + 0.3;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.cos(ang) * baseR * 0.78, cy + Math.sin(ang) * baseR * 0.78);
          ctx.lineTo(
            cx + Math.cos(ang + 0.2) * baseR * 1.32,
            cy + Math.sin(ang + 0.2) * baseR * 1.32
          );
          ctx.lineTo(
            cx + Math.cos(ang - 0.12) * baseR * 1.72,
            cy + Math.sin(ang - 0.12) * baseR * 1.72
          );
          ctx.stroke();
        }
        ctx.font = '800 15px system-ui, sans-serif';
        ctx.fillStyle = '#e0f2fe';
        ctx.textAlign = 'center';
        ctx.fillText('💥 GURA GURA — SKY-SHATTERING TREMOR! 💥', cx, cy - baseR * 1.62);
      } else if (effect === 'gear5' && this.eraFilter === 'wano') {
        ctx.strokeStyle = '#f8fafc';
        ctx.shadowColor = '#fde047';
        ctx.shadowBlur = 16;
        ctx.lineWidth = 9;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(cx, cy, baseR * 1.34, Math.PI * 0.85, Math.PI * 2.15);
        ctx.stroke();

        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 3.5;
        for (let b = 0; b < 6; b++) {
          const a = (b / 6) * Math.PI * 2 + this.elapsed * 6;
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(a) * baseR * 0.9, cy + Math.sin(a) * baseR * 0.9);
          ctx.lineTo(
            cx + Math.cos(a + 0.15) * baseR * 1.35,
            cy + Math.sin(a + 0.15) * baseR * 1.35
          );
          ctx.lineTo(
            cx + Math.cos(a - 0.08) * baseR * 1.78,
            cy + Math.sin(a - 0.08) * baseR * 1.78
          );
          ctx.stroke();
        }
        ctx.font = '800 15px system-ui, sans-serif';
        ctx.fillStyle = '#fde047';
        ctx.textAlign = 'center';
        ctx.fillText('🥁 DRUMS OF LIBERATION — GEAR 5! 🥁', cx, cy - baseR * 1.62);
      } else if (effect === 'darkness') {
        for (let v = 0; v < 4; v++) {
          ctx.strokeStyle = v % 2 === 0 ? '#7c3aed' : '#1e1b4b';
          ctx.lineWidth = 4;
          ctx.beginPath();
          for (let a = 0; a < Math.PI * 3.5; a += 0.2) {
            const spiralR = baseR * (1.7 - (a / (Math.PI * 3.5)) * 1.35);
            const theta = a - this.elapsed * 5 + (v * Math.PI) / 2;
            const px = cx + Math.cos(theta) * spiralR;
            const py = cy + Math.sin(theta) * spiralR;
            if (a === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.stroke();
        }
        ctx.font = '800 15px system-ui, sans-serif';
        ctx.fillStyle = '#c4b5fd';
        ctx.textAlign = 'center';
        ctx.fillText('🌀 KUROUZU — BLACK VORTEX GRAVITY! 🌀', cx, cy - baseR * 1.62);
      } else if (effect === 'strings') {
        ctx.strokeStyle = 'rgba(248, 250, 252, 0.88)';
        ctx.lineWidth = 1.6;
        for (let s = 0; s < 16; s++) {
          const ang = (s / 16) * Math.PI * 2 + Math.sin(this.elapsed * 3 + s) * 0.1;
          ctx.beginPath();
          ctx.moveTo(cx, cy - baseR * 1.65);
          ctx.quadraticCurveTo(
            cx + Math.cos(ang) * baseR * 1.5,
            cy + Math.sin(ang) * baseR * 0.5,
            cx + Math.cos(ang) * baseR * 1.75,
            cy + baseR * 1.3
          );
          ctx.stroke();
        }
        ctx.font = '800 15px system-ui, sans-serif';
        ctx.fillStyle = '#fbcfe8';
        ctx.textAlign = 'center';
        ctx.fillText('🕸️ ITO ITO — OVERHEAT SKY STRINGS! 🕸️', cx, cy - baseR * 1.62);
      } else {
        for (let ring = 0; ring < 2; ring++) {
          ctx.strokeStyle = ring === 0 ? fruit.auraColor : fruit.secondaryColor;
          ctx.lineWidth = 3.5 - ring;
          ctx.beginPath();
          ctx.arc(
            cx,
            cy,
            baseR * (1.12 + ((this.elapsed * 1.6 + ring * 0.3) % 0.65)),
            0,
            Math.PI * 2
          );
          ctx.stroke();
        }
        ctx.font = '800 15px system-ui, sans-serif';
        ctx.fillStyle = fruit.auraColor;
        ctx.textAlign = 'center';
        ctx.fillText('⚡ ' + fruit.englishName.toUpperCase() + ' UNLEASHED! ⚡', cx, cy - baseR * 1.62);
      }
      ctx.restore();
    }

    renderHakiOverlay(ctx, w, h) {
      const cx = w * 0.5;
      const cy = h * 0.5;
      ctx.save();

      if (this.hakiMode === 'observation') {
        for (let r = 1; r <= 3; r++) {
          const rad = ((this.elapsed * 110 + r * 75) % 240) + 40;
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.65)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(cx, cy, rad, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.fillStyle = '#38bdf8';
        ctx.font = '800 14px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('👁️ OBSERVATION HAKI: FUTURE SIGHT RADAR LOCKED ON!', cx, 34);
      } else if (this.hakiMode === 'armament') {
        const grad = ctx.createRadialGradient(cx, cy, 40, cx, cy, 190);
        grad.addColorStop(0, 'rgba(15, 23, 42, 0.7)');
        grad.addColorStop(0.6, 'rgba(249, 115, 22, 0.35)');
        grad.addColorStop(1, 'rgba(249, 115, 22, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, 190, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fb923c';
        ctx.font = '800 14px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🥊 ARMAMENT HAKI: SPIRITUAL ARMOR FLOW!', cx, 34);
      } else if (this.hakiMode === 'conqueror') {
        ctx.strokeStyle = '#e11d48';
        ctx.shadowColor = '#f43f5e';
        ctx.shadowBlur = 16;
        ctx.lineWidth = 4;
        for (let i = 0; i < 8; i++) {
          const ang = (i / 8) * Math.PI * 2 + this.elapsed * 5;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.cos(ang) * 95, cy + Math.sin(ang) * 95);
          ctx.lineTo(cx + Math.cos(ang - 0.15) * 230, cy + Math.sin(ang - 0.15) * 230);
          ctx.stroke();
        }
        ctx.fillStyle = '#fda4af';
        ctx.font = '800 14px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText("⚡ CONQUEROR'S HAKI: SUPREME KING LIGHTNING!", cx, 34);
      }
      ctx.restore();
    }
  }

  function renderRadarChart(canvas, charA, charB) {
    if (!canvas || !charA) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = 280;
    const height = 240;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const cx = width * 0.5;
    const cy = height * 0.52;
    const maxR = 78;
    const axes = [
      { key: 'strength', label: 'Strength' },
      { key: 'speed', label: 'Speed' },
      { key: 'durability', label: 'Durability' },
      { key: 'haki', label: 'Haki' },
      { key: 'devilFruit', label: 'DF / Skill' },
      { key: 'battleIQ', label: 'Battle IQ' }
    ];

    for (let ring = 1; ring <= 4; ring++) {
      const r = (maxR * ring) / 4;
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.22)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < axes.length; i++) {
        const ang = -Math.PI / 2 + (i * Math.PI * 2) / axes.length;
        const x = cx + Math.cos(ang) * r;
        const y = cy + Math.sin(ang) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }

    ctx.font = '600 10.5px system-ui, sans-serif';
    ctx.fillStyle = '#cbd5e1';
    for (let i = 0; i < axes.length; i++) {
      const ang = -Math.PI / 2 + (i * Math.PI * 2) / axes.length;
      const x = cx + Math.cos(ang) * maxR;
      const y = cy + Math.sin(ang) * maxR;
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(x, y);
      ctx.stroke();

      const lx = cx + Math.cos(ang) * (maxR + 22);
      const ly = cy + Math.sin(ang) * (maxR + 16);
      ctx.textAlign = 'center';
      ctx.fillText(axes[i].label, lx, ly + 3);
    }

    const drawPolygon = (statsObj, strokeColor, fillColor) => {
      ctx.beginPath();
      for (let i = 0; i < axes.length; i++) {
        const val = clamp((statsObj && statsObj[axes[i].key]) || 50, 0, 100);
        const r = (val / 100) * maxR;
        const ang = -Math.PI / 2 + (i * Math.PI * 2) / axes.length;
        const x = cx + Math.cos(ang) * r;
        const y = cy + Math.sin(ang) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = fillColor;
      ctx.fill();
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2.2;
      ctx.stroke();
    };

    if (charB && charB.stats) {
      drawPolygon(charB.stats, '#38bdf8', 'rgba(56, 189, 248, 0.22)');
    }
    drawPolygon(charA.stats, '#facc15', 'rgba(250, 204, 21, 0.28)');
  }

  root.OnePiece3DEngine = OnePiece3DEngine;
  root.renderOnePieceRadarChart = renderRadarChart;
})(typeof window !== 'undefined' ? window : globalThis);

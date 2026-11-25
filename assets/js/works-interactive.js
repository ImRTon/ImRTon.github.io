(function () {
  'use strict';

  var reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  var prefersReduced = reducedMotionQuery.matches;
  if (typeof reducedMotionQuery.addEventListener === 'function') {
    reducedMotionQuery.addEventListener('change', function (e) {
      prefersReduced = e.matches;
    });
  }

  /* ========================================================================
     1. HOW'S THE WEATHER — Cartographic Precipitation Radar Animation
     ======================================================================== */
  function initWeatherRadar() {
    var stage = document.querySelector('[data-weather-radar]');
    var canvas = stage && stage.querySelector('[data-weather-canvas]');
    if (!stage || !canvas || !canvas.getContext) return;

    var ctx = canvas.getContext('2d');
    var width = 0;
    var height = 0;
    var dpr = 1;
    var inView = false;
    var rafId = 0;
    var time = 18; // start mid-drift so radar bands are nicely positioned
    var lastTs = 0;

    // Multi-band CWA-inspired Doppler precipitation cells drifting SW -> NE
    var cells = [
      // Broad outer light-rain moisture shield
      { x: 0.72, y: 0.42, rx: 0.28, ry: 0.19, angle: -0.35, vx: 0.011, vy: -0.0045, phase: 0.2, kind: 'light' },
      { x: 0.56, y: 0.62, rx: 0.24, ry: 0.16, angle: -0.25, vx: 0.009, vy: -0.0038, phase: 1.7, kind: 'light' },
      { x: 0.88, y: 0.26, rx: 0.22, ry: 0.15, angle: -0.42, vx: 0.012, vy: -0.005, phase: 3.1, kind: 'light' },
      { x: 0.28, y: 0.76, rx: 0.25, ry: 0.14, angle: -0.28, vx: 0.0085, vy: -0.0035, phase: 4.5, kind: 'light' },
      // Moderate teal-emerald rain bands
      { x: 0.69, y: 0.46, rx: 0.17, ry: 0.11, angle: -0.38, vx: 0.0135, vy: -0.0055, phase: 0.9, kind: 'moderate' },
      { x: 0.84, y: 0.34, rx: 0.14, ry: 0.095, angle: -0.45, vx: 0.0145, vy: -0.006, phase: 2.4, kind: 'moderate' },
      { x: 0.52, y: 0.68, rx: 0.13, ry: 0.085, angle: -0.3, vx: 0.0115, vy: -0.0048, phase: 3.9, kind: 'moderate' },
      // Convective amber/gold rain cores (subtle, realistic meteorological reflectivity)
      { x: 0.71, y: 0.45, rx: 0.075, ry: 0.052, angle: -0.35, vx: 0.014, vy: -0.0058, phase: 1.3, kind: 'heavy' },
      { x: 0.85, y: 0.33, rx: 0.058, ry: 0.042, angle: -0.42, vx: 0.015, vy: -0.0062, phase: 2.9, kind: 'heavy' }
    ];

    // Subtle wind-streamline particles
    var wisps = [];
    for (var i = 0; i < 18; i++) {
      wisps.push({
        x: (i * 0.173) % 1,
        y: (i * 0.291 + 0.12) % 1,
        len: 26 + (i % 5) * 14,
        speed: 0.022 + (i % 4) * 0.007,
        alpha: 0.08 + (i % 3) * 0.04
      });
    }

    function resize() {
      var rect = stage.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      renderFrame(time);
    }

    function drawCell(c, t) {
      var wrapX = ((c.x + c.vx * t) % 1.45 + 1.45) % 1.45 - 0.22;
      var wrapY = ((c.y + c.vy * t) % 1.4 + 1.4) % 1.4 - 0.2;
      var cx = wrapX * width;
      var cy = wrapY * height;
      var pulse = 1 + Math.sin(t * 0.55 + c.phase) * 0.08;
      var rx = c.rx * width * pulse;
      var ry = c.ry * height * pulse;
      var maxR = Math.max(rx, ry);

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(c.angle + Math.sin(t * 0.25 + c.phase) * 0.06);
      ctx.scale(rx / maxR, ry / maxR);

      var grad = ctx.createRadialGradient(0, 0, maxR * 0.06, 0, 0, maxR);
      if (c.kind === 'light') {
        grad.addColorStop(0, 'rgba(72, 134, 242, 0.34)');
        grad.addColorStop(0.55, 'rgba(64, 118, 224, 0.16)');
        grad.addColorStop(1, 'rgba(64, 118, 224, 0)');
      } else if (c.kind === 'moderate') {
        grad.addColorStop(0, 'rgba(154, 84, 218, 0.38)');
        grad.addColorStop(0.55, 'rgba(198, 76, 152, 0.2)');
        grad.addColorStop(1, 'rgba(198, 76, 152, 0)');
      } else {
        grad.addColorStop(0, 'rgba(244, 166, 72, 0.42)');
        grad.addColorStop(0.48, 'rgba(226, 98, 112, 0.22)');
        grad.addColorStop(1, 'rgba(226, 98, 112, 0)');
      }

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, maxR, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function drawRadarSweep(t) {
      var originX = width * 0.647;
      var originY = height * 0.484;
      var sweepR = Math.min(width, height) * 0.62;
      var sweepAngle = (t * 0.34) % (Math.PI * 2);
      var wedgeSpan = 0.55;

      ctx.save();
      ctx.translate(originX, originY);

      // Soft trailing radar wedge
      var steps = 12;
      for (var s = 0; s < steps; s++) {
        var frac = s / steps;
        var a0 = sweepAngle - wedgeSpan * (1 - frac);
        var a1 = sweepAngle - wedgeSpan * (1 - (s + 1) / steps);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, sweepR, a0, a1);
        ctx.closePath();
        ctx.fillStyle = 'rgba(92, 225, 248, ' + (0.068 * frac * frac).toFixed(4) + ')';
        ctx.fill();
      }

      // Crisp leading radar beam hairline
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(sweepAngle) * sweepR, Math.sin(sweepAngle) * sweepR);
      ctx.strokeStyle = 'rgba(110, 232, 252, 0.32)';
      ctx.lineWidth = 1.25;
      ctx.stroke();

      // Subtle pulsing ping ring at station center
      var pingProgress = (t * 0.26) % 1;
      var pingRadius = 12 + pingProgress * 124;
      ctx.beginPath();
      ctx.arc(0, 0, pingRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(92, 225, 248, ' + ((1 - pingProgress) * 0.32).toFixed(3) + ')';
      ctx.lineWidth = 1.25;
      ctx.stroke();

      ctx.restore();
    }

    function drawWindWisps(t) {
      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineWidth = 1.25;
      for (var i = 0; i < wisps.length; i++) {
        var w = wisps[i];
        var px = (((w.x + w.speed * t) % 1.2) - 0.1) * width;
        var py = (((w.y - w.speed * 0.42 * t) % 1.2 + 1.2) % 1.2 - 0.1) * height;
        var dx = w.len;
        var dy = -w.len * 0.42;

        var grad = ctx.createLinearGradient(px, py, px + dx, py + dy);
        grad.addColorStop(0, 'rgba(196, 242, 252, 0)');
        grad.addColorStop(0.5, 'rgba(196, 242, 252, ' + (w.alpha * 1.9).toFixed(3) + ')');
        grad.addColorStop(1, 'rgba(196, 242, 252, 0)');
        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px + dx, py + dy);
        ctx.stroke();
      }
      ctx.restore();
    }

    function renderFrame(t) {
      ctx.clearRect(0, 0, width, height);
      for (var i = 0; i < cells.length; i++) {
        drawCell(cells[i], t);
      }
      drawWindWisps(t);
      if (!prefersReduced) {
        drawRadarSweep(t);
      }
    }

    function tick(ts) {
      if (!inView || document.hidden || prefersReduced) {
        rafId = 0;
        lastTs = 0;
        return;
      }
      if (!lastTs) lastTs = ts;
      var dt = Math.min(0.05, (ts - lastTs) / 1000);
      lastTs = ts;
      time += dt;
      renderFrame(time);
      rafId = window.requestAnimationFrame(tick);
    }

    function start() {
      if (prefersReduced) {
        renderFrame(time);
        return;
      }
      if (!rafId && inView && !document.hidden) {
        lastTs = 0;
        rafId = window.requestAnimationFrame(tick);
      }
    }

    function stop() {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }
    }

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          inView = entries[0].isIntersecting;
          if (inView) start();
          else stop();
        },
        { rootMargin: '120px 0px' }
      );
      observer.observe(stage);
    } else {
      inView = true;
      start();
    }

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop();
      else if (inView) start();
    });

    window.addEventListener('resize', resize, { passive: true });
    resize();
  }

  /* ========================================================================
     2. EXPENSE BUCKET — Scroll & Gyroscope Reactive Liquid Vessel
     ======================================================================== */
  function initExpenseBucket() {
    var vessel = document.querySelector('[data-expense-bucket]');
    var canvas = vessel && vessel.querySelector('[data-bucket-canvas]');
    if (!vessel || !canvas || !canvas.getContext) return;

    var ctx = canvas.getContext('2d');
    var pctEl = vessel.querySelector('[data-bucket-pct]');
    var gyroBtn = vessel.querySelector('[data-bucket-gyro]');
    var gyroLabel = vessel.querySelector('[data-bucket-gyro-label]');

    var width = 0;
    var height = 0;
    var dpr = 1;
    var inView = false;
    var rafId = 0;
    var lastTs = 0;
    var time = 0;

    // Fluid state (2nd-order inertial level + delayed spring-damper slosh)
    var fillLevel = 0.46;        // 0..1 fraction from bottom (front wave)
    var fillVel = 0;             // vertical inertia velocity
    var backFillLevel = 0.46;    // slightly lagged rear wave level
    var targetFill = 0.46;
    var tiltAngle = 0;           // radians, front surface tilt
    var backTiltAngle = 0;       // slightly lagged rear surface tilt
    var tiltVel = 0;
    var targetTilt = 0;
    var pendingSlosh = 0;        // buffered scroll/gyro force for natural lag
    var waveEnergy = 0.28;       // current smoothed wave amplitude multiplier
    var targetWaveEnergy = 0.28; // delayed target wave energy
    var pointerRipple = 0;
    var pointerXNorm = 0.5;

    // Scroll tracking
    var lastScrollY = window.scrollY;
    var lastScrollTs = performance.now();

    // Gyroscope tracking
    var gyroActive = false;
    var lastGamma = 0;
    var gyroTiltTarget = 0;
    var gyroTiltSmoothed = 0;
    var gyroFillOffset = 0;

    // Subtle rising micro-bubbles inside the liquid
    var bubbles = [];
    for (var i = 0; i < 14; i++) {
      bubbles.push({
        x: 0.08 + ((i * 0.137) % 0.84),
        y: (i * 0.19) % 1,
        r: 1.6 + (i % 4) * 1.1,
        speed: 0.045 + (i % 5) * 0.014,
        drift: i * 1.1
      });
    }

    function clamp(val, min, max) {
      return Math.max(min, Math.min(max, val));
    }

    function updateScrollTargets() {
      var rect = vessel.getBoundingClientRect();
      var vh = window.innerHeight || 800;
      // 0 when vessel enters bottom of viewport, 1 when vessel exits top
      var progress = clamp((vh - rect.top) / (vh + rect.height), 0, 1);
      // Smoothly vary budget level between 32% and 62% as user scrolls through
      targetFill = clamp(0.32 + progress * 0.30 + gyroFillOffset, 0.24, 0.74);
    }

    function onScroll() {
      var now = performance.now();
      var currentY = window.scrollY;
      var dy = currentY - lastScrollY;
      var dt = Math.max(10, now - lastScrollTs);
      var velocity = dy / dt; // px per ms

      lastScrollY = currentY;
      lastScrollTs = now;

      updateScrollTargets();

      if (prefersReduced) {
        fillLevel = targetFill;
        backFillLevel = targetFill;
        renderFrame(time);
        return;
      }

      // Buffer slosh force rather than snapping immediately, so water lags & rolls naturally
      var impulse = clamp(velocity * 0.11, -0.34, 0.34);
      pendingSlosh = clamp(pendingSlosh + impulse, -0.55, 0.55);
      // Subtle vertical inertia kick opposite to scroll motion
      fillVel = clamp(fillVel - impulse * 0.24, -0.45, 0.45);
      targetWaveEnergy = Math.min(2.35, targetWaveEnergy + Math.abs(velocity) * 0.48);
    }

    function handleOrientation(event) {
      if (event.gamma === null || typeof event.gamma === 'undefined') return;
      gyroActive = true;
      var gamma = clamp(event.gamma, -40, 40); // left/right roll
      var beta = typeof event.beta === 'number' ? clamp(event.beta, -45, 90) : 45;

      // Convert device roll to liquid counter-tilt so water stays horizontal with gravity
      gyroTiltTarget = (-gamma / 40) * 0.24;
      // Subtle pitch offset shifts perceived depth slightly
      gyroFillOffset = clamp((beta - 45) / 160, -0.08, 0.08);

      var dGamma = gamma - lastGamma;
      lastGamma = gamma;
      if (Math.abs(dGamma) > 0.6) {
        pendingSlosh = clamp(pendingSlosh - dGamma * 0.008, -0.45, 0.45);
        targetWaveEnergy = Math.min(2.2, targetWaveEnergy + Math.abs(dGamma) * 0.032);
      }
      updateScrollTargets();
    }

    function setupGyroscope() {
      if (typeof window.DeviceOrientationEvent === 'undefined') return;

      if (typeof window.DeviceOrientationEvent.requestPermission === 'function') {
        // iOS 13+ requires explicit user gesture
        if (gyroBtn) {
          gyroBtn.hidden = false;
          gyroBtn.addEventListener('click', function () {
            window.DeviceOrientationEvent.requestPermission()
              .then(function (state) {
                if (state === 'granted') {
                  window.addEventListener('deviceorientation', handleOrientation, { passive: true });
                  gyroBtn.classList.add('is-active');
                  if (gyroLabel) gyroLabel.textContent = '體感水位已開啟';
                }
              })
              .catch(function () {
                if (gyroLabel) gyroLabel.textContent = '無法啟用體感';
              });
          });
        }
      } else {
        // Android / browsers without permission gate
        window.addEventListener('deviceorientation', handleOrientation, { passive: true });
      }
    }

    function onPointerMove(e) {
      if (prefersReduced || gyroActive) return;
      var rect = vessel.getBoundingClientRect();
      var xNorm = clamp((e.clientX - rect.left) / Math.max(1, rect.width), 0, 1);
      var dx = xNorm - pointerXNorm;
      pointerXNorm = xNorm;
      if (Math.abs(dx) > 0.002) {
        pendingSlosh = clamp(pendingSlosh + clamp(dx * 0.55, -0.1, 0.1), -0.4, 0.4);
        pointerRipple = Math.min(1.0, pointerRipple + Math.abs(dx) * 2.4);
      }
    }

    function resize() {
      var rect = vessel.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      updateScrollTargets();
      fillLevel = targetFill;
      backFillLevel = targetFill;
      renderFrame(time);
    }

    function computeWaveY(x, baseY, slope, amp, freq, phase, secondaryFreq, secondaryPhase) {
      var centered = x - width * 0.5;
      var primary = Math.sin(x * freq + phase) * amp;
      var secondary = Math.cos(x * secondaryFreq - secondaryPhase) * (amp * 0.42);
      var ripple = 0;
      if (pointerRipple > 0.01) {
        var dist = Math.abs(x / width - pointerXNorm);
        ripple = Math.exp(-dist * 10) * Math.sin(dist * 34 - time * 9) * pointerRipple * 6;
      }
      return baseY + centered * slope + primary + secondary + ripple;
    }

    function drawWaveLayer(opts) {
      var segments = Math.max(48, Math.round(width / 18));
      var step = width / segments;
      var points = [];

      for (var i = 0; i <= segments; i++) {
        var x = i * step;
        var y = computeWaveY(
          x,
          opts.baseY,
          opts.slope,
          opts.amp,
          opts.freq,
          opts.phase,
          opts.secondaryFreq,
          opts.secondaryPhase
        );
        points.push({ x: x, y: y });
      }

      // Fill liquid body
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(points[0].x, points[0].y);
      for (var j = 1; j < points.length; j++) {
        ctx.lineTo(points[j].x, points[j].y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();

      var grad = ctx.createLinearGradient(0, opts.baseY - 40, 0, height);
      grad.addColorStop(0, opts.topColor);
      grad.addColorStop(0.55, opts.midColor);
      grad.addColorStop(1, opts.bottomColor);
      ctx.fillStyle = grad;
      ctx.fill();

      // Luminous specular meniscus line along the crest
      if (opts.meniscusColor) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (var k = 1; k < points.length; k++) {
          ctx.lineTo(points[k].x, points[k].y);
        }
        ctx.strokeStyle = opts.meniscusColor;
        ctx.lineWidth = opts.meniscusWidth || 1.6;
        ctx.stroke();
      }
    }

    function drawBubbles(baseY, slope) {
      ctx.save();
      for (var i = 0; i < bubbles.length; i++) {
        var b = bubbles[i];
        var bx = (b.x + Math.sin(time * 0.9 + b.drift) * 0.012) * width;
        var surfaceAtX = baseY + (bx - width * 0.5) * slope + 14;
        var liquidHeight = Math.max(20, height - surfaceAtX);
        var by = height - b.y * liquidHeight;

        if (by > surfaceAtX + 6 && by < height - 8) {
          var fade = clamp((by - surfaceAtX) / 48, 0, 1);
          ctx.beginPath();
          ctx.arc(bx, by, b.r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, ' + (0.28 * fade).toFixed(3) + ')';
          ctx.fill();
        }
      }
      ctx.restore();
    }

    function renderFrame(t) {
      ctx.clearRect(0, 0, width, height);

      var baseY = height * (1 - fillLevel);
      var backBaseY = height * (1 - backFillLevel);
      var slope = Math.tan(tiltAngle);
      var backSlope = Math.tan(backTiltAngle);
      var baseAmp = prefersReduced ? 3.5 : (5.5 + waveEnergy * 8.5);

      // Back wave (soft misty matcha green, slightly lagged in height & tilt)
      drawWaveLayer({
        baseY: backBaseY - 4,
        slope: backSlope * 0.9,
        amp: baseAmp * 0.85,
        freq: (Math.PI * 2) / Math.max(360, width * 0.72),
        phase: -t * 1.15 + 1.4,
        secondaryFreq: (Math.PI * 2) / Math.max(190, width * 0.34),
        secondaryPhase: t * 0.9,
        topColor: 'rgba(148, 174, 118, 0.2)',
        midColor: 'rgba(126, 154, 96, 0.25)',
        bottomColor: 'rgba(102, 132, 74, 0.3)',
        meniscusColor: 'rgba(128, 158, 96, 0.36)',
        meniscusWidth: 1.2
      });

      // Front wave (lush ceremonial matcha green + warm-cream specular crest)
      drawWaveLayer({
        baseY: baseY + 3,
        slope: slope,
        amp: baseAmp,
        freq: (Math.PI * 2) / Math.max(320, width * 0.62),
        phase: t * 1.55,
        secondaryFreq: (Math.PI * 2) / Math.max(170, width * 0.28),
        secondaryPhase: t * 1.25,
        topColor: 'rgba(134, 166, 102, 0.26)',
        midColor: 'rgba(112, 144, 82, 0.31)',
        bottomColor: 'rgba(88, 118, 62, 0.37)',
        meniscusColor: 'rgba(252, 253, 245, 0.82)',
        meniscusWidth: 1.8
      });

      drawBubbles(baseY, slope);

      if (pctEl) {
        pctEl.textContent = Math.round(fillLevel * 100) + '%';
      }
    }

    function tick(ts) {
      if (!inView || document.hidden || prefersReduced) {
        rafId = 0;
        lastTs = 0;
        return;
      }
      if (!lastTs) lastTs = ts;
      var dt = Math.min(0.045, (ts - lastTs) / 1000);
      lastTs = ts;
      time += dt;

      // 2nd-order inertial water level (lags & gently overshoots like real liquid)
      var fillAccel = (targetFill - fillLevel) * 7.2 - fillVel * 3.2;
      fillVel += fillAccel * dt;
      fillLevel = clamp(fillLevel + fillVel * dt, 0.18, 0.82);
      // Rear wave trails slightly behind front wave for 3D liquid depth
      backFillLevel += (fillLevel - backFillLevel) * Math.min(1, dt * 4.2);

      // Release buffered scroll/gyro impulse gradually into tilt velocity
      var sloshTransfer = pendingSlosh * Math.min(1, dt * 5.2);
      pendingSlosh -= sloshTransfer;
      tiltVel += sloshTransfer * 2.8;

      // Smoothly lag gyroscope tilt target for fluid heaviness
      gyroTiltSmoothed += (gyroTiltTarget - gyroTiltSmoothed) * Math.min(1, dt * 3.4);

      // Lower-frequency, heavier spring-damper slosh (rocks 2-3 times before settling)
      targetTilt = gyroActive ? gyroTiltSmoothed : 0;
      var stiffness = 6.2;
      var damping = 1.65;
      var accel = (targetTilt - tiltAngle) * stiffness - tiltVel * damping;
      tiltVel += accel * dt;
      tiltAngle = clamp(tiltAngle + tiltVel * dt, -0.26, 0.26);
      backTiltAngle += (tiltAngle - backTiltAngle) * Math.min(1, dt * 4.0);

      // Wave energy builds smoothly and decays gradually so ripples linger naturally
      targetWaveEnergy += (0.28 - targetWaveEnergy) * Math.min(1, dt * 1.15);
      waveEnergy += (targetWaveEnergy - waveEnergy) * Math.min(1, dt * 3.4);
      pointerRipple *= Math.pow(0.28, dt);

      // Advance subtle rising bubbles
      var bubbleBoost = 1 + waveEnergy * 0.7;
      for (var i = 0; i < bubbles.length; i++) {
        bubbles[i].y += bubbles[i].speed * bubbleBoost * dt;
        if (bubbles[i].y > 1) bubbles[i].y -= 1;
      }

      renderFrame(time);
      rafId = window.requestAnimationFrame(tick);
    }

    function start() {
      if (prefersReduced) {
        updateScrollTargets();
        fillLevel = targetFill;
        renderFrame(time);
        return;
      }
      if (!rafId && inView && !document.hidden) {
        lastTs = 0;
        rafId = window.requestAnimationFrame(tick);
      }
    }

    function stop() {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }
    }

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          inView = entries[0].isIntersecting;
          if (inView) start();
          else stop();
        },
        { rootMargin: '160px 0px' }
      );
      observer.observe(vessel);
    } else {
      inView = true;
      start();
    }

    setupGyroscope();
    window.addEventListener('scroll', onScroll, { passive: true });
    vessel.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop();
      else if (inView) start();
    });
    window.addEventListener('resize', resize, { passive: true });
    resize();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initWeatherRadar();
      initExpenseBucket();
    });
  } else {
    initWeatherRadar();
    initExpenseBucket();
  }
})();

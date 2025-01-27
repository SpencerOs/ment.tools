//--------------------------------------------------
// bg-animation.js (final combined version)
//--------------------------------------------------
(() => {
    // 1) Grab references to both canvases + the black hole image
    const gridCanvas = document.getElementById('grid-canvas');
    const starsCanvas = document.getElementById('stars-canvas');
    const blackHoleImg = document.getElementById('singularity');
    if (!gridCanvas || !starsCanvas) return;
  
    // 2) Get 2D contexts
    const gctx = gridCanvas.getContext('2d');   // grid context
    const sctx = starsCanvas.getContext('2d');  // stars context
  
    // 3) Resize both canvases on load/resize
    let cw, ch; // store current width, height
    function resizeAll() {
      cw = window.innerWidth;
      ch = window.innerHeight;
  
      gridCanvas.width = cw;
      gridCanvas.height = ch;
  
      starsCanvas.width = cw;
      starsCanvas.height = ch;
  
      placeBlackHole(); // re-position the black hole <img>
    }
    function onDomLoad() {
        resizeAll();
        initStars();
        animate();
    }
  
    window.addEventListener('resize', resizeAll);
    document.addEventListener('DOMContentLoaded', onDomLoad);
  
    // 4) Position the black hole so its center sits at horizon = ch * 0.4
    function placeBlackHole() {
      if (!blackHoleImg) return;
  
      const rect = blackHoleImg.getBoundingClientRect();
      const halfW = rect.width / 2;
      const halfH = rect.height / 2;
  
      // place center at (cw/2, ch*0.4)
      blackHoleImg.style.position = 'fixed';
      blackHoleImg.style.left = (cw / 2 - halfW) + 'px';
      blackHoleImg.style.top  = (ch * 0.39 - halfH) + 'px';
    }
  
    //--------------------------------------------------
    // 5) Grid Setup
    //--------------------------------------------------
    const LINE_COUNT_HORIZONTAL = 20;
    const LINE_COUNT_VERTICAL   = 31;
    const horizonFrac = 0.4;  // 40% down from top
    const GRID_SPEED  = 0.0007;  // speed for horizontal lines
    const singularityRadius = 70;
  
    // Horizontal lines: store an array of { param }
    let horizontalLines = [];
    for (let i = 0; i < LINE_COUNT_HORIZONTAL; i++) {
      horizontalLines.push({ param: i / LINE_COUNT_HORIZONTAL });
    }
  
    // Vertical lines: store angles (–90°..+90°) distributed with a gentle ease
    let verticalAngles = buildPiecewiseAngles(LINE_COUNT_VERTICAL, 10);

    function buildPiecewiseAngles(count, exponent) {
      let angles = [];

      let half = (count - 1) /2;
      for (let i = 0; i < Math.floor(half); i++) {
        const t = i / half;
        let s = Math.pow(t, exponent);
        let angle = -Math.PI/2 + (Math.PI/2) * s;
        angles.push(angle);
      }

      if (count % 2) {
        angles.push(0);
      }

      for (let i = Math.floor(half) + 1; i < count; i++) {
        let mirrorIndex = count - 1 - i;
        let leftAngle = angles[mirrorIndex];
        angles.push(-leftAngle);
      }

      return angles
    }
  
    //--------------------------------------------------
    // 6) Starfield Setup
    //--------------------------------------------------
    const MAX_STARS = 150;
    const MAX_STARS_SUCKING = 20; 
    let stars = [];
    let starsInFlight = 0; // how many are currently being sucked in

    function createStar() {
      let x, y, dist;
      let attempts = 0;

      do {
        x = Math.random() * cw;
        y = Math.random() * (ch * horizonFrac);
        const dx = x - cw/2;
        const dy = y - ch * horizonFrac;
        dist = Math.sqrt(dx*dx + dy*dy);

        attempts++;
        if (attempts > 999) break;
      } while (dist < singularityRadius);

      const min = 0.001;
      const max = 0.01;
      const randomBrightStep = Math.random() * (max-min) + min;

      return {
        x, y,
        size: Math.random() * 1.5 + 0.5,
        maxBrightness: Math.random() * 0.8 + 0.2,
        brightness: 0, 
        brightStep: randomBrightStep,
        phase: 'fadein', // fadein -> twinkle -> sucked
        twinkleTimer: 0,
        twinkleMax: Math.floor(Math.random() * 200 + 100),
        speed: 0,
        swirlAngle: undefined
      };
    }
    
    function initStars() {
        stars = [];
        // Initialize star array
        for (let i = 0; i < MAX_STARS; i++) {
          stars.push(createStar());
        }
        console.log("Star sample: ", stars[0], stars[1]);
    }
  
    //--------------------------------------------------
    // 7) The main animation loop
    //--------------------------------------------------
    function animate() {
      // Clear both canvases each frame
      gctx.clearRect(0, 0, cw, ch); 
      sctx.clearRect(0, 0, cw, ch);
  
      // A) Draw the perspective grid on gridCanvas (gctx)
      drawGrid();
  
      // B) Draw + update stars on starsCanvas (sctx)
      drawStars();
  
      // Next frame
      requestAnimationFrame(animate);
    }
  
    function drawGrid() {
      // 1) Horizontal lines
      const horizonY = ch * horizonFrac;
      const bottomY  = ch;
      gctx.strokeStyle = 'rgba(208, 43, 95, 0.4)';
      gctx.lineWidth   = 2;
  
      horizontalLines.forEach((line) => {
        // Move param from 1 => 0
        line.param -= GRID_SPEED;
        if (line.param < 0) {
          line.param = 1;
        }
        const f = line.param;
        // Curved approach so lines bunch near horizon
        const y = horizonY + (bottomY - horizonY) * (f * f * f); 
        if (y < horizonY) return;
  
        gctx.beginPath();
        gctx.moveTo(0, y);
        gctx.lineTo(cw, y);
        gctx.stroke();
      });
  
      // 2) Vertical lines
      const vanishX = cw / 2;  // where lines converge
      verticalAngles.forEach((angle) => {
        const dy = (ch - horizonY);
        const dx = dy * Math.tan(angle);
  
        const endX = vanishX + dx;
        const endY = ch;
  
        gctx.beginPath();
        gctx.moveTo(vanishX, horizonY);
        gctx.lineTo(endX, endY);
        gctx.stroke();
      });
    }
  
    function drawStars() {
      sctx.fillStyle = '#fff'; // default fill, but we set alpha per star
  
      for (let i = 0; i < stars.length; i++) {
        const st = stars[i];
  
        switch (st.phase) {
          case 'fadein':
            // ramp brightness up until st.maxBrightness
            st.brightness += st.brightStep;
            if (st.brightness >= st.maxBrightness) {
              st.brightness = st.maxBrightness;
              st.phase = 'twinkle';
              // pick a random negative or positive small step for twinkle
              st.brightStep = st.brightStep * -1;
            }
            break;
  
          case 'twinkle':
            st.twinkleTimer++;
            st.brightness += st.brightStep;
            // flip brightStep if we exceed bounds
            if (st.brightness >= st.maxBrightness || st.brightness <= (st.maxBrightness * 0.5)) {
              st.brightStep *= -1;
            }
            // eventually get sucked in
            if (st.twinkleTimer > st.twinkleMax && starsInFlight < MAX_STARS_SUCKING) {
              st.phase = 'sucked';
              st.speed = 2 + Math.random() * 3;
              st.swirlAngle = Math.random() * Math.PI * 2;
              starsInFlight++;
            }
            break;
  
          case 'sucked':
            // swirl in around black hole
            st.swirlAngle -= 0.1; 
            const swirlRadius = 20; 
            const swirlX = Math.cos(st.swirlAngle) * swirlRadius;
            const swirlY = Math.sin(st.swirlAngle) * swirlRadius;
            const bhX = cw / 2;
            const bhY = ch * horizonFrac; // match black hole
            const angle = Math.atan2((bhY + swirlY) - st.y, (bhX + swirlX) - st.x);
            st.x += Math.cos(angle) * st.speed;
            st.y += Math.sin(angle) * st.speed;
  
            // if close enough, reset
            const dist = Math.hypot((bhX + swirlX) - st.x, (bhY + swirlY) - st.y);
            if (dist < singularityRadius) {
              // star consumed
              const newStar = createStar();
              Object.assign(st, newStar);
              starsInFlight--;
            }
            break;
        }
  
        // Draw star with alpha = brightness
        sctx.fillStyle = `rgba(255, 255, 255, ${st.brightness})`;
        sctx.beginPath();
        sctx.arc(st.x, st.y, st.size, 0, 2 * Math.PI);
        sctx.fill();
      }
    }
  
    // 8) Kick off the animation
    resizeAll();
    animate();
  })();
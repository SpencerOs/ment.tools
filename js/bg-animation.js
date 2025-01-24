//--------------------------------------------------
// bg-animation.js
//--------------------------------------------------
(() => {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return; // safety
  
    const ctx = canvas.getContext('2d');
  
    // Dynamic sizing
    let cw, ch; // canvas width/height
    function resizeCanvas() {
      cw = canvas.width = window.innerWidth;
      ch = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
  
    //--------------------------------------------------
    // 1) STAR FIELD
    //--------------------------------------------------
    const MAX_STARS = 150; // total number of stars at once
    const MAX_STARS_SUCKING = 20; // limit how many can be in "sucking" mode
    let stars = [];
    let starsInFlight = 0; // how many are currently being sucked in
  
    function createStar() {
      const star = {
        x: Math.random() * cw,
        y: Math.random() * (ch * 0.4), // only in top 40% if you want above the grid
        size: Math.random() * 1.5 + 0.5,
        maxBrightness: Math.random() * 0.8 + 0.2,
        brightness: 0, // start invisible
        brightStep: 0.01,
        phase: 'fadein', // fadein -> twinkle -> sucked
        twinkleTimer: 0,
        twinkleMax: Math.floor(Math.random() * 200 + 100),
        speed: 0, // we'll set when star is sucked in
      };
      return star;
    }
  
    // Initialize stars
    for (let i = 0; i < MAX_STARS; i++) {
      stars.push(createStar());
    }
  
    //--------------------------------------------------
    // 2) PERSPECTIVE GRID
    //--------------------------------------------------
    // We'll do a stylized approach: horizontally, lines from left to right
    // plus some "latitudinal" lines that shift in perspective.
  
    const LINE_COUNT_HORIZONTAL = 20;
    const LINE_COUNT_VERTICAL = 24;
    let horizontalLines = [];
    let verticalAngles = [];
    const horizonY = 0.4;
    const GRID_SPEED = 0.001;
    const GRID_LINE_SPACING = 40;
    for (let i = 0; i < LINE_COUNT_HORIZONTAL; i++) {
        horizontalLines.push({ param: i / LINE_COUNT_HORIZONTAL });
    }
    const maxAngle = Math.PI / 1.15;
    // We'll define angles from near-horizontal (0°) to vertical (90°) 
    // back down to near-horizontal (0°) as i goes 0..1
    for (let i = 0; i < LINE_COUNT_VERTICAL; i++) {
        let t = i / (LINE_COUNT_VERTICAL - 1);
        let s = 0.5 * (1 - Math.cos(Math.PI * t));
        let angle = -Math.PI / 2 + Math.PI * s;
        verticalAngles.push(angle);
    }
    
    //--------------------------------------------------
    // 3) ANIMATION LOOP
    //--------------------------------------------------
    function animate() {
      ctx.clearRect(0, 0, cw, ch);
  
      // Draw starfield
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
  
        // State machine for star brightness
        if (s.phase === 'fadein') {
          s.brightness += s.brightStep;
          if (s.brightness >= s.maxBrightness) {
            s.brightness = s.maxBrightness;
            s.phase = 'twinkle';

            const min = 0.001;
            const max = 0.01;
            const randomValue = Math.random() * (max - min) + min;
            s.brightStep = -1 * randomValue;
          }
        } else if (s.phase === 'twinkle') {
          s.twinkleTimer++;
          s.brightness += s.brightStep;
          if (s.twinkleTimer > s.twinkleMax && starsInFlight < MAX_STARS_SUCKING) {
            // trigger the "sucked in" flight
            s.phase = 'sucked';
            s.speed = 2 + Math.random() * 3; // how fast it moves inward
            starsInFlight++;
          }
          if (s.brightness >= s.maxBrightness) {
            s.brightStep = -1 * s.brightStep;
          } else if (s.brightness <= s.maxBrightness/2) {
            s.brightStep = -1 * s.brightStep;
          }
        } else if (s.phase === 'sucked') {
          if (s.swirlAngle === undefined) {
            s.swirlAngle = Math.random() * 2 * Math.PI;
          }
          // move star toward black hole center
          const bhX = cw / 2; 
          const bhY = ch * 0.4; // near top, match #black-hole's position
          s.swirlAngle -= 0.1;  // (ADDED swirl increment)
          const swirlRadius = 20; // tweak swirl size
          const swirlX = Math.cos(s.swirlAngle) * swirlRadius;
          const swirlY = Math.sin(s.swirlAngle) * swirlRadius;  // (ADDED)**
          const angle = Math.atan2((bhY + swirlY) - s.y, (bhX + swirlX) - s.x);
          s.x += Math.cos(angle) * s.speed;
          s.y += Math.sin(angle) * s.speed;
          // if close, remove & spawn new star
          const dist = Math.hypot(bhX - s.x, bhY - s.y);
          if (s.brightness >= s.maxBrightness) {
            s.brightStep = -1 * s.brightStep;
          } else if (s.brightness <= s.maxBrightness/2) {
            s.brightStep = -1 * s.brightStep;
          }
          if (dist < 40) {
            // star is "consumed"
            s.phase = 'fadein';
            s.x = Math.random() * cw;
            s.y = Math.random() * (ch * 0.4);
            s.brightness = 0;
            s.brightStep = 0.01;
            s.twinkleTimer = 0;
            s.twinkleMax = Math.floor(Math.random() * 200 + 100);
            starsInFlight--;
          }
        }
  
        // Twinkling brightness changes if you want that effect
        // e.g. s.brightness += Math.sin(performance.now()/100 + i)*0.0005;
  
        // Draw star
        ctx.fillStyle = `rgba(255, 255, 255, ${s.brightness})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      const horizonPix = ch * horizonY;
      const bottomY = ch;
      horizontalLines.forEach((line) => {
        line.param -= GRID_SPEED;
        if (line.param < 0) {
            line.param = 1;
        }
    
        const f = line.param;
        const y = horizonPix + (bottomY - horizonPix) * (f * f * f * f);
        if (y < horizonPix) return;

        ctx.strokeStyle = 'rgba(208, 43, 95, 0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(cw, y);
        ctx.stroke();
      });

      const vanishX = cw / 2;
      const horizonLineY = horizonPix;

      verticalAngles.forEach((angle) => {
        const dy = (ch - horizonLineY);
        const dx = dy * Math.tan(angle);
        const endX = vanishX + dx;
        const endY = ch;

        ctx.strokeStyle = 'rgba(208, 43, 95, 0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(vanishX, horizonLineY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      });
  
      requestAnimationFrame(animate);
    }
    animate();
  
  })();
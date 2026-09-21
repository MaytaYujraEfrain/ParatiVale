// ====================================================
// FLORES AMARILLAS - LÓGICA E INTERACTIVIDAD
// ====================================================

document.addEventListener('DOMContentLoaded', () => {
  // ====================================================
  // ✨ 1. CANVAS: CIELO ESTRELLADO, LUCIÉRNAGAS Y PÉTALOS
  // ====================================================
  const canvas = document.getElementById('star-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    // Generar estrellas titilantes
    const stars = [];
    for (let i = 0; i < 140; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.8,
        r: Math.random() * 1.5,
        alpha: Math.random(),
        twinkleSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    // Generar luciérnagas brillantes flotantes
    const fireflies = [];
    for (let i = 0; i < 90; i++) {
      fireflies.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2.2 + 0.8,
        dx: (Math.random() - 0.5) * 0.7,
        dy: -Math.random() * 0.7 - 0.2,
        alpha: Math.random() * 0.7 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    // Generar pétalos amarillos cayendo suavemente
    const petals = [];
    for (let i = 0; i < 22; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 6 + 5,
        dy: Math.random() * 0.8 + 0.5,
        dx: Math.sin(Math.random() * 2) * 0.5,
        angle: Math.random() * 360,
        spin: (Math.random() - 0.5) * 0.02,
        alpha: Math.random() * 0.4 + 0.3,
      });
    }

    function renderAnimation() {
      ctx.clearRect(0, 0, width, height);

      // Renderizar estrellas
      stars.forEach((s) => {
        s.alpha += s.twinkleSpeed;
        if (s.alpha > 1 || s.alpha < 0.1) s.twinkleSpeed *= -1;
        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Renderizar luciérnagas
      fireflies.forEach((f) => {
        f.alpha += f.pulseSpeed;
        if (f.alpha > 1 || f.alpha < 0.2) f.pulseSpeed *= -1;

        ctx.fillStyle = `rgba(255, 235, 59, ${f.alpha})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#ffd600';
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();

        f.x += f.dx;
        f.y += f.dy;
        if (f.y < -10) f.y = height + 10;
        if (f.x < 0) f.x = width;
        if (f.x > width) f.x = 0;
      });

      // Renderizar pétalos flotantes
      petals.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = `rgba(255, 215, 0, ${p.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(255, 180, 0, 0.4)';
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r * 0.5, p.r, Math.PI / 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();

        p.y += p.dy;
        p.x += Math.sin(p.y * 0.015) * 0.6;
        p.angle += p.spin;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
      });

      requestAnimationFrame(renderAnimation);
    }
    renderAnimation();
  }

  // ====================================================
  // 💖 2. EFECTO DE CORAZONES AL HACER CLIC / TOUCH
  // ====================================================
  window.addEventListener('pointerdown', (e) => {
    // Evitar generar corazones si se hace clic sobre botones o la carta
    if (e.target.closest('button') || e.target.closest('.letter-modal')) return;

    for (let i = 0; i < 3; i++) {
      const heart = document.createElement('span');
      heart.classList.add('click-heart');
      heart.innerHTML = ['💛', '✨', '💖'][Math.floor(Math.random() * 3)];
      heart.style.left = `${e.clientX}px`;
      heart.style.top = `${e.clientY}px`;
      heart.style.setProperty('--hx', `${(Math.random() - 0.5) * 60}px`);
      heart.style.animationDelay = `${i * 0.08}s`;
      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 1500);
    }
  });

  // ====================================================
  // 💌 3. MODAL DE LA CARTA ROMÁNTICA Y EFECTOS
  // ====================================================
  const letterOpenBtn = document.getElementById('letterOpenBtn');
  const letterCloseBtn = document.getElementById('letterCloseBtn');
  const letterModal = document.getElementById('letterModal');

  function triggerLetterSparkles() {
    const symbols = ['💛', '✨', '💖', '⭐', '🌸', '💫'];
    const count = 18;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const heart = document.createElement('span');
        heart.classList.add('click-heart');
        heart.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
        
        // Dispersión radial desde el centro
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 180 + 80;
        const startX = centerX + (Math.random() - 0.5) * 80;
        const startY = centerY + (Math.random() - 0.5) * 80;
        
        heart.style.left = `${startX}px`;
        heart.style.top = `${startY}px`;
        heart.style.setProperty('--hx', `${Math.cos(angle) * distance}px`);
        heart.style.animationDuration = '1.8s';
        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 1800);
      }, i * 45);
    }
  }

  if (letterOpenBtn && letterModal) {
    letterOpenBtn.addEventListener('click', () => {
      letterModal.classList.add('active');
      triggerLetterSparkles();
    });
  }

  if (letterCloseBtn && letterModal) {
    letterCloseBtn.addEventListener('click', () => {
      letterModal.classList.remove('active');
      triggerLetterSparkles();
    });
  }

  // Cerrar al hacer clic fuera de la tarjeta
  if (letterModal) {
    letterModal.addEventListener('click', (e) => {
      if (e.target === letterModal) {
        letterModal.classList.remove('active');
      }
    });
  }

  // ====================================================
  // 🌟 4. EXPERIENCIA SINCRONIZADA (MÚSICA + FLORES JUNTAS)
  // ====================================================
  const introScreen = document.getElementById('introScreen');
  const startBtn = document.getElementById('startBtn');
  const bgMusic = document.getElementById('bgMusic');
  const muteBtn = document.getElementById('muteToggle');
  const muteIcon = document.getElementById('muteIcon');
  let hasStarted = false;
  let userPaused = false;

  function startExperience() {
    if (hasStarted) return;
    hasStarted = true;

    // 1. Iniciar la música exactamente al salir las flores
    if (bgMusic) {
      bgMusic.volume = 0.9;
      bgMusic.play().then(() => {
        if (muteIcon) muteIcon.innerText = '🔊';
      }).catch((e) => console.log('Audio error:', e));
    }

    // 2. Activar las flores y animaciones en este instante exacto
    document.body.classList.remove('not-loaded');

    // 3. Desvanecer la pantalla de bienvenida
    if (introScreen) {
      introScreen.classList.add('fade-out');
      setTimeout(() => introScreen.remove(), 850);
    }

    // 4. Lluvia de destellos dorados iniciales
    if (typeof triggerLetterSparkles === 'function') {
      triggerLetterSparkles();
    }
  }

  // Activar al hacer clic en el botón o tocar la pantalla de bienvenida
  if (startBtn) {
    startBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      startExperience();
    });
  }

  if (introScreen) {
    introScreen.addEventListener('click', startExperience);
    introScreen.addEventListener('touchstart', startExperience, { passive: true });
  }

  // También iniciar con tecla Enter o Espacio
  window.addEventListener('keydown', (e) => {
    if (!hasStarted && (e.key === 'Enter' || e.key === ' ')) {
      startExperience();
    }
  });

  // 5. Botón flotante para pausar o reanudar manualmente
  if (muteBtn && bgMusic) {
    muteBtn.addEventListener('click', (e) => {
      e.stopPropagation();

      if (bgMusic.paused) {
        userPaused = false;
        bgMusic.play().then(() => {
          if (muteIcon) muteIcon.innerText = '🔊';
        });
      } else {
        userPaused = true;
        bgMusic.pause();
        if (muteIcon) muteIcon.innerText = '🔇';
      }
    });
  }
});

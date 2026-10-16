/**
 * Armee Enterprises - Noori Horizon Hero Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Modals Setup ---
  const enquiryModal = document.getElementById('enquiryModal');
  const videoModal = document.getElementById('videoModal');
  const projectModal = document.getElementById('projectModal');
  const mobileDrawer = document.getElementById('mobileDrawer');

  const openEnquiryBtns = document.querySelectorAll('.js-open-enquiry');
  const openVideoBtns = document.querySelectorAll('.js-open-video');
  const openProjectBtns = document.querySelectorAll('.js-open-project');
  const mobileToggles = document.querySelectorAll('.js-mobile-drawer-toggle, #mobileToggle, .mobile-hamburger-btn');
  const closeDrawerBtn = document.getElementById('closeDrawer');
  const modalCloseBtns = document.querySelectorAll('.modal-close-btn');

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Stop any iframe video playing on modal close
    const iframe = modal.querySelector('iframe');
    if (iframe) {
      const src = iframe.src;
      iframe.src = src;
    }
  }

  // Bind Open Buttons
  openEnquiryBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(enquiryModal);
      if (mobileDrawer) mobileDrawer.classList.remove('active');
    });
  });

  openVideoBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(videoModal);
    });
  });

  openProjectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(projectModal);
    });
  });

  // Bind Close Buttons
  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      closeModal(modal);
    });
  });

  // Close on Backdrop Click
  [enquiryModal, videoModal, projectModal].forEach(modal => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Escape Key to Close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      [enquiryModal, videoModal, projectModal].forEach(closeModal);
      if (mobileDrawer) mobileDrawer.classList.remove('active');
    }
  });

  // Mobile Drawer Toggle
  mobileToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      if (mobileDrawer) {
        mobileDrawer.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeDrawerBtn && mobileDrawer) {
    closeDrawerBtn.addEventListener('click', () => {
      mobileDrawer.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Close Mobile Drawer on Link Click
  if (mobileDrawer) {
    const drawerLinks = mobileDrawer.querySelectorAll('a[href^="#"]');
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  const WHATSAPP_NUMBER = '917021466707';

  function redirectToWhatsApp(messageText) {
    const encoded = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
    const win = window.open(whatsappUrl, '_blank');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = whatsappUrl;
    }
  }

  // Handle Enquiry Modal Form Submission -> WhatsApp
  const enquiryForm = document.getElementById('enquiryForm');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = enquiryForm.querySelector('.form-submit-btn');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Connecting to WhatsApp...';
      submitBtn.disabled = true;

      const name = document.getElementById('enquiryFullName')?.value.trim() || 'Not specified';
      const phone = document.getElementById('enquiryPhone')?.value.trim() || 'Not specified';
      const email = document.getElementById('enquiryEmail')?.value.trim() || 'Not specified';
      const config = document.getElementById('enquiryConfig')?.value.trim() || 'Not specified';

      const waMessage = 
`*New Enquiry - Armee Enterprises (Noori Horizon)*
━━━━━━━━━━━━━━━━━━━━
👤 *Name:* ${name}
📞 *Phone:* ${phone}
✉️ *Email:* ${email}
🏢 *Preference:* ${config}
━━━━━━━━━━━━━━━━━━━━
_Submitted via website form_`;

      setTimeout(() => {
        redirectToWhatsApp(waMessage);
        enquiryForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        closeModal(enquiryModal);
      }, 350);
    });
  }

  // Handle Contact Section Form Submission -> WhatsApp
  const contactSectionForm = document.getElementById('contactSectionForm');
  if (contactSectionForm) {
    contactSectionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactSectionForm.querySelector('.contact-submit-btn');
      const btnSpan = submitBtn.querySelector('span');
      const originalText = btnSpan ? btnSpan.textContent : submitBtn.textContent;
      if (btnSpan) btnSpan.textContent = 'Connecting to WhatsApp...';
      submitBtn.disabled = true;

      const name = document.getElementById('contactFullName')?.value.trim() || 'Not specified';
      const phone = document.getElementById('contactPhone')?.value.trim() || 'Not specified';
      const email = document.getElementById('contactEmail')?.value.trim() || 'Not specified';
      const inquiryType = document.getElementById('contactInquiryType')?.value.trim() || 'General Inquiry';
      const message = document.getElementById('contactMessage')?.value.trim() || 'None provided';

      const waMessage = 
`*New Corporate Inquiry - Armee Enterprises*
━━━━━━━━━━━━━━━━━━━━
👤 *Name:* ${name}
📞 *Phone:* ${phone}
✉️ *Email:* ${email}
📋 *Inquiry Type:* ${inquiryType}
💬 *Message:*
${message}
━━━━━━━━━━━━━━━━━━━━
_Submitted via website form_`;

      setTimeout(() => {
        redirectToWhatsApp(waMessage);
        contactSectionForm.reset();
        if (btnSpan) btnSpan.textContent = originalText;
        submitBtn.disabled = false;
      }, 350);
    });
  }

  // Handle About Section "Read More" Toggle on Mobile
  const aboutReadMoreBtn = document.getElementById('aboutReadMoreBtn');
  const aboutExtraText = document.getElementById('aboutExtraText');
  if (aboutReadMoreBtn && aboutExtraText) {
    aboutReadMoreBtn.addEventListener('click', () => {
      const isExpanded = aboutExtraText.classList.toggle('is-open');
      aboutReadMoreBtn.classList.toggle('is-expanded', isExpanded);
      aboutReadMoreBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
      const textSpan = aboutReadMoreBtn.querySelector('.readmore-text');
      if (textSpan) {
        textSpan.textContent = isExpanded ? 'Read Less' : 'Read More';
      }
    });
  }

  // Navigation Active State on Scroll
  const navSections = document.querySelectorAll('section[id], header[id]');
  const desktopNavItems = document.querySelectorAll('.desktop-nav-links .nav-item');

  function updateNavActiveState() {
    let currentId = '';
    const scrollPos = window.scrollY + 200;

    navSections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      desktopNavItems.forEach(item => {
        const link = item.querySelector('a');
        if (link && link.getAttribute('href') === `#${currentId}`) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
  }

  window.addEventListener('scroll', updateNavActiveState, { passive: true });

  // ==========================================================================
  // CREATIVE MOBILE LEADERSHIP CAROUSEL CONTROLLER
  // Horizontal snapping with dynamic active indicators, dot pills & arrows
  // ==========================================================================
  const leadershipControlGroups = document.querySelectorAll('.leadership-mobile-controls');
  
  leadershipControlGroups.forEach(controlGroup => {
    const targetId = controlGroup.getAttribute('data-target');
    const row = document.getElementById(targetId);
    if (!row) return;

    const cards = row.querySelectorAll('.leader-card');
    const dots = controlGroup.querySelectorAll('.leadership-dot');
    const prevBtn = controlGroup.querySelector('.prev-btn');
    const nextBtn = controlGroup.querySelector('.next-btn');

    let isScrolling = false;

    function getCardIndex() {
      const rowCenter = row.scrollLeft + row.clientWidth / 2;
      let closestIdx = 0;
      let minDiff = Infinity;

      cards.forEach((card, idx) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const diff = Math.abs(rowCenter - cardCenter);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });
      return closestIdx;
    }

    function updateActiveState() {
      const activeIdx = getCardIndex();
      
      cards.forEach((card, idx) => {
        card.classList.toggle('is-active', idx === activeIdx);
      });

      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activeIdx);
      });
    }

    function scrollToCard(index) {
      if (index < 0 || index >= cards.length) return;
      const card = cards[index];
      const scrollTarget = card.offsetLeft - (row.clientWidth - card.offsetWidth) / 2;
      row.scrollTo({
        left: scrollTarget,
        behavior: 'smooth'
      });
    }

    row.addEventListener('scroll', () => {
      if (!isScrolling) {
        window.requestAnimationFrame(() => {
          updateActiveState();
          isScrolling = false;
        });
        isScrolling = true;
      }
    }, { passive: true });

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        scrollToCard(idx);
      });
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const currentIdx = getCardIndex();
        scrollToCard(Math.max(0, currentIdx - 1));
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const currentIdx = getCardIndex();
        scrollToCard(Math.min(cards.length - 1, currentIdx + 1));
      });
    }
  });

  // ==========================================================================
  // ATMOSPHERIC LUXURY WIND ENGINE
  // Realistic breeze streamlines, twilight floating dust/embers & natural gusts
  // ==========================================================================

  class LuxuryWindEngine {
    constructor(canvas, isMobile = false) {
      this.canvas = canvas;
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.isMobile = isMobile;
      this.parent = this.canvas.parentElement;

      this.width = 0;
      this.height = 0;
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);

      // Configuration - Balanced Cinematic Horizon Breeze
      this.streamlineCount = this.isMobile ? 6 : 14;
      this.particleCount = this.isMobile ? 14 : 32;
      this.vortexCount = 0;

      this.streamlines = [];
      this.particles = [];
      this.vortices = [];

      // Mouse Wind Interaction
      this.mouse = {
        x: -9999,
        y: -9999,
        vx: 0,
        vy: 0,
        lastX: -9999,
        lastY: -9999,
        active: false,
        decayTimer: null
      };

      // Natural Gust Rhythm
      this.gustTime = Math.random() * 100;
      this.currentGust = 1.0;

      // Color Palette - Matching 24K Gold & Twilight Horizon
      this.colors = {
        goldBright: { r: 252, g: 211, b: 97 },
        goldWarm: { r: 243, g: 186, b: 66 },
        goldDeep: { r: 229, g: 164, b: 45 },
        champagne: { r: 255, g: 248, b: 230 },
        twilightWhite: { r: 235, g: 242, b: 255 }
      };

      this.palette = [
        this.colors.goldBright,
        this.colors.champagne,
        this.colors.goldWarm,
        this.colors.goldDeep,
        this.colors.twilightWhite
      ];

      this.animationFrameId = null;
      this.isVisible = true;

      this.init();
    }

    init() {
      this.resize();
      this.createEntities();
      this.bindEvents();
      this.animate();
    }

    resize() {
      if (!this.canvas || !this.parent) return;
      const rect = this.parent.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      this.width = rect.width;
      this.height = rect.height;
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);

      this.canvas.width = Math.floor(this.width * this.dpr);
      this.canvas.height = Math.floor(this.height * this.dpr);
      this.canvas.style.width = `${this.width}px`;
      this.canvas.style.height = `${this.height}px`;

      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    }

    createStreamline(initRandomX = false) {
      const color = this.palette[Math.floor(Math.random() * this.palette.length)];
      const length = this.isMobile ? (100 + Math.random() * 140) : (150 + Math.random() * 220);
      const speed = this.isMobile ? (1.3 + Math.random() * 1.3) : (1.6 + Math.random() * 1.8);

      return {
        x: initRandomX ? (Math.random() * (this.width + 200) - 100) : (-length - Math.random() * 120),
        y: Math.random() * (this.height * 0.90) + (this.height * 0.05),
        length: length,
        speed: speed,
        baseSpeed: speed,
        width: 0.7 + Math.random() * 0.9, // Distinct, elegant silky breeze strand
        amp: 3 + Math.random() * 6,       // Natural undulating curve
        freq: 0.003 + Math.random() * 0.0035,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.018 + Math.random() * 0.018,
        tilt: -0.01 + Math.random() * 0.025,
        color: color,
        maxAlpha: 0.16 + Math.random() * 0.22 // Clearly visible, graceful luminous ribbon
      };
    }

    createParticle(initRandomX = false) {
      const color = this.palette[Math.floor(Math.random() * this.palette.length)];
      const size = 0.7 + Math.random() * (this.isMobile ? 1.0 : 1.5);
      const speedX = 0.9 + Math.random() * (this.isMobile ? 1.2 : 1.7);

      return {
        x: initRandomX ? Math.random() * this.width : -10 - Math.random() * 40,
        y: Math.random() * this.height,
        baseY: Math.random() * this.height,
        size: size,
        speedX: speedX,
        floatFreq: 0.0018 + Math.random() * 0.0025,
        floatAmp: 0.3 + Math.random() * 0.8,
        seed: Math.random() * 100,
        alpha: 0.2 + Math.random() * 0.35,
        baseAlpha: 0.2 + Math.random() * 0.35,
        pulseSpeed: 0.018 + Math.random() * 0.025,
        color: color
      };
    }

    createVortex() {
      return null;
    }

    createEntities() {
      this.streamlines = [];
      for (let i = 0; i < this.streamlineCount; i++) {
        this.streamlines.push(this.createStreamline(true));
      }

      this.particles = [];
      for (let i = 0; i < this.particleCount; i++) {
        this.particles.push(this.createParticle(true));
      }

      this.vortices = [];
    }

    bindEvents() {
      // Resize handling with debouncing
      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          this.resize();
        }, 120);
      });

      // Mouse Interaction on the Hero Container
      if (this.parent) {
        this.parent.addEventListener('mousemove', (e) => {
          const rect = this.parent.getBoundingClientRect();
          const currentX = e.clientX - rect.left;
          const currentY = e.clientY - rect.top;

          if (this.mouse.lastX !== -9999) {
            this.mouse.vx = (currentX - this.mouse.lastX) * 0.35;
            this.mouse.vy = (currentY - this.mouse.lastY) * 0.35;
          }

          this.mouse.x = currentX;
          this.mouse.y = currentY;
          this.mouse.lastX = currentX;
          this.mouse.lastY = currentY;
          this.mouse.active = true;

          clearTimeout(this.mouse.decayTimer);
          this.mouse.decayTimer = setTimeout(() => {
            this.mouse.active = false;
            this.mouse.x = -9999;
            this.mouse.y = -9999;
            this.mouse.vx = 0;
            this.mouse.vy = 0;
            this.mouse.lastX = -9999;
            this.mouse.lastY = -9999;
          }, 800);
        });

        this.parent.addEventListener('mouseleave', () => {
          this.mouse.active = false;
          this.mouse.x = -9999;
          this.mouse.y = -9999;
          this.mouse.vx = 0;
          this.mouse.vy = 0;
          this.mouse.lastX = -9999;
          this.mouse.lastY = -9999;
        });
      }

      // Visibility state
      document.addEventListener('visibilitychange', () => {
        this.isVisible = !document.hidden;
        if (this.isVisible && !this.animationFrameId) {
          this.animate();
        }
      });
    }

    update() {
      // Natural organic gust rhythm
      this.gustTime += 0.014;
      const naturalGust = 1.0 + Math.max(0, Math.sin(this.gustTime * 0.4) * 0.25);
      this.currentGust = naturalGust;

      // Update Streamlines
      for (let i = 0; i < this.streamlines.length; i++) {
        const s = this.streamlines[i];

        // Move with gentle gust speed
        let speed = s.speed * this.currentGust;

        // Subtle, smooth mouse deflection
        if (this.mouse.active) {
          const dx = s.x - this.mouse.x;
          const dy = s.y - this.mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influenceRadius = 150;

          if (dist < influenceRadius && dist > 1) {
            const force = (1 - dist / influenceRadius);
            s.y += (dy / dist) * force * 1.2;
            speed += force * 0.5;
          }
        }

        s.x += speed;
        s.phase += s.phaseSpeed;

        // Reset when drifted off screen
        if (s.x - s.length > this.width + 50) {
          this.streamlines[i] = this.createStreamline(false);
        }
      }

      // Update Floating Particles
      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];

        let speedX = p.speedX * this.currentGust;

        // Soft mouse influence on particles
        if (this.mouse.active) {
          const dx = p.x - this.mouse.x;
          const dy = p.y - this.mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influenceRadius = 120;

          if (dist < influenceRadius && dist > 1) {
            const force = (1 - dist / influenceRadius);
            p.x += (dx / dist) * force * 1.0;
            p.y += (dy / dist) * force * 1.0;
            speedX += force * 0.6;
          }
        }

        p.x += speedX;
        p.baseY += Math.sin(this.gustTime + p.seed) * p.floatAmp * 0.2;
        p.y = p.baseY + Math.sin(this.gustTime * 1.5 + p.seed) * p.floatAmp;

        // Subtle alpha shimmering
        p.alpha = Math.max(0.06, p.baseAlpha + Math.sin(this.gustTime * 2 + p.seed) * 0.08);

        // Reset particle when off screen
        if (p.x > this.width + 20) {
          this.particles[i] = this.createParticle(false);
        }
      }
    }

    draw() {
      this.ctx.clearRect(0, 0, this.width, this.height);

      // 1. Draw Streamlines (Soft, subtle silk breeze strands)
      for (let i = 0; i < this.streamlines.length; i++) {
        const s = this.streamlines[i];
        const tailX = s.x - s.length;
        const headX = s.x;

        // Calculate smooth wavy path points
        const segments = 12;
        const step = s.length / segments;

        this.ctx.beginPath();

        let startY = s.y + Math.sin(tailX * s.freq + s.phase) * s.amp;
        this.ctx.moveTo(tailX, startY);

        for (let j = 1; j <= segments; j++) {
          const currentX = tailX + j * step;
          const currentY = s.y + (currentX - s.x) * s.tilt + Math.sin(currentX * s.freq + s.phase) * s.amp;
          this.ctx.lineTo(currentX, currentY);
        }

        // Tapered Gradient along the line
        const grad = this.ctx.createLinearGradient(tailX, s.y, headX, s.y);
        const { r, g, b } = s.color;
        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
        grad.addColorStop(0.2, `rgba(${r}, ${g}, ${b}, ${s.maxAlpha * 0.35})`);
        grad.addColorStop(0.65, `rgba(${r}, ${g}, ${b}, ${s.maxAlpha})`);
        grad.addColorStop(0.9, `rgba(${r}, ${g}, ${b}, ${s.maxAlpha * 0.4})`);
        grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        this.ctx.strokeStyle = grad;
        this.ctx.lineWidth = s.width;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.stroke();
      }

      // 2. Draw Atmospheric Floating Particles (Delicate glowing motes)
      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        if (p.alpha <= 0.01) continue;

        const { r, g, b } = p.color;

        // Soft outer atmospheric glow
        if (p.size > 1.2) {
          this.ctx.beginPath();
          this.ctx.arc(p.x, p.y, p.size * 2.8, 0, Math.PI * 2);
          this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.alpha * 0.15})`;
          this.ctx.fill();
        }

        // Core particle
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.alpha})`;
        this.ctx.fill();
      }
    }

    animate() {
      if (!this.isVisible) {
        this.animationFrameId = null;
        return;
      }

      // Only calculate & render if canvas is currently displayed
      if (this.canvas.offsetParent !== null) {
        if (this.width === 0) this.resize();
        this.update();
        this.draw();
      }

      this.animationFrameId = requestAnimationFrame(() => this.animate());
    }
  }

  // Initialize Wind Engines for Desktop & Mobile Hero
  const desktopCanvas = document.getElementById('desktopWindCanvas');
  if (desktopCanvas) {
    new LuxuryWindEngine(desktopCanvas, false);
  }

  const mobileCanvas = document.getElementById('mobileWindCanvas');
  if (mobileCanvas) {
    new LuxuryWindEngine(mobileCanvas, true);
  }
});

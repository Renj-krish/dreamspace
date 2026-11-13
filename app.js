/**
 * DREAMESCAPE - Interactive Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================
  // 1. STICKY HEADER ON SCROLL
  // ==========================================================
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // ==========================================================
  // 2. MOBILE MENU TOGGLE
  // ==========================================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mainNav.classList.toggle('mobile-active');
      mobileMenuBtn.classList.toggle('open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target)) {
        mainNav.classList.remove('mobile-active');
        mobileMenuBtn.classList.remove('open');
      }
    });

    // Close menu on link click
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('mobile-active');
        mobileMenuBtn.classList.remove('open');
      });
    });
  }

  // ==========================================================
  // 3. AUTOMATIC HERO SLIDER TRANSITIONS
  // ==========================================================
  const heroSlides = [
    {
      title: "Cook Islands",
      eyebrow: "EXPLORE • DREAM • TRAVEL",
      desc: "360° Virtual Tour. An unspoiled paradise, complete with<br>white sand beaches, blue lagoons, and lush green mountains.",
      cta: "Explore Our Little Paradise"
    },
    {
      title: "Maldives Atolls",
      eyebrow: "TRANQUILITY • LUXURY • ESCAPE",
      desc: "Bespoke overwater villa retreats, pristine coral reefs,<br>and tranquil sunsets over the Indian Ocean.",
      cta: "Explore Our Luxury Villas"
    },
    {
      title: "Swiss Alps",
      eyebrow: "ADVENTURE • NATURE • SERENITY",
      desc: "Majestic alpine summits, panoramic train expeditions,<br>and world-renowned luxury mountain wellness sanctuaries.",
      cta: "Explore The Alpine Wonder"
    }
  ];

  const heroTextBlock = document.getElementById('heroTextBlock');
  const heroTitle = document.getElementById('heroTitle');
  const heroEyebrow = document.getElementById('heroEyebrow');
  const heroDesc = document.getElementById('heroDesc');
  const heroCtaText = document.getElementById('heroCtaText');
  const heroSlideBgs = document.querySelectorAll('.hero-slide-bg');

  let currentSlideIndex = 0;
  const slideDuration = 5000; // Automatic shift every 5 seconds

  function transitionToSlide(nextIndex) {
    if (nextIndex === currentSlideIndex) return;

    // Cross-fade background images
    heroSlideBgs.forEach((bg, idx) => {
      bg.classList.toggle('active', idx === nextIndex);
    });

    // Smoothly transition text content
    if (heroTextBlock) {
      heroTextBlock.classList.add('transitioning');

      setTimeout(() => {
        const slide = heroSlides[nextIndex];
        if (heroTitle) heroTitle.textContent = slide.title;
        if (heroEyebrow) heroEyebrow.textContent = slide.eyebrow;
        if (heroDesc) heroDesc.innerHTML = slide.desc;
        if (heroCtaText) heroCtaText.textContent = slide.cta;

        heroTextBlock.classList.remove('transitioning');
      }, 350);
    }

    currentSlideIndex = nextIndex;
  }

  function nextHeroSlide() {
    const nextIndex = (currentSlideIndex + 1) % heroSlides.length;
    transitionToSlide(nextIndex);
  }

  // Start automatic rotation
  let heroAutoInterval = setInterval(nextHeroSlide, slideDuration);

  // Pause briefly if user hovers to read
  if (heroTextBlock) {
    heroTextBlock.addEventListener('mouseenter', () => {
      clearInterval(heroAutoInterval);
    });
    heroTextBlock.addEventListener('mouseleave', () => {
      heroAutoInterval = setInterval(nextHeroSlide, slideDuration);
    });
  }

  // ==========================================================
  // 4. FLOATING SEARCH FILTER INTERACTIONS
  // ==========================================================
  const filterMappings = [
    { selectId: 'selectDestination', valId: 'valDestination', defaultText: 'Where do you want to go?' },
    { selectId: 'selectTravelType', valId: 'valTravelType', defaultText: 'Any Type' },
    { selectId: 'selectDuration', valId: 'valDuration', defaultText: 'Any Duration' },
    { selectId: 'selectBudget', valId: 'valBudget', defaultText: 'Any Budget' }
  ];

  filterMappings.forEach(mapping => {
    const sel = document.getElementById(mapping.selectId);
    const val = document.getElementById(mapping.valId);
    if (sel && val) {
      sel.addEventListener('change', () => {
        val.textContent = sel.value ? sel.value : mapping.defaultText;
        if (sel.value) {
          val.style.color = '#0f172a';
          val.style.fontWeight = '600';
        } else {
          val.style.color = '#94a3b8';
          val.style.fontWeight = '400';
        }
      });
    }
  });

  const searchFilterForm = document.getElementById('searchFilterForm');
  if (searchFilterForm) {
    searchFilterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const dest = document.getElementById('selectDestination').value || 'Any Destination';
      const type = document.getElementById('selectTravelType').value || 'Any Type';
      showToast(`Searching curated trips for: ${dest} (${type})`);

      // Scroll smoothly to packages section
      const packagesSec = document.getElementById('packages');
      if (packagesSec) {
        packagesSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ==========================================================
  // 5. TESTIMONIALS SLIDER
  // ==========================================================
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const dotButtons = document.querySelectorAll('.dot-btn');
  const prevBtn = document.getElementById('testimonialPrev');
  const nextBtn = document.getElementById('testimonialNext');

  let currentTestimonial = 0;

  function showTestimonial(index) {
    if (index < 0) index = testimonialSlides.length - 1;
    if (index >= testimonialSlides.length) index = 0;
    currentTestimonial = index;

    testimonialSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    dotButtons.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showTestimonial(currentTestimonial - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      showTestimonial(currentTestimonial + 1);
    });
  }

  dotButtons.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-slide'), 10);
      showTestimonial(idx);
    });
  });

  // ==========================================================
  // 6. VIDEO MODAL (Watch Video)
  // ==========================================================
  const watchVideoBtn = document.getElementById('watchVideoBtn');
  const videoModal = document.getElementById('videoModal');
  const videoModalClose = document.getElementById('videoModalClose');
  const videoIframe = document.getElementById('videoIframe');

  // Embeddable high-definition travel reel of Cook Islands
  const videoUrl = "https://www.youtube.com/embed/eN_n08j53mU?autoplay=1&rel=0";

  if (watchVideoBtn && videoModal) {
    watchVideoBtn.addEventListener('click', () => {
      videoIframe.src = videoUrl;
      videoModal.classList.add('active');
    });

    videoModalClose.addEventListener('click', () => {
      videoModal.classList.remove('active');
      videoIframe.src = '';
    });

    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        videoModal.classList.remove('active');
        videoIframe.src = '';
      }
    });
  }

  // ==========================================================
  // 7. ENQUIRY MODAL (Enquire Now / View Details)
  // ==========================================================
  const enquiryModal = document.getElementById('enquiryModal');
  const enquiryModalClose = document.getElementById('enquiryModalClose');
  const modalBadge = document.getElementById('modalBadge');
  const modalTitle = document.getElementById('modalTitle');
  const eqDestination = document.getElementById('eqDestination');
  const enquiryForm = document.getElementById('enquiryForm');

  // Trigger from "Enquire Now" buttons
  document.querySelectorAll('.enquire-modal-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      modalBadge.textContent = 'Custom Itinerary';
      modalTitle.textContent = 'Plan Your Dreamescape';
      eqDestination.value = 'Cook Islands';
      enquiryModal.classList.add('active');
    });
  });

  // Trigger from Package "View Details" buttons
  document.querySelectorAll('.pkg-details-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const title = btn.getAttribute('data-pkg-title');
      const price = btn.getAttribute('data-pkg-price');
      const duration = btn.getAttribute('data-pkg-duration');
      const loc = btn.getAttribute('data-pkg-loc');

      modalBadge.textContent = `${duration} • Starting from ${price}`;
      modalTitle.textContent = `Enquire for ${title}`;
      eqDestination.value = `${loc} (${title})`;
      enquiryModal.classList.add('active');
    });
  });

  // Trigger from Destination Cards
  document.querySelectorAll('.destination-card').forEach(card => {
    card.addEventListener('click', () => {
      const name = card.querySelector('.dest-name')?.textContent || 'Dream Destination';
      const region = card.querySelector('.dest-region')?.textContent || '';
      modalBadge.textContent = `Featured Destination`;
      modalTitle.textContent = `Plan a trip to ${name}`;
      eqDestination.value = `${name}, ${region}`;
      enquiryModal.classList.add('active');
    });
  });

  if (enquiryModalClose) {
    enquiryModalClose.addEventListener('click', () => {
      enquiryModal.classList.remove('active');
    });

    enquiryModal.addEventListener('click', (e) => {
      if (e.target === enquiryModal) {
        enquiryModal.classList.remove('active');
      }
    });
  }

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('eqName').value;
      enquiryModal.classList.remove('active');
      enquiryForm.reset();
      showToast(`Thank you, ${name}! Your Dreamescape enquiry is received.`);
    });
  }

  // ==========================================================
  // 8. NEWSLETTER SUBSCRIPTION
  // ==========================================================
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      newsletterForm.reset();
      showToast('Thank you for subscribing to Dreamescape deals!');
    });
  }

  // ==========================================================
  // 9. TOAST NOTIFICATION HELPER
  // ==========================================================
  const toast = document.getElementById('toastNotification');
  const toastText = document.getElementById('toastText');
  let toastTimer = null;

  function showToast(message) {
    if (!toast || !toastText) return;
    toastText.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }


  // ==========================================================
  // 10. CONSENT MODAL (TERMS & PRIVACY POLICY)
  // ==========================================================
  const consentModal = document.getElementById('consentModal');
  const consentAgree = document.getElementById('consentAgree');
  const consentDisagree = document.getElementById('consentDisagree');
  const consentTabBtns = document.querySelectorAll('.consent-tab-btn');

  // Tab switching
  consentTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      consentTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.consent-tab-content').forEach(c => c.classList.remove('active'));
      const targetId = btn.dataset.tab === 'terms' ? 'tabTerms' : 'tabPrivacy';
      document.getElementById(targetId).classList.add('active');
    });
  });

  // Agree: close modal, store in sessionStorage
  if (consentAgree) {
    consentAgree.addEventListener('click', () => {
      consentModal.classList.remove('active');
      sessionStorage.setItem('dreamescape_consent', 'agreed');
    });
  }

  // Disagree: show toast and re-open after delay
  if (consentDisagree) {
    consentDisagree.addEventListener('click', () => {
      consentModal.classList.remove('active');
      showToast('You must agree to our Terms & Conditions to use this website.');
      setTimeout(() => { consentModal.classList.add('active'); }, 3500);
    });
  }

  // Footer links: open consent modal on correct tab
  const footerTermsLink = document.getElementById('footerTermsLink');
  const footerPrivacyLink = document.getElementById('footerPrivacyLink');
  if (footerTermsLink) {
    footerTermsLink.addEventListener('click', (e) => {
      e.preventDefault();
      consentTabBtns.forEach(b => b.classList.remove('active'));
      consentTabBtns[0] && consentTabBtns[0].classList.add('active');
      document.querySelectorAll('.consent-tab-content').forEach(c => c.classList.remove('active'));
      document.getElementById('tabTerms').classList.add('active');
      consentModal.classList.add('active');
    });
  }
  if (footerPrivacyLink) {
    footerPrivacyLink.addEventListener('click', (e) => {
      e.preventDefault();
      consentTabBtns.forEach(b => b.classList.remove('active'));
      consentTabBtns[1] && consentTabBtns[1].classList.add('active');
      document.querySelectorAll('.consent-tab-content').forEach(c => c.classList.remove('active'));
      document.getElementById('tabPrivacy').classList.add('active');
      consentModal.classList.add('active');
    });
  }

  // Escape key also closes consent modal (after agreement)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && consentModal && consentModal.classList.contains('active')) {
      if (sessionStorage.getItem('dreamescape_consent') === 'agreed') {
        consentModal.classList.remove('active');
      }
    }
  });
  // Escape key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (videoModal && videoModal.classList.contains('active')) {
        videoModal.classList.remove('active');
        videoIframe.src = '';
      }
      if (enquiryModal && enquiryModal.classList.contains('active')) {
        enquiryModal.classList.remove('active');
      }
    }
  });
});


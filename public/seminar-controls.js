
  document.querySelectorAll('[data-seminar-deck]').forEach((root) => {
    if (root.dataset.controlsReady) return;
    root.dataset.controlsReady = 'true';

    const slides = Array.from(root.querySelectorAll('[data-slide]'));
    const current = root.querySelector('[data-current]');
    const progress = root.querySelector('[data-progress]');
    const prev = root.querySelector('[data-prev]');
    const next = root.querySelector('[data-next]');
    const fullscreen = root.querySelector('[data-fullscreen]');
    const lightbox = root.querySelector('[data-image-lightbox]');
    const lightboxImage = root.querySelector('[data-lightbox-image]');
    const lightboxCaption = root.querySelector('[data-lightbox-caption]');
    const params = new URLSearchParams(window.location.search);
    const requestedSlide = Number(params.get('slide'));
    const returnTo = params.get('returnTo');
    const shouldReturnOnExit = params.get('fullscreen') === '1' && Boolean(returnTo);
    let isReturning = false;
    let index = Number.isInteger(requestedSlide)
      ? Math.max(0, Math.min(slides.length - 1, requestedSlide - 1))
      : 0;
    const baseDeckWidth = 1920;
    const baseDeckHeight = 1080;

    root.querySelectorAll('.slide-visual img').forEach((image) => {
      image.tabIndex = 0;
      image.setAttribute('role', 'button');
      image.setAttribute('aria-label', `${image.alt || 'Figure'} 크게 보기`);
    });

    const render = () => {
      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle('is-active', slideIndex === index);
      });
      current.textContent = String(index + 1);
      progress.style.width = `${((index + 1) / slides.length) * 100}%`;
      prev.disabled = index === 0;
      next.disabled = index === slides.length - 1;
    };

    const go = (step) => {
      index = Math.max(0, Math.min(slides.length - 1, index + step));
      render();
    };

    const isLightboxOpen = () => lightbox && !lightbox.hidden;

    const openLightbox = (image) => {
      if (!lightbox || !lightboxImage || !lightboxCaption) return;
      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt || '';
      lightboxCaption.textContent = image.alt || '';
      lightbox.hidden = false;
      root.classList.add('has-lightbox');
    };

    const closeLightbox = () => {
      if (!lightbox || !lightboxImage) return;
      lightbox.hidden = true;
      lightboxImage.removeAttribute('src');
      root.classList.remove('has-lightbox');
    };

    prev.addEventListener('click', () => go(-1));
    next.addEventListener('click', () => go(1));
    const isDeckFullscreen = () => document.fullscreenElement === root || root.classList.contains('is-fullscreen');
    const updateDeckScale = () => {
      if (!isDeckFullscreen()) {
        root.style.removeProperty('--deck-scale');
        return;
      }
      const scale = Math.min(window.innerWidth / baseDeckWidth, window.innerHeight / baseDeckHeight);
      root.style.setProperty('--deck-scale', String(scale));
    };

    const setFullscreenState = (enabled) => {
      root.classList.toggle('is-fullscreen', enabled);
      fullscreen.setAttribute('aria-pressed', String(enabled));
      fullscreen.textContent = enabled ? 'Exit' : 'Fullscreen';
      updateDeckScale();
    };

    const returnFromSlideDeck = () => {
      if (!shouldReturnOnExit || isReturning) return;
      isReturning = true;
      window.location.href = returnTo;
    };

    fullscreen.addEventListener('click', async () => {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        return;
      }
      if (root.classList.contains('is-fullscreen')) {
        setFullscreenState(false);
        returnFromSlideDeck();
        return;
      }

      try {
        await root.requestFullscreen();
      } catch {
        setFullscreenState(true);
      }
      if (!document.fullscreenElement) {
        setFullscreenState(true);
      }
    });
    document.addEventListener('fullscreenchange', () => {
      const enabled = document.fullscreenElement === root;
      setFullscreenState(enabled);
      if (!enabled) returnFromSlideDeck();
    });
    window.addEventListener('resize', updateDeckScale);

    root.addEventListener('click', (event) => {
      const closeTarget = event.target.closest('[data-lightbox-close]');
      if (closeTarget) {
        closeLightbox();
        return;
      }

      const image = event.target.closest('.slide-visual img');
      if (image) openLightbox(image);
    });

    window.addEventListener('keydown', (event) => {
      if (!isDeckFullscreen() && !root.contains(document.activeElement)) return;
      if (isLightboxOpen()) {
        if (event.key === 'Escape') closeLightbox();
        return;
      }
      if (event.key === 'ArrowRight') go(1);
      if (event.key === 'ArrowLeft') go(-1);
      if (event.key.toLowerCase() === 'f') fullscreen.click();
    });

    root.addEventListener('keydown', (event) => {
      const image = event.target.closest?.('.slide-visual img');
      if (!image) return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox(image);
      }
    });

    if (params.get('fullscreen') === '1') {
      setFullscreenState(true);
    }
    render();
  });

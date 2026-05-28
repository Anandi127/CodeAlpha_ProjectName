/* ═══════════════════════════════════════════════════════════
   VelvetFrame Gallery — script.js
   Full interactivity: gallery, lightbox, particles, filters,
   bookmarks, slideshow, counters, reveal animations & more.
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ── 1. Gallery Data ──────────────────────────────────────
   Using high-quality Unsplash images with reliable direct URLs.
   ─────────────────────────────────────────────────────────── */
const GALLERY_DATA = [
  /* NATURE */
  { id:1,  category:'nature',       title:'Aurora Veil',          src:'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=700&q=80' },
  { id:2,  category:'nature',       title:'Misty Cascade',        src:'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=700&q=80' },
  { id:3,  category:'nature',       title:'Golden Meadow',        src:'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=700&q=80' },
  { id:4,  category:'nature',       title:'Lone Pine Summit',     src:'https://images.unsplash.com/photo-1505533321630-975218a5f66f?w=700&q=80' },
  { id:5,  category:'nature',       title:'Still Waters',         src:'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=700&q=80' },
  { id:6,  category:'nature',       title:'Desert Bloom',         src:'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=700&q=80' },
  { id:7,  category:'nature',       title:'Ocean Horizon',        src:'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=700&q=80' },
  { id:8,  category:'nature',       title:'Winter Pines',         src:'https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=700&q=80' },

  /* CARS */
  { id:9,  category:'cars',         title:'Scarlet Velocity',     src:'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=700&q=80' },
  { id:10, category:'cars',         title:'Chrome & Asphalt',     src:'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=700&q=80' },
  { id:11, category:'cars',         title:'Night Racer',          src:'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=700&q=80' },
  { id:12, category:'cars',         title:'Desert Sprint',        src:'https://images.unsplash.com/photo-1493238792000-8113da705763?w=700&q=80' },
  { id:13, category:'cars',         title:'Classic Curves',       src:'https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?w=700&q=80' },
  { id:14, category:'cars',         title:'Obsidian Machine',     src:'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=700&q=80' },
  { id:15, category:'cars',         title:'White Lightning',      src:'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=700&q=80' },
  { id:16, category:'cars',         title:'Golden Hour Drive',    src:'https://images.unsplash.com/photo-1558981852-426c349238f1?w=700&q=80' },

  /* ARCHITECTURE */
  { id:17, category:'architecture', title:'Geometric Ascent',     src:'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80' },
  { id:18, category:'architecture', title:'Glass Cathedral',      src:'https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?w=700&q=80' },
  { id:19, category:'architecture', title:'Spiral Crown',         src:'https://images.unsplash.com/photo-1507149833265-60c372daea22?w=700&q=80' },
  { id:20, category:'architecture', title:'Urban Canyon',         src:'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80' },
  { id:21, category:'architecture', title:'Marble Corridor',      src:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80' },
  { id:22, category:'architecture', title:'Brutalist Dream',      src:'https://images.unsplash.com/photo-1494256997604-768d1f608cac?w=700&q=80' },
  { id:23, category:'architecture', title:'Night Tower',          src:'https://images.unsplash.com/photo-1478860409698-8707f313ee8b?w=700&q=80' },
  { id:24, category:'architecture', title:'Historic Arches',      src:'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=700&q=80' },

  /* FASHION */
  { id:25, category:'fashion',      title:'Noir Silhouette',      src:'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=700&q=80' },
  { id:26, category:'fashion',      title:'Velvet Drape',         src:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80' },
  { id:27, category:'fashion',      title:'Golden Thread',        src:'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=700&q=80' },
  { id:28, category:'fashion',      title:'Crimson Gaze',         src:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&q=80' },
  { id:29, category:'fashion',      title:'Street Couture',       src:'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=700&q=80' },
  { id:30, category:'fashion',      title:'Studio Session',       src:'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700&q=80' },
  { id:31, category:'fashion',      title:'Avant-Garde',          src:'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=700&q=80' },
  { id:32, category:'fashion',      title:'Monochrome Edit',      src:'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700&q=80' },

  /* TRAVEL */
  { id:33, category:'travel',       title:'Santorini at Dusk',    src:'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=700&q=80' },
  { id:34, category:'travel',       title:'Kyoto Lanterns',       src:'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=700&q=80' },
  { id:35, category:'travel',       title:'Marrakech Spice',      src:'https://images.unsplash.com/photo-1508247967583-7d982ea01526?w=700&q=80' },
  { id:36, category:'travel',       title:'Patagonia Vista',      src:'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=700&q=80' },
  { id:37, category:'travel',       title:'Venice Reflections',   src:'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=700&q=80' },
  { id:38, category:'travel',       title:'Bali Rice Terraces',   src:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=700&q=80' },
  { id:39, category:'travel',       title:'Alpine Sunrise',       src:'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=700&q=80' },
  { id:40, category:'travel',       title:'Sahara Solitude',      src:'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=700&q=80' },
];

/* ── 2. State ─────────────────────────────────────────── */
let currentFilter    = 'all';
let currentSearch    = '';
let currentEffect    = 'none';
let currentLbIndex   = 0;
let filteredImages   = [...GALLERY_DATA];
let visibleCount     = 16;
let bookmarks        = new Set();
let slideshowTimer   = null;
let isSlideshowOn    = false;

/* ── 3. DOM references ─────────────────────────────────── */
const grid          = document.getElementById('galleryGrid');
const filterBar     = document.getElementById('filterBar');
const searchInput   = document.getElementById('searchInput');
const searchClear   = document.getElementById('searchClear');
const noResults     = document.getElementById('noResults');
const loadMoreBtn   = document.getElementById('loadMoreBtn');
const lightbox      = document.getElementById('lightbox');
const lbImage       = document.getElementById('lbImage');
const lbTitle       = document.getElementById('lbTitle');
const lbCategory    = document.getElementById('lbCategory');
const lbClose       = document.getElementById('lbClose');
const lbPrev        = document.getElementById('lbPrev');
const lbNext        = document.getElementById('lbNext');
const lbFav         = document.getElementById('lbFav');
const lbLoader      = document.querySelector('.lb-loader');
const lbThumbs      = document.getElementById('lbThumbnails');
const lbBackdrop    = document.getElementById('lightboxBackdrop');
const navbar        = document.getElementById('navbar');
const hamburger     = document.getElementById('hamburger');
const navLinks      = document.getElementById('navLinks');
const themeToggle   = document.getElementById('themeToggle');
const themeIcon     = document.getElementById('themeIcon');
const slideshowBtn  = document.getElementById('slideshowBtn');
const favTrigger    = document.getElementById('favTrigger');
const favPanel      = document.getElementById('favPanel');
const favClose      = document.getElementById('favClose');
const favGrid       = document.getElementById('favGrid');
const favCount      = document.getElementById('favCount');

/* ── 4. Particle Background ─────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  const ctx    = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = -(Math.random() * 0.5 + 0.1);
      this.r  = Math.random() * 1.8 + 0.4;
      // Wine reds and golds
      const palette = ['201,168,76','139,30,63','109,26,54','200,160,70'];
      this.color = palette[Math.floor(Math.random()*palette.length)];
      this.alpha = Math.random() * 0.5 + 0.1;
      this.life  = 0;
      this.maxLife = Math.random() * 400 + 200;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life++;
      if (this.life > this.maxLife || this.y < -10) this.reset();
    }
    draw() {
      const prog = this.life / this.maxLife;
      const a    = this.alpha * (1 - prog * 0.7);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${a})`;
      ctx.fill();
    }
  }

  function initP() {
    particles = Array.from({ length: 90 }, () => new Particle());
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }

  resize();
  initP();
  loop();
  window.addEventListener('resize', () => { resize(); });
})();

/* ── 5. Navbar scroll & hamburger ─────────────────────── */
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

/* ── 6. Theme Toggle ─────────────────────────────────── */
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  const isLight = document.body.classList.contains('light-theme');
  themeIcon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
});

/* ── 7. Reveal-on-scroll animations ─────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

function observeRevealElements() {
  document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));
}

/* ── 8. Animated stat counters ─────────────────────── */
function animateCounter(el) {
  const target = +el.dataset.target;
  const duration = 1600;
  const start = performance.now();
  function step(now) {
    const p = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(ease * target);
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.stat-number').forEach(animateCounter);
      statsObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.stats-grid').forEach(el => statsObserver.observe(el));

/* ── 9. Build & render gallery ─────────────────────────── */
function getFiltered() {
  return GALLERY_DATA.filter(img => {
    const matchCat    = currentFilter === 'all' || img.category === currentFilter;
    const matchSearch = img.title.toLowerCase().includes(currentSearch.toLowerCase())
                     || img.category.toLowerCase().includes(currentSearch.toLowerCase());
    return matchCat && matchSearch;
  });
}

function buildSkeletons(count = 8) {
  const heights = [220, 280, 180, 320, 200, 260, 300, 240];
  let html = '';
  for (let i = 0; i < count; i++) {
    const h = heights[i % heights.length];
    html += `<div class="skeleton-card"><div class="skeleton-img" style="height:${h}px"></div></div>`;
  }
  return html;
}

function renderGallery(animate = false) {
  filteredImages = getFiltered();
  const slice    = filteredImages.slice(0, visibleCount);

  noResults.classList.toggle('hidden', filteredImages.length > 0);
  loadMoreBtn.parentElement.classList.toggle('hidden', visibleCount >= filteredImages.length);

  if (animate) {
    /* Show skeletons briefly for loading effect */
    grid.innerHTML = buildSkeletons(Math.min(slice.length || 8, 8));
    setTimeout(() => { populateCards(slice); }, 520);
  } else {
    populateCards(slice);
  }
}

function populateCards(slice) {
  const effectClass = currentEffect !== 'none' ? `effect-${currentEffect}` : '';

  grid.innerHTML = slice.map((img, i) => `
    <div
      class="gallery-card ${effectClass}"
      data-id="${img.id}"
      data-index="${i}"
      style="animation-delay:${(i % 12) * 0.055}s"
      role="button"
      tabindex="0"
      aria-label="${img.title} — ${img.category}"
    >
      <div class="card-img-wrap">
        <img
          src="${img.src}"
          alt="${img.title}"
          loading="lazy"
        />
      </div>
      <div class="card-overlay">
        <p class="card-title">${img.title}</p>
        <span class="card-tag">${img.category}</span>
      </div>
      <div class="card-actions">
        <button class="card-action-btn expand-btn" data-id="${img.id}" title="View fullscreen">
          <i class="fas fa-expand"></i>
        </button>
        <button class="card-action-btn bookmark-btn ${bookmarks.has(img.id) ? 'bookmarked' : ''}" data-id="${img.id}" title="Bookmark">
          <i class="fas fa-bookmark"></i>
        </button>
      </div>
    </div>
  `).join('');

  /* Attach card events */
  grid.querySelectorAll('.gallery-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('.card-action-btn')) return;
      const id = +card.dataset.id;
      openLightbox(id);
    });
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const id = +card.dataset.id;
        openLightbox(id);
      }
    });
  });

  grid.querySelectorAll('.expand-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openLightbox(+btn.dataset.id);
    });
  });

  grid.querySelectorAll('.bookmark-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      toggleBookmark(+btn.dataset.id, btn);
    });
  });
}

/* ── 10. Filter buttons ─────────────────────────────── */
filterBar.addEventListener('click', e => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentFilter = btn.dataset.filter;
  visibleCount  = 16;
  renderGallery(true);
});

/* ── 11. Effect buttons ─────────────────────────────── */
document.querySelectorAll('.effect-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.effect-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentEffect = btn.dataset.effect;
    /* Apply / remove effect classes on all cards */
    grid.querySelectorAll('.gallery-card').forEach(card => {
      card.className = card.className.replace(/effect-\w+/g, '').trim();
      if (currentEffect !== 'none') card.classList.add(`effect-${currentEffect}`);
    });
  });
});

/* ── 12. Search ─────────────────────────────────────── */
searchInput.addEventListener('input', () => {
  currentSearch = searchInput.value;
  searchClear.classList.toggle('visible', currentSearch.length > 0);
  visibleCount = 16;
  renderGallery(true);
});

searchClear.addEventListener('click', () => {
  searchInput.value = '';
  currentSearch = '';
  searchClear.classList.remove('visible');
  visibleCount = 16;
  renderGallery(true);
});

/* ── 13. Load More ──────────────────────────────────── */
loadMoreBtn.addEventListener('click', () => {
  visibleCount += 8;
  renderGallery();
});

/* ── 14. Lightbox ───────────────────────────────────── */
function openLightbox(id) {
  const idx = filteredImages.findIndex(img => img.id === id);
  if (idx === -1) return;
  currentLbIndex = idx;
  showLbImage(idx);
  buildLbThumbnails();
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function showLbImage(idx) {
  const img = filteredImages[idx];
  if (!img) return;

  lbLoader.classList.add('loading');
  lbImage.style.opacity = '0';

  const tempImg = new Image();
  tempImg.onload = () => {
    lbImage.src = img.src;
    lbImage.alt = img.title;
    lbImage.style.opacity = '1';
    lbLoader.classList.remove('loading');
  };
  tempImg.onerror = () => {
    lbImage.src = img.src;
    lbLoader.classList.remove('loading');
    lbImage.style.opacity = '1';
  };
  tempImg.src = img.src;

  lbTitle.textContent    = img.title;
  lbCategory.textContent = img.category.toUpperCase();
  lbFav.classList.toggle('active', bookmarks.has(img.id));

  /* Update thumbnail highlight */
  lbThumbs.querySelectorAll('.lb-thumb').forEach((t, i) => {
    t.classList.toggle('active', i === idx);
  });
  /* Scroll thumbnail into view */
  const activeThumb = lbThumbs.querySelectorAll('.lb-thumb')[idx];
  if (activeThumb) activeThumb.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' });
}

function buildLbThumbnails() {
  lbThumbs.innerHTML = filteredImages.map((img, i) => `
    <img
      class="lb-thumb ${i === currentLbIndex ? 'active' : ''}"
      src="${img.src}"
      alt="${img.title}"
      data-index="${i}"
      loading="lazy"
    />
  `).join('');

  lbThumbs.querySelectorAll('.lb-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      currentLbIndex = +thumb.dataset.index;
      showLbImage(currentLbIndex);
    });
  });
}

lbClose.addEventListener('click', closeLightbox);
lbBackdrop.addEventListener('click', closeLightbox);

lbPrev.addEventListener('click', () => {
  currentLbIndex = (currentLbIndex - 1 + filteredImages.length) % filteredImages.length;
  showLbImage(currentLbIndex);
});

lbNext.addEventListener('click', () => {
  currentLbIndex = (currentLbIndex + 1) % filteredImages.length;
  showLbImage(currentLbIndex);
});

lbFav.addEventListener('click', () => {
  const id = filteredImages[currentLbIndex]?.id;
  if (id == null) return;
  toggleBookmark(id);
  lbFav.classList.toggle('active', bookmarks.has(id));
});

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  lbPrev.click();
  if (e.key === 'ArrowRight') lbNext.click();
});

/* Swipe support on lightbox */
let touchStartX = 0;
lightbox.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
lightbox.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) {
    if (dx < 0) lbNext.click();
    else         lbPrev.click();
  }
});

/* ── 15. Bookmarks ──────────────────────────────────── */
function toggleBookmark(id, btnEl) {
  if (bookmarks.has(id)) {
    bookmarks.delete(id);
  } else {
    bookmarks.add(id);
  }

  /* Update all bookmark buttons for this id */
  document.querySelectorAll(`.bookmark-btn[data-id="${id}"]`).forEach(b => {
    b.classList.toggle('bookmarked', bookmarks.has(id));
  });

  updateFavPanel();
  updateFavCount();
}

function updateFavCount() {
  favCount.textContent = bookmarks.size;
  favCount.style.display = bookmarks.size > 0 ? 'flex' : 'none';
}

function updateFavPanel() {
  if (bookmarks.size === 0) {
    favGrid.innerHTML = `<p class="fav-empty">No bookmarks yet.<br/>Tap <i class="fas fa-bookmark"></i> to save.</p>`;
    return;
  }
  favGrid.innerHTML = [...bookmarks].map(id => {
    const img = GALLERY_DATA.find(x => x.id === id);
    if (!img) return '';
    return `
      <div class="fav-item" data-id="${img.id}" title="${img.title}">
        <img src="${img.src}" alt="${img.title}" loading="lazy" />
      </div>
    `;
  }).join('');

  favGrid.querySelectorAll('.fav-item').forEach(item => {
    item.addEventListener('click', () => {
      favPanel.classList.remove('open');
      const id = +item.dataset.id;
      /* Switch filter to all if needed */
      currentFilter = 'all';
      filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      filterBar.querySelector('[data-filter="all"]').classList.add('active');
      renderGallery(false);
      setTimeout(() => openLightbox(id), 300);
    });
  });
}

favTrigger.addEventListener('click', () => {
  favPanel.classList.toggle('open');
});
favClose.addEventListener('click', () => {
  favPanel.classList.remove('open');
});
document.addEventListener('click', e => {
  if (!favPanel.contains(e.target) && !favTrigger.contains(e.target)) {
    favPanel.classList.remove('open');
  }
});

/* ── 16. Auto Slideshow ─────────────────────────────── */
slideshowBtn.addEventListener('click', () => {
  isSlideshowOn = !isSlideshowOn;
  slideshowBtn.classList.toggle('active', isSlideshowOn);
  slideshowBtn.innerHTML = isSlideshowOn
    ? '<i class="fas fa-stop"></i>'
    : '<i class="fas fa-play"></i>';

  if (isSlideshowOn) {
    /* Open lightbox if not already open */
    if (!lightbox.classList.contains('open')) {
      currentLbIndex = 0;
      showLbImage(0);
      buildLbThumbnails();
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    slideshowTimer = setInterval(() => {
      currentLbIndex = (currentLbIndex + 1) % filteredImages.length;
      showLbImage(currentLbIndex);
    }, 3500);
  } else {
    clearInterval(slideshowTimer);
  }
});

/* Stop slideshow when lightbox closes */
const origClose = closeLightbox;
window._closeLightbox = () => {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (isSlideshowOn) {
    isSlideshowOn = false;
    clearInterval(slideshowTimer);
    slideshowBtn.classList.remove('active');
    slideshowBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
};
lbClose.removeEventListener('click', closeLightbox);
lbBackdrop.removeEventListener('click', closeLightbox);
lbClose.addEventListener('click', window._closeLightbox);
lbBackdrop.addEventListener('click', window._closeLightbox);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && lightbox.classList.contains('open')) {
    window._closeLightbox();
  }
});

/* ── 17. Smooth anchor scroll ───────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
    }
  });
});

/* ── 18. Custom cursor tracking ─────────────────────── */
document.addEventListener('mousemove', e => {
  document.documentElement.style.setProperty('--cx', e.clientX + 'px');
  document.documentElement.style.setProperty('--cy', e.clientY + 'px');
});

/* ── 19. Newsletter form ─────────────────────────────── */
document.querySelector('.newsletter-form button')?.addEventListener('click', () => {
  const input = document.querySelector('.newsletter-form input');
  if (input && input.value.includes('@')) {
    input.value = '✓ Subscribed! Thank you.';
    input.disabled = true;
    input.style.color = 'var(--gold)';
  }
});

/* ── 20. Boot ────────────────────────────────────────── */
(function boot() {
  updateFavCount();

  /* Render skeletons first, then gallery */
  grid.innerHTML = buildSkeletons(8);
  setTimeout(() => {
    renderGallery();
    observeRevealElements();
  }, 700);
})();

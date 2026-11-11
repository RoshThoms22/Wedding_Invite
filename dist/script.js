/* EDIT EVERYTHING HERE: names, date, venue, links, photos, and music file. */
const INVITATION = {
  firstName: "Rosh",
  secondName: "Jeni",
  fullNames: "Rosh Thomas Kurian & Jeni Anna Lalu",
  groomFullName: "Rosh Thomas Kurian",
  brideFullName: "Jeni Anna Lalu",
  groomFamily: "Together with his beloved family",
  brideFamily: "Together with her beloved family",
  // Add your legally obtained audio file at this exact path to enable playback.
  music: "assets/alex-morgan-wedding-instrumental-vow-exchange-578502.mp3",
  weddingDate: "2027-01-02T16:00:00+05:30",
  message: "With the blessings of God and our beloved families, we invite you to witness the beginning of our forever. Your presence will make our celebration complete and our memories all the more precious.",
  venueName: "St. Thomas Mar Thoma Church",
  venuePlace: "Kozhencherry · Pathanamthitta<br>Kerala, India",
  locationLink: "https://www.bing.com/ck/a?!&&p=be078c77e1f53ebc5c0c2a167911a4bcae2f93904503240e7642abc2f43c233cJmltdHM9MTc5NDI2ODgwMA&ptn=3&ver=2&hsh=4&fclid=21d2fa7b-0ac4-64a7-2b4a-ecc10b856551&u=a1aHR0cHM6Ly93d3cuYmluZy5jb20vYWxpbmsvbGluaz91cmw9aHR0cCUzYSUyZiUyZnd3dy5rb3poZW5jaGVycnltdGMub3JnJTJmJnNvdXJjZT1zZXJwLWxvY2FsJmg9SEtpRzBZUVQ2ejhZS0ElMmY4bTZsYzM3b1NOZzRjNlNtSzJrWGlTWnhDTjBBJTNkJnA9bHdfbWFnc21sdCZpZz04NkY5MkU0NENGNEE0QkQzODgwMjY1Q0VDQ0EzQjQ0MyZ5cGlkPVlONThFOTVDNjNERTM5MzFGMg",
  // Add the couple's WhatsApp number with country code, digits only, to receive RSVPs directly.
  whatsappNumber: "",
  photos: {
    coverPhoto: "assets/cover.jpg",
    heroPhoto: "assets/hero.jpg",
    portraitOne: "assets/portrait-1.jpg",
    portraitTwo: "assets/portrait-2.jpg",
    galleryOne: "assets/gallery-1.jpg",
    galleryTwo: "assets/gallery-2.jpg",
    galleryThree: "assets/gallery-3.jpg",
    galleryFour: "assets/gallery-4.jpg",
    galleryFive: "assets/gallery-5.jpg",
    gallerySix: "assets/gallery-6.jpg",
    gallerySeven: "assets/gallery-7.jpg",
    galleryEight: "assets/gallery-8.jpg",
    galleryNine: "assets/gallery-9.jpg",
    venuePhoto: "assets/venue.jpg"
  }
};

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

function applyContent() {
  $$('[data-bind]').forEach((element) => {
    const key = element.dataset.bind;
    if (INVITATION[key] != null) element.innerHTML = INVITATION[key];
  });
  $$('[data-link]').forEach((element) => element.href = INVITATION[element.dataset.link]);
  $$('[data-photo]').forEach((element) => {
    const src = INVITATION.photos[element.dataset.photo];
    const probe = new Image();
    probe.onload = () => {
      element.style.backgroundImage = `url("${src}")`;
      element.dataset.source = src;
    };
    probe.onerror = () => {
      element.classList.add('is-placeholder');
      if (element.matches('.gallery-item')) {
        const captions = ['The beginning', 'A little magic', 'Always, you', 'To all our tomorrows', 'Side by side', 'Golden hours', 'Our favourite place', 'Written in the stars', 'Next stop: forever'];
        element.dataset.artCaption = captions[$$('.gallery-item').indexOf(element)];
        element.disabled = true;
        element.setAttribute('aria-label', 'Decorative artwork: ' + element.dataset.artCaption);
      }
      if (element.matches('[role="img"]')) element.setAttribute('aria-label', 'Decorative wedding artwork');
    };
    probe.src = src;
  });
}

const cover = $('#cover');
const story = $('#story');
const music = $('#backgroundMusic');
const soundToggle = $('#soundToggle');
const scrollProgress = $('#scrollProgress');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (INVITATION.music) {
  music.src = INVITATION.music;
  soundToggle.hidden = false;
  $('.sound-note').textContent = 'Best experienced with sound';
}
music.addEventListener('error', () => {
  soundToggle.hidden = true;
  $('.sound-note').textContent = 'Made to be remembered';
});

$('#openInvitation').addEventListener('click', () => {
  if (document.body.classList.contains('invitation-open')) return;
  story.classList.add('visible');
  story.setAttribute('aria-hidden', 'false');
  story.inert = false;
  cover.classList.add('opened');
  document.body.classList.add('invitation-open');
  document.body.classList.remove('locked');
  if (INVITATION.music) {
    music.volume = 0.45;
    music.play().then(() => {
      soundToggle.classList.remove('muted');
      soundToggle.setAttribute('aria-pressed', 'true');
      soundToggle.setAttribute('aria-label', 'Mute background music');
    }).catch(() => {
      soundToggle.classList.add('muted');
      soundToggle.setAttribute('aria-pressed', 'false');
      soundToggle.setAttribute('aria-label', 'Play background music');
    });
  }
  setTimeout(() => {
    $('#welcome').focus({ preventScroll: true });
    cover.inert = true;
    cover.setAttribute('aria-hidden', 'true');
  }, reducedMotion.matches ? 0 : 1400);
});

soundToggle.addEventListener('click', async () => {
  if (music.paused) {
    try { await music.play(); } catch (_) { return; }
    soundToggle.classList.remove('muted');
    soundToggle.setAttribute('aria-pressed', 'true');
    soundToggle.setAttribute('aria-label', 'Mute background music');
  } else {
    music.pause();
    soundToggle.classList.add('muted');
    soundToggle.setAttribute('aria-pressed', 'false');
    soundToggle.setAttribute('aria-label', 'Play background music');
  }
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14, rootMargin: '0px 0px -5% 0px' });
$$('.reveal').forEach((element) => revealObserver.observe(element));

// A restrained cinematic depth effect and reading-progress hairline.
let scrollFrame;
function updateScrollDetails() {
  scrollFrame = null;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
  if (scrollProgress) scrollProgress.style.transform = `scaleX(${progress})`;
  window.InvitationFlow?.update();
}
window.addEventListener('scroll', () => {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollDetails);
}, { passive: true });
updateScrollDetails();

$$('.gallery-grid .reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 90, 270)}ms`;
});

function updateCountdown() {
  const distance = new Date(INVITATION.weddingDate).getTime() - Date.now();
  const safe = Math.max(0, distance);
  const values = {
    days: Math.floor(safe / 86400000),
    hours: Math.floor((safe % 86400000) / 3600000),
    minutes: Math.floor((safe % 3600000) / 60000),
    seconds: Math.floor((safe % 60000) / 1000)
  };
  Object.entries(values).forEach(([unit, value]) => {
    $(`[data-unit="${unit}"]`).textContent = String(value).padStart(unit === 'days' ? 3 : 2, '0');
  });
  if (distance <= 0) $('.countdown-note').textContent = 'Today, our forever begins.';
}
updateCountdown();
setInterval(updateCountdown, 1000);

let scratched = false;
const canvas = $('#scratchCanvas');
const card = $('#scratchCard');
const context = canvas.getContext('2d', { willReadFrequently: true });

function paintScratchCover() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.round(rect.width * ratio);
  canvas.height = Math.round(rect.height * ratio);
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  const gradient = context.createLinearGradient(0, 0, rect.width, rect.height);
  gradient.addColorStop(0, '#8c7446'); gradient.addColorStop(.45, '#d3b978'); gradient.addColorStop(1, '#7b6338');
  context.fillStyle = gradient; context.fillRect(0, 0, rect.width, rect.height);
  context.strokeStyle = 'rgba(255,245,213,.38)'; context.lineWidth = 1;
  context.strokeRect(14, 14, rect.width - 28, rect.height - 28);
  context.strokeStyle = 'rgba(255,245,213,.17)';
  for (let x = -rect.height; x < rect.width; x += 7) {
    context.beginPath(); context.moveTo(x, 0); context.lineTo(x + rect.height, rect.height); context.stroke();
  }
  context.fillStyle = '#20382d'; context.textAlign = 'center';
  context.font = `500 ${Math.max(13, rect.width * .038)}px Manrope`;
  context.letterSpacing = '3px'; context.fillText('SCRATCH TO REVEAL', rect.width / 2, rect.height / 2 - 5);
  context.font = `italic ${Math.max(22, rect.width * .075)}px "Cormorant Garamond"`;
  context.fillText('our day', rect.width / 2, rect.height / 2 + 31);
  context.globalCompositeOperation = 'destination-out';
}

function scratchAt(event) {
  const rect = canvas.getBoundingClientRect();
  const points = event.touches ? [...event.touches] : [event];
  points.forEach((point) => {
    context.beginPath(); context.arc(point.clientX - rect.left, point.clientY - rect.top, Math.max(20, rect.width * .065), 0, Math.PI * 2); context.fill();
  });
}

let drawing = false;
canvas.addEventListener('pointerdown', (event) => { drawing = true; canvas.setPointerCapture(event.pointerId); scratchAt(event); });
canvas.addEventListener('pointermove', (event) => { if (drawing) scratchAt(event); });
canvas.addEventListener('pointerup', () => { drawing = false; checkScratch(); });
canvas.addEventListener('pointercancel', () => { drawing = false; });
canvas.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); completeScratch(); }
});

function checkScratch() {
  if (scratched) return;
  const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
  let transparent = 0;
  for (let index = 3; index < pixels.length; index += 64) if (pixels[index] < 80) transparent++;
  if (transparent / (pixels.length / 64) > .32) completeScratch();
}

function completeScratch() {
  if (scratched) return;
  scratched = true;
  canvas.tabIndex = -1;
  canvas.setAttribute('aria-label', 'Wedding date revealed: 2 January 2027');
  $('#scratchFallback').hidden = true;
  card.style.touchAction = 'pan-y';
  canvas.style.transition = 'opacity .8s'; canvas.style.opacity = '0'; canvas.style.pointerEvents = 'none';
  $('#scratchHint').textContent = 'Our forever begins here';
  if (reducedMotion.matches) return;
  const layer = $('#petalLayer');
  for (let i = 0; i < 32; i++) {
    const petal = document.createElement('i'); petal.className = 'petal';
    petal.style.setProperty('--x', `${(Math.random() - .5) * 110}vw`);
    petal.style.setProperty('--y', `${(Math.random() - .62) * 75}vh`);
    petal.style.setProperty('--r', `${Math.random() * 620 - 310}deg`);
    petal.style.animationDelay = `${Math.random() * .28}s`; layer.appendChild(petal);
  }
  setTimeout(() => layer.replaceChildren(), 3200);
}

$('#scratchFallback').addEventListener('click', completeScratch);
paintScratchCover();
document.fonts.ready.then(() => { if (!scratched) paintScratchCover(); });
let resizeTimer;
window.addEventListener('resize', () => { if (scratched) return; clearTimeout(resizeTimer); resizeTimer = setTimeout(paintScratchCover, 150); });

const lightbox = $('#lightbox');
$$('.gallery-item').forEach((button) => button.addEventListener('click', () => {
  const src = button.dataset.source;
  if (!src) return;
  $('#lightboxImage').src = src;
  lightbox.showModal();
}));
$('#closeLightbox').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) lightbox.close(); });

applyContent();

/* Scroll-driven composition: one read/write pass per frame; no scroll interception. */
(() => {
  const root = document.documentElement;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const track = document.querySelector('.hero-track');
  const hero = document.querySelector('.hero');
  const bar = document.querySelector('.topbar');
  const sections = [...document.querySelectorAll('#story section')];
  const reveals = [...document.querySelectorAll('#story .reveal')]
    .filter(element => !element.closest('.hero'));
  const portraits = [...document.querySelectorAll('.portrait-photo')];
  const venue = document.querySelector('.families-section');
  const clamp = value => Math.min(1, Math.max(0, value));
  const smooth = value => value * value * (3 - 2 * value);
  let pending = false;
  let lightNavigation = false;
  const previousMotion = new WeakMap();

  function update() {
    // Read geometry first, before any style writes.
    const height = window.innerHeight;
    const trackRect = track.getBoundingClientRect();
    const heroHeight = hero.offsetHeight;
    const sectionRects = sections.map(element => ({element,rect:element.getBoundingClientRect()}));
    const revealRects = reveals.map(element => ({element,rect:element.getBoundingClientRect()}));
    const portraitRects = portraits.map(element => ({element,rect:element.parentElement.getBoundingClientRect()}));
    const venueRect = venue.getBoundingClientRect();
    const navSection = sectionRects.find(({rect}) => rect.top <= 70 && rect.bottom > 70);
    const onPaper = Boolean(navSection?.element.matches('.message-section,.portrait-story'));

    if (onPaper !== lightNavigation) {
      bar.classList.toggle('on-paper', onPaper);
      lightNavigation = onPaper;
    }
    if (motion.matches) return;

    const pinned = height > 650 && trackRect.height > heroHeight + 20;
    const scene = pinned ? smooth(clamp(-trackRect.top / Math.max(1, trackRect.height - height))) : 0;
    hero.style.setProperty('--scene-scale', (1 - scene * .065).toFixed(4));
    hero.style.setProperty('--scene-radius', `${scene * 40}px`);
    hero.style.setProperty('--scene-opacity', (1 - scene * .45).toFixed(4));
    hero.style.setProperty('--scene-title-y', `${-scene * 65}px`);
    hero.style.setProperty('--scene-photo-y', `${scene * 28}px`);
    hero.style.setProperty('--scene-photo-scale', (1.06 + scene * .055).toFixed(4));

    for (const {element,rect} of revealRects) {
      const previous = previousMotion.get(element) || {y:0,scale:1};
      const origin = element.matches('.gallery-item') ? .9 : element.matches('.venue-card') ? .7 : .5;
      const layoutTop = rect.top - previous.y - (1 - previous.scale) * (rect.height / previous.scale) * origin;
      // Reading content stays fully visible once it arrives; scrolling back reverses entry.
      const distance = Math.min(230, height * .3);
      const arrival = smooth(clamp((height * .96 - layoutTop) / distance));
      const photo = element.matches('.gallery-item,.portrait-card');
      const y = (1 - arrival) * (photo ? 42 : 25);
      const scale = Number((1 - (1 - arrival) * (photo ? .035 : .01)).toFixed(4));
      element.style.setProperty('--flow-opacity', arrival.toFixed(4));
      element.style.setProperty('--flow-y', `${y}px`);
      element.style.setProperty('--flow-scale', scale);
      previousMotion.set(element, {y,scale});
    }
    for (const {element,rect} of portraitRects) {
      const progress = clamp((height - rect.top) / (height + rect.height));
      element.style.setProperty('--portrait-drift', `${(progress - .5) * -22}px`);
    }
    const venueProgress = clamp((height - venueRect.top) / (height + venueRect.height));
    venue.style.setProperty('--venue-drift', `${(venueProgress - .5) * 50}px`);
  }

  function schedule() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => { pending = false; update(); });
  }
  reveals.forEach(element => element.classList.add('flow-reveal'));
  root.classList.add('flow-ready');
  window.InvitationFlow = { update };
  window.addEventListener('resize', schedule, {passive:true});
  window.addEventListener('pageshow', schedule);
  motion.addEventListener('change', schedule);
  new ResizeObserver(schedule).observe(document.querySelector('#story'));
  document.fonts.ready.then(schedule);
  schedule();
})();

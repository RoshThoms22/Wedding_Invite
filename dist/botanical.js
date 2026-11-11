(() => {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const field = document.querySelector('#botanicalPetals');
  const gallery = document.querySelector('.gallery-grid');
  const items = [...gallery.querySelectorAll('.gallery-item')];
  const counter = document.querySelector('#galleryCounter');
  let active = 0;

  if (!reducedMotion.matches) {
    for (let index = 0; index < 13; index++) {
      const petal = document.createElement('i');
      petal.className = 'floating-petal';
      petal.style.left = `${5 + ((index * 23) % 91)}%`;
      petal.style.setProperty('--petal-size', `${6 + (index % 5) * 2}px`);
      petal.style.setProperty('--petal-speed', `${13 + (index % 6) * 2.1}s`);
      petal.style.setProperty('--petal-delay', `${-index * 1.7}s`);
      petal.style.setProperty('--petal-drift', `${index % 2 ? -55 : 48}px`);
      petal.style.setProperty('--petal-turn', `${index % 2 ? -470 : 520}deg`);
      field.appendChild(petal);
    }
  }

  function renderGallery() {
    items.forEach((item, index) => {
      item.classList.remove('stack-active', 'stack-next', 'stack-next-2');
      const distance = (index - active + items.length) % items.length;
      if (distance === 0) item.classList.add('stack-active');
      else if (distance === 1) item.classList.add('stack-next');
      else if (distance === 2) item.classList.add('stack-next-2');
      item.tabIndex = distance === 0 && !item.disabled ? 0 : -1;
      item.setAttribute('aria-hidden', distance > 2 ? 'true' : 'false');
    });
    counter.textContent = `${active + 1} / ${items.length}`;
  }
  const move = direction => { active = (active + direction + items.length) % items.length; renderGallery(); };
  document.querySelector('#galleryPrevious').addEventListener('click', () => move(-1));
  document.querySelector('#galleryNext').addEventListener('click', () => move(1));
  let startX = 0;
  gallery.addEventListener('pointerdown', event => { startX = event.clientX; });
  gallery.addEventListener('pointerup', event => {
    const distance = event.clientX - startX;
    if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1);
  });
  renderGallery();
})();

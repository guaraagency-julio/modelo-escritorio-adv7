const menu=document.querySelector('.menu'),nav=document.querySelector('#links');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));document.querySelector('form')?.addEventListener('submit',e=>{e.preventDefault();document.querySelector('#result').textContent='Simulação concluída. Nenhuma informação foi enviada.';e.target.reset()});

const slides = [...document.querySelectorAll('[data-slide]')];
if (slides.length > 1) {
  const banner = document.querySelector('.banner');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0;
  let timer;
  const show = next => {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, position) => {
      const active = position === index;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
      slide.inert = !active;
    });
    document.querySelector('[data-slide-count]').textContent = `${index + 1} de ${slides.length}`;
  };
  const stop = () => clearInterval(timer);
  const start = () => { stop(); if (!reducedMotion.matches && !document.hidden) timer = setInterval(() => show(index + 1), 7000); };
  document.querySelector('.banner-prev').addEventListener('click', () => { show(index - 1); start(); });
  document.querySelector('.banner-next').addEventListener('click', () => { show(index + 1); start(); });
  banner.addEventListener('mouseenter', stop);
  banner.addEventListener('mouseleave', start);
  banner.addEventListener('focusin', stop);
  banner.addEventListener('focusout', event => { if (!banner.contains(event.relatedTarget)) start(); });
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
  reducedMotion.addEventListener('change', start);
  start();
}

/* Black Friday landing page: phase switch (pre-sale / live) + countdown. */
(function () {
  var root = document.documentElement;
  var hero = document.querySelector('[data-bf-hero]');
  if (!hero) return;

  var start = Date.parse(hero.dataset.start);
  var end = Date.parse(hero.dataset.end);
  var tiles = {
    d: hero.querySelector('[data-bf-days]'),
    h: hero.querySelector('[data-bf-hours]'),
    m: hero.querySelector('[data-bf-minutes]'),
    s: hero.querySelector('[data-bf-seconds]')
  };
  var countdown = hero.querySelector('[data-bf-countdown]');
  var done = hero.querySelector('[data-bf-done]');
  var pad = function (n) { return n < 10 ? '0' + n : String(n); };

  function tick() {
    var now = Date.now();
    var phase = now < start ? 'pre' : 'live';
    root.setAttribute('data-bf-phase', phase);

    var target = phase === 'pre' && hero.dataset.countdownTo !== 'end' ? start : end;
    var diff = target - now;
    if (diff <= 0) {
      countdown.hidden = true;
      done.hidden = false;
      return false;
    }
    tiles.d.textContent = pad(Math.floor(diff / 864e5));
    tiles.h.textContent = pad(Math.floor(diff / 36e5) % 24);
    tiles.m.textContent = pad(Math.floor(diff / 6e4) % 60);
    tiles.s.textContent = pad(Math.floor(diff / 1e3) % 60);
    return true;
  }

  if (tick()) {
    var timer = setInterval(function () { if (!tick()) clearInterval(timer); }, 1000);
  }

  // "#bf-shop" links scroll to the full product grid.
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href="#bf-shop"]');
    if (!link) return;
    var target = document.getElementById('bf-shop') || document.querySelector('[id*="__main"]');
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
})();

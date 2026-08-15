(function() {
  "use strict";

  // ===== AOS INIT =====
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, once: true, offset: 30 });
  }

  // ===== LOADING SCREEN =====
  window.addEventListener('load', function() {
    setTimeout(function() {
      var loader = document.getElementById('customLoadingScreen');
      if (loader) loader.classList.add('loader-hidden');
    }, 800);
  });

  // ===== BALLOON CURSOR =====
  var balloon = document.getElementById('balloonCursor');
  var timer;

  if (balloon) {
    document.addEventListener('mousemove', function(e) {
      balloon.style.left = e.clientX + 'px';
      balloon.style.top = e.clientY + 'px';
      balloon.classList.remove('burst');
      clearTimeout(timer);
      timer = setTimeout(function() {
        balloon.classList.add('burst');
      }, 200);
    });
  }

  // ===== THEME TOGGLE =====
  var themeBtn = document.getElementById('themeToggleBtn');
  var themeIcon = document.getElementById('themeIcon');
  var themeText = document.getElementById('themeText');

  function setTheme(isGreen) {
    if (isGreen) {
      document.body.classList.add('green-theme');
      if (themeIcon) themeIcon.className = 'fas fa-sun';
      if (themeText) themeText.textContent = '';
      localStorage.setItem('rutiesTheme', 'green');
    } else {
      document.body.classList.remove('green-theme');
      if (themeIcon) themeIcon.className = 'fas fa-leaf';
      if (themeText) themeText.textContent = '';
      localStorage.setItem('rutiesTheme', 'default');
    }
  }

  var savedTheme = localStorage.getItem('rutiesTheme');
  setTheme(savedTheme === 'green');

  if (themeBtn) {
    themeBtn.addEventListener('click', function() {
      var isGreen = document.body.classList.contains('green-theme');
      setTheme(!isGreen);
    });
  }

  // ===== NAVIGATION LINKS (clean URLs) =====
  var navHome = document.getElementById('navHome');
  var navRetail = document.getElementById('navRetail');
  var navCorporate = document.getElementById('navCorporate');
  var navGallery = document.getElementById('navGallery');
  var navContact = document.getElementById('navContact');

  if (navHome) {
    navHome.addEventListener('click', function() {
      window.location.href = '/';
    });
  }

  if (navRetail) {
    navRetail.addEventListener('click', function() {
      window.location.href = '/retail';
    });
  }

  if (navCorporate) {
    navCorporate.addEventListener('click', function() {
      window.location.href = '/corporate';
    });
  }

  if (navGallery) {
    navGallery.addEventListener('click', function() {
      window.location.href = '/gallery';
    });
  }

  if (navContact) {
    navContact.addEventListener('click', function() {
      window.location.href = '/contact';
    });
  }

  // ===== IMAGE FALLBACK =====
  var founderImg = document.querySelector('.founder-image-area img');
  if (founderImg) {
    founderImg.addEventListener('error', function() {
      founderImg.src = 'https://placehold.co/400x533/21561f/white?text=Rutie%27s+Founder';
    });
  }

})();
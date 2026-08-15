(function() {
  "use strict";

  // ===== AOS INIT =====
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, once: true, offset: 50 });
  }

  // ===== LOADING SCREEN =====
  window.addEventListener('load', function() {
    setTimeout(function() {
      var loader = document.getElementById('loadingScreen');
      if (loader) loader.classList.add('loader-hidden');
    }, 4000);
  });

  // ===== BALLOON CURSOR =====
  var balloon = document.getElementById('balloonCursor');
  var burstTimer;

  if (balloon) {
    document.addEventListener('mousemove', function(e) {
      balloon.style.left = e.clientX + 'px';
      balloon.style.top = e.clientY + 'px';
      balloon.classList.remove('burst');
      clearTimeout(burstTimer);
      burstTimer = setTimeout(function() {
        balloon.classList.add('burst');
      }, 200);
    });
  }

  // ===== THEME TOGGLE =====
  var themeBtn = document.getElementById('themeToggleBtn');
  var themeSymbol = themeBtn ? themeBtn.querySelector('.theme-symbol') : null;

  if (themeBtn && themeSymbol) {
    themeBtn.addEventListener('click', function() {
      document.body.classList.toggle('theme-mode');
      themeSymbol.textContent = document.body.classList.contains('theme-mode') ? '☀️' : '🌙';
    });
  }

  // ===== HEADER HIDE ON SCROLL =====
  var header = document.getElementById('mainHeader');
  var lastScroll = 0;

  if (header) {
    window.addEventListener('scroll', function() {
      var s = window.pageYOffset;
      if (s > 80 && s > lastScroll) {
        header.classList.add('header-hidden');
      } else {
        header.classList.remove('header-hidden');
      }
      lastScroll = s;
    });
  }

  // ===== HERO SLIDER =====
  var slides = document.querySelectorAll('.slide-bg');
  var currentSlide = 0;

  if (slides.length > 0) {
    slides[0].classList.add('active');
    setInterval(function() {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }, 4800);
  }

  // ===== GALLERY SLIDER =====
  var track = document.getElementById('sliderTrack');
  var imgNames = [];
  for (var i = 1; i <= 6; i++) {
    imgNames.push('rutiespartyshopimagebranding' + i + '.jpeg');
  }

  if (track) {
    for (var i = 0; i < 14; i++) {
      var img = document.createElement('img');
      var srcIdx = i % imgNames.length;
      img.src = '../rsc/' + imgNames[srcIdx];
      img.alt = 'custom branding work';
      img.onerror = function() {
        this.src = 'https://placehold.co/300x300/64285c/e1d7cb?text=Ruties+Art';
      };
      track.appendChild(img);
    }
  }

  // ===== AUTO SCROLL GALLERY =====
  var galleryContainer = document.getElementById('sliderGallery');
  var isAutoScrolling = true;
  var scrollInterval;

  function startAutoScroll() {
    if (scrollInterval) clearInterval(scrollInterval);
    scrollInterval = setInterval(function() {
      if (isAutoScrolling && galleryContainer) {
        var maxScroll = galleryContainer.scrollWidth - galleryContainer.clientWidth;
        if (maxScroll <= 0) return;
        var newScroll = galleryContainer.scrollLeft + 1.8;
        if (newScroll >= maxScroll) newScroll = 0;
        galleryContainer.scrollTo({ left: newScroll, behavior: 'smooth' });
      }
    }, 40);
  }

  function stopAutoScroll() {
    isAutoScrolling = false;
    if (scrollInterval) clearInterval(scrollInterval);
  }

  function resumeAutoScroll() {
    isAutoScrolling = true;
    startAutoScroll();
  }

  if (galleryContainer) {
    galleryContainer.addEventListener('mouseenter', stopAutoScroll);
    galleryContainer.addEventListener('mouseleave', resumeAutoScroll);
    galleryContainer.addEventListener('touchstart', stopAutoScroll);
    galleryContainer.addEventListener('touchend', function() {
      setTimeout(resumeAutoScroll, 2500);
    });
    startAutoScroll();
  }

  // ===== FOOTER TYPING WELCOME =====
  var welcomes = ["Welcome", "Wamukelekile", "Welkom", "Uyemukelwa", "Re a go amogela", "Tokugamuchirai", "Ngiyakwemukela", "Siyakwamukela"];
  var wi = 0, ci = 0, delFlag = false;
  var welEl = document.getElementById('typingWelcome');

  if (welEl) {
    welEl.style.minWidth = "180px";
    welEl.style.display = "inline-block";

    function typeWelFooter() {
      var cur = welcomes[wi];
      if (!delFlag) {
        if (ci <= cur.length) {
          welEl.textContent = cur.substring(0, ci);
          ci++;
          if (ci > cur.length) {
            delFlag = true;
          }
        }
      } else {
        if (ci >= 0) {
          welEl.textContent = cur.substring(0, ci);
          ci--;
          if (ci < 0) {
            delFlag = false;
            wi = (wi + 1) % welcomes.length;
          }
        }
      }
      setTimeout(typeWelFooter, delFlag ? 60 : 120);
    }
    typeWelFooter();
  }

  // ===== THANK YOU TYPING MESSAGE =====
  var thankDiv = document.getElementById('thankYouMsg');
  var thankMessages = [
    "🎉 Thank you for choosing Ruties 🎉",
    "✨ Your celebration, our obsession ✨",
    "💫 Let's create unforgettable moments 💫",
    "🥂 Quality & creativity 🥂"
  ];
  var thankIdx = 0, thankChar = 0, thankDel = false, thankIntervalId = null;

  function isDesktopTablet() {
    return window.innerWidth >= 768;
  }

  function runThankTyping() {
    if (thankIntervalId) clearTimeout(thankIntervalId);
    if (!isDesktopTablet()) {
      if (thankDiv) thankDiv.textContent = "🙏 Thank you for choosing Ruties 🙏";
      return;
    }
    var msg = thankMessages[thankIdx];

    function step() {
      if (thankDel) {
        if (thankChar > 0) {
          thankChar--;
          if (thankDiv) thankDiv.textContent = msg.substring(0, thankChar);
          thankIntervalId = setTimeout(step, 50);
        } else {
          thankDel = false;
          thankIdx = (thankIdx + 1) % thankMessages.length;
          msg = thankMessages[thankIdx];
          thankIntervalId = setTimeout(step, 300);
        }
      } else {
        if (thankChar < msg.length) {
          thankChar++;
          if (thankDiv) thankDiv.textContent = msg.substring(0, thankChar);
          thankIntervalId = setTimeout(step, 90);
        } else {
          thankDel = true;
          thankIntervalId = setTimeout(step, 2000);
        }
      }
    }
    step();
  }

  if (thankDiv) {
    runThankTyping();
    window.addEventListener('resize', function() {
      if (isDesktopTablet()) {
        if (!thankIntervalId || thankDiv.textContent.length < 5) runThankTyping();
      } else {
        if (thankIntervalId) clearTimeout(thankIntervalId);
        thankIntervalId = null;
        thankDiv.textContent = "🙏 Thank you for choosing Ruties 🙏";
      }
    });
  }

  // ===== SHOP NAME TYPING =====
  var nameEl = document.getElementById('typingShopName');
  var fullName = "Rutie's Corporate Services";
  var nameIdx = fullName.length, increasing = false;
  var nameTimer;

  if (nameEl) {
    nameEl.textContent = fullName;

    function animateShopName() {
      if (increasing) {
        if (nameIdx < fullName.length) {
          nameIdx++;
          nameEl.textContent = fullName.substring(0, nameIdx) + '\u00A0'.repeat(fullName.length - nameIdx);
          nameTimer = setTimeout(animateShopName, 130);
        } else {
          increasing = false;
          nameTimer = setTimeout(animateShopName, 2000);
        }
      } else {
        if (nameIdx > 0) {
          nameIdx--;
          nameEl.textContent = fullName.substring(0, nameIdx) + '\u00A0'.repeat(fullName.length - nameIdx);
          nameTimer = setTimeout(animateShopName, 70);
        } else {
          increasing = true;
          nameTimer = setTimeout(animateShopName, 400);
        }
      }
    }
    setTimeout(animateShopName, 800);
  }

  // ===== NAVIGATION (clean URLs) =====
  var homeNavBtn = document.getElementById('homeNavBtn');
  var galleryNavBtn = document.getElementById('galleryNavBtn');
  var contactMainBtn = document.getElementById('contactMainBtn');
  var aboutNavBtn = document.getElementById('aboutNavBtn');

  if (homeNavBtn) {
    homeNavBtn.addEventListener('click', function() {
      window.location.href = '/';
    });
  }

  if (galleryNavBtn) {
    galleryNavBtn.addEventListener('click', function() {
      window.location.href = '/gallery';
    });
  }

  if (contactMainBtn) {
    contactMainBtn.addEventListener('click', function() {
      window.location.href = '/contact';
    });
  }

  if (aboutNavBtn) {
    aboutNavBtn.addEventListener('click', function() {
      window.location.href = '/about';
    });
  }

  // ===== MOBILE DROPDOWN TOGGLE =====
  if (window.innerWidth <= 768) {
    document.querySelectorAll('.dropdown-party').forEach(function(d) {
      d.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
      });
    });
  }

})();
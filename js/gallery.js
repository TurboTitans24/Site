(function() {
  "use strict";

  // ===== AOS INIT =====
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, once: true, offset: 60 });
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

  // ===== HEADER AUTO HIDE =====
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

  // ===== POPULATE STORE GALLERY =====
  var storeWall = document.getElementById('storeGalleryWall');

  if (storeWall) {
    for (var i = 1; i <= 20; i++) {
      var card = document.createElement('div');
      card.className = 'polaroid-card';
      
      var img = document.createElement('img');
      img.src = '../rsc/rutiespartyshopimage' + i + '.jpeg';
      img.alt = 'Store magic ' + i;
      img.className = 'polaroid-img';
      img.onerror = function() {
        this.src = 'https://placehold.co/300x300/21561f/e1d7cb?text=Ruties+' + i;
      };
      
      var captionSpan = document.createElement('div');
      captionSpan.className = 'polaroid-caption';
      captionSpan.innerHTML = '<i class="fas fa-camera"></i> <i class="fas fa-heart" style="color:#e7a102;"></i>';
      
      card.appendChild(img);
      card.appendChild(captionSpan);
      card.addEventListener('click', function() {
        window.location.href = '/contact';
      });
      storeWall.appendChild(card);
    }
  }

  // ===== SUBLIMATION GALLERY =====
  var sublimationTrack = document.getElementById('sublimationTrack');
  var sublimationImages = [
    'rutiespartyshopimagebranding1.jpeg',
    'rutiespartyshopimagebranding2.jpeg',
    'rutiespartyshopimagebranding3.jpeg',
    'rutiespartyshopimagebranding4.jpeg',
    'rutiespartyshopimagebranding5.jpeg',
    'rutiespartyshopimagebranding6.jpeg',
    'logo.png',
    'rutiespartyshopimagebranding7.jpeg',
    'rutiespartyshopimagebranding8.jpeg',
    'rutiespartyshopimagebranding9.jpeg',
    'rutiespartyshopimagebranding10.jpeg',
    'rutiespartyshopimagebranding11.jpeg',
    'rutiespartyshopimagebranding12.jpeg'
  ];

  if (sublimationTrack) {
    for (var i = 0; i < 15; i++) {
      var src = sublimationImages[i % sublimationImages.length];
      var frame = document.createElement('div');
      frame.className = 'festive-frame';
      frame.innerHTML = 
        '<div class="frame-border">' +
          '<img class="sublimation-img" src="../rsc/' + src + '" alt="Sublimation art">' +
        '</div>' +
        '<div class="confetti-badge"><i class="fas fa-sparkles"></i></div>';
      
      var imgEl = frame.querySelector('.sublimation-img');
      imgEl.onerror = function() {
        this.src = 'https://placehold.co/350x330/e7a102/64285c?text=Rutie\'s';
      };
      frame.addEventListener('click', function() {
        window.location.href = '/corporate';
      });
      sublimationTrack.appendChild(frame);
    }
  }

  // ===== CUSTOM SCROLLBAR & AUTO-SCROLL FOR SUBLIMATION SECTION =====
  var scrollContainer = document.getElementById('sublimationScrollContainer');
  var autoScrollInterval;
  var isAutoScrolling = true;
  var pauseAutoScroll = false;

  function startAutoScroll() {
    if (autoScrollInterval) clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(function() {
      if (!isAutoScrolling || pauseAutoScroll || !scrollContainer) return;
      var maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      if (maxScrollLeft <= 0) return;
      var newLeft = scrollContainer.scrollLeft + 1.6;
      if (newLeft >= maxScrollLeft) newLeft = 0;
      scrollContainer.scrollTo({ left: newLeft, behavior: 'smooth' });
    }, 45);
  }

  function stopAutoScroll() {
    isAutoScrolling = false;
    if (autoScrollInterval) clearInterval(autoScrollInterval);
  }

  function resumeAutoScroll() {
    isAutoScrolling = true;
    startAutoScroll();
  }

  if (scrollContainer) {
    scrollContainer.addEventListener('mouseenter', function() {
      pauseAutoScroll = true;
      stopAutoScroll();
    });
    scrollContainer.addEventListener('mouseleave', function() {
      pauseAutoScroll = false;
      resumeAutoScroll();
    });
    scrollContainer.addEventListener('touchstart', function() {
      pauseAutoScroll = true;
      stopAutoScroll();
    });
    scrollContainer.addEventListener('touchend', function() {
      setTimeout(function() {
        if (!pauseAutoScroll) resumeAutoScroll();
      }, 2000);
    });
    startAutoScroll();
  }

  var leftBtn = document.getElementById('scrollLeftBtn');
  var rightBtn = document.getElementById('scrollRightBtn');

  if (leftBtn && scrollContainer) {
    leftBtn.addEventListener('click', function() {
      pauseAutoScroll = true;
      stopAutoScroll();
      scrollContainer.scrollBy({ left: -280, behavior: 'smooth' });
      setTimeout(function() {
        pauseAutoScroll = false;
        resumeAutoScroll();
      }, 800);
    });
  }

  if (rightBtn && scrollContainer) {
    rightBtn.addEventListener('click', function() {
      pauseAutoScroll = true;
      stopAutoScroll();
      scrollContainer.scrollBy({ left: 280, behavior: 'smooth' });
      setTimeout(function() {
        pauseAutoScroll = false;
        resumeAutoScroll();
      }, 800);
    });
  }

  // ===== THANK YOU TYPING DESKTOP / RESPONSIVE =====
  var thankDiv = document.getElementById('thankYouMsg');
  var thankMessages = [
    "🎉 Thanks for exploring our visual story 🎉",
    "✨ Every picture sparks a celebration ✨",
    "💫 Let's create your masterpiece 💫",
    "🥂 Your ideas + our artistry = wow 🥂"
  ];
  var thankIdx = 0, thankChar = 0, thankDel = false, thankIntervalId = null;

  function isDesktopTablet() {
    return window.innerWidth >= 768;
  }

  function runThankTyping() {
    if (thankIntervalId) clearTimeout(thankIntervalId);
    if (!isDesktopTablet()) {
      if (thankDiv) thankDiv.textContent = "🙏 Thank you for exploring our Gallery 🎈";
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
        if (!thankIntervalId) runThankTyping();
      } else {
        if (thankIntervalId) clearTimeout(thankIntervalId);
        thankIntervalId = null;
        thankDiv.textContent = "🎈 Thank you for exploring our Gallery 🎈";
      }
    });
  }

  // ===== HEADER NAME AUTO TYPING =====
  var nameEl = document.getElementById('typingShopName');
  var fullName = "Ruties Group";
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

  // ===== FOOTER WELCOME MULTILINGUAL =====
  var welcomes = ["Welcome", "Wamukelekile", "Welkom", "Uyemukelwa", "Re a go amogela", "Tokugamuchirai", "Ngiyakwemukela", "Siyakwamukela"];
  var wi = 0, ci = 0, delFlag = false;
  var welEl = document.getElementById('typingWelcome');

  if (welEl) {
    welEl.style.minWidth = '180px';
    welEl.style.display = 'inline-block';

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

  // ===== NAVIGATION (clean URLs) =====
  var homeNavBtn = document.getElementById('homeNavBtn');
  var retailNavBtn = document.getElementById('retailNavBtn');
  var corporateNavBtn = document.getElementById('corporateNavBtn');
  var contactMainBtn = document.getElementById('contactMainBtn');
  var aboutNavBtn = document.getElementById('aboutNavBtn');

  if (homeNavBtn) {
    homeNavBtn.addEventListener('click', function() {
      window.location.href = '/';
    });
  }

  if (retailNavBtn) {
    retailNavBtn.addEventListener('click', function() {
      window.location.href = '/retail';
    });
  }

  if (corporateNavBtn) {
    corporateNavBtn.addEventListener('click', function() {
      window.location.href = '/corporate';
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
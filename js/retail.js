(function() {
  "use strict";

  // ===== AOS INIT =====
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, once: true });
  }

  // ===== LOADING SCREEN =====
  window.addEventListener('load', function() {
    setTimeout(function() {
      var loader = document.getElementById('customLoadingScreen');
      if (loader) loader.classList.add('loader-hidden');
    }, 600);
  });

  // ===== THEME TOGGLE =====
  var themeBtn = document.getElementById('themeToggleBtn');
  var themeSymbol = themeBtn ? themeBtn.querySelector('.theme-symbol') : null;

  if (themeBtn && themeSymbol) {
    themeBtn.addEventListener('click', function() {
      document.getElementById('bodyRoot').classList.toggle('theme-mode');
      themeSymbol.textContent = document.getElementById('bodyRoot').classList.contains('theme-mode') ? '☀️' : '🌙';
    });
  }

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

  // ===== HEADER SCROLL BEHAVIOR =====
  var header = document.getElementById('mainHeader');
  var lastScroll = 0;

  if (header) {
    window.addEventListener('scroll', function() {
      var currentScroll = window.pageYOffset;
      if (currentScroll > 80 && currentScroll > lastScroll) {
        header.classList.add('header-hidden');
      } else {
        header.classList.remove('header-hidden');
      }
      lastScroll = currentScroll;
    });
  }

  // ===== MOBILE DROPDOWN HANDLING =====
  if (window.innerWidth <= 768) {
    document.querySelectorAll('.dropdown-party').forEach(function(dropdown) {
      dropdown.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
      });
    });

    document.addEventListener('click', function() {
      document.querySelectorAll('.dropdown-party.active').forEach(function(dropdown) {
        dropdown.classList.remove('active');
      });
    });
  }

  // ===== SHOP NAME TYPING =====
  var nameEl = document.getElementById('typingShopName');
  var fullName = "Ruties Party Shop";
  var nIdx = fullName.length, increasingName = false, namePause = false;
  var nameTimer;

  if (nameEl) {
    nameEl.textContent = fullName;

    function animateName() {
      if (namePause) {
        nameTimer = setTimeout(animateName, 100);
        return;
      }
      if (increasingName) {
        if (nIdx < fullName.length) {
          nIdx++;
          nameEl.textContent = fullName.substring(0, nIdx) + '\u00A0'.repeat(fullName.length - nIdx);
          nameTimer = setTimeout(animateName, 130);
        } else {
          increasingName = false;
          nameTimer = setTimeout(animateName, 2000);
        }
      } else {
        if (nIdx > 0) {
          nIdx--;
          nameEl.textContent = fullName.substring(0, nIdx) + '\u00A0'.repeat(fullName.length - nIdx);
          nameTimer = setTimeout(animateName, 70);
        } else {
          increasingName = true;
          nameTimer = setTimeout(animateName, 500);
        }
      }
    }

    setTimeout(animateName, 800);

    nameEl.addEventListener('mouseenter', function() {
      namePause = true;
    });
    nameEl.addEventListener('mouseleave', function() {
      namePause = false;
    });
  }

  // ===== FANCY TYPING TITLE =====
  var fancyEl = document.getElementById('fancyTypingTitle');
  var fancyMsgs = [
    "Where Every Moment Sparkles ✨",
    "Crafting Joy, One Party at a Time 🎉",
    "Your Dream Celebration Awaits 💫",
    "Making Memories in Full Color 🌈",
    "Ruties Party Shop • African inspired 🪄"
  ];
  var mIdx = 0, cIdx = 0, inc = true, fancyPause = false, fancyInt;

  if (fancyEl) {
    function typeFancy() {
      if (window.innerWidth < 769) {
        fancyEl.textContent = "Where Every Moment Sparkles ✨";
        return;
      }
      if (fancyPause) {
        fancyInt = setTimeout(typeFancy, 150);
        return;
      }
      var cur = fancyMsgs[mIdx];
      var longest = fancyMsgs.reduce(function(a, b) {
        return a.length > b.length ? a : b;
      });

      if (inc) {
        if (cIdx < cur.length) {
          fancyEl.textContent = cur.substring(0, cIdx + 1) + '\u00A0'.repeat(longest.length - cIdx - 1);
          cIdx++;
          fancyInt = setTimeout(typeFancy, 100);
        } else {
          inc = false;
          fancyInt = setTimeout(typeFancy, 2000);
        }
      } else {
        if (cIdx > 0) {
          cIdx--;
          fancyEl.textContent = cur.substring(0, cIdx) + '\u00A0'.repeat(longest.length - cIdx);
          fancyInt = setTimeout(typeFancy, 50);
        } else {
          inc = true;
          mIdx = (mIdx + 1) % fancyMsgs.length;
          fancyInt = setTimeout(typeFancy, 400);
        }
      }
    }

    if (window.innerWidth >= 769) {
      typeFancy();
    } else {
      fancyEl.textContent = "Where Every Moment Sparkles ✨";
    }

    fancyEl.addEventListener('mouseenter', function() {
      if (window.innerWidth >= 769) fancyPause = true;
    });
    fancyEl.addEventListener('mouseleave', function() {
      if (window.innerWidth >= 769) fancyPause = false;
    });
  }

  // ===== GALLERY WATERMARK ROTATION =====
  var galleryContainer = document.getElementById('shopGallery');
  var galleryImages = [];

  if (galleryContainer) {
    for (var i = 1; i <= 24; i++) {
      var item = document.createElement('div');
      item.className = 'gallery-item';
      
      var img = document.createElement('img');
      img.src = '../rsc/rutiespartyshopimage' + i + '.jpeg';
      img.alt = 'Ruties shop ' + i;
      img.onerror = function() {
        this.src = 'https://placehold.co/300x300/21561f/e1d7cb?text=Ruties+' + i;
      };
      
      var watermarkDiv = document.createElement('div');
      watermarkDiv.className = 'logo-watermark';
      var logoImg = document.createElement('img');
      logoImg.src = '../rsc/logo.png';
      logoImg.alt = 'logo';
      logoImg.onerror = function() {
        this.style.display = 'none';
      };
      watermarkDiv.appendChild(logoImg);
      
      item.appendChild(img);
      item.appendChild(watermarkDiv);
      galleryContainer.appendChild(item);
      galleryImages.push(item);
    }
  }

  var currentWatermarkIndex = 0;

  function rotateWatermark() {
    galleryImages.forEach(function(item) {
      item.classList.remove('active-watermark');
    });
    if (galleryImages.length > 0) {
      galleryImages[currentWatermarkIndex].classList.add('active-watermark');
      currentWatermarkIndex = (currentWatermarkIndex + 1) % galleryImages.length;
    }
  }

  rotateWatermark();
  setInterval(rotateWatermark, 5000);

  // ===== EVENTS GRID =====
  var eventsData = [
    { name: "Mother's Day", icon: "fas fa-female", desc: "Spoil mom with love & elegance", bg: "https://cdn.pixabay.com/photo/2018/04/20/08/53/ornament-3335425_1280.jpg" },
    { name: "Father's Day", icon: "fas fa-male", desc: "Celebrate dad's greatness", bg: "https://cdn.pixabay.com/photo/2024/05/06/15/31/ai-generated-8743552_1280.jpg" },
    { name: "Christmas", icon: "fas fa-tree", desc: "Festive wonderland decor", bg: "https://cdn.pixabay.com/photo/2017/09/01/05/50/xmas-2703168_1280.jpg" },
    { name: "New Year's Eve", icon: "fas fa-glass-cheers", desc: "Sparkling countdowns", bg: "https://cdn.pixabay.com/photo/2015/01/03/16/43/new-years-eve-587586_1280.png" },
    { name: "Heritage Day", icon: "fas fa-drumstick-bite", desc: "Celebrate SA's rich culture", bg: "https://cdn.pixabay.com/photo/2023/01/30/23/34/art-7756782_1280.png" },
    { name: "Valentine's Day", icon: "fas fa-heart", desc: "Romantic surprises & gifts", bg: "https://cdn.pixabay.com/photo/2022/07/25/11/40/bear-7343513_1280.png" },
    { name: "Easter", icon: "fas fa-egg", desc: "Egg hunts & pastel delights", bg: "https://cdn.pixabay.com/photo/2021/03/23/02/07/happy-easter-6116138_1280.jpg" },
    { name: "Freedom Day", icon: "fas fa-flag-checkered", desc: "Honor our nation's journey", bg: "https://cdn.pixabay.com/photo/2019/11/03/10/54/south-africa-4598360_1280.jpg" },
    { name: "Youth Day", icon: "fas fa-child", desc: "Empower & celebrate youth", bg: "https://cdn.pixabay.com/photo/2021/09/20/13/54/kids-6640947_1280.jpg" },
    { name: "Women's Day", icon: "fas fa-venus", desc: "Celebrate strong women", bg: "https://cdn.pixabay.com/photo/2025/02/19/07/38/womens-day-9417076_1280.jpg" },
    { name: "Day of Goodwill", icon: "fas fa-hands-helping", desc: "Spread joy & generosity", bg: "https://cdn.pixabay.com/photo/2022/09/08/18/27/saydung-holiday-7441659_1280.jpg" },
    { name: "Reconciliation Day", icon: "fas fa-handshake", desc: "Unity & togetherness", bg: "https://cdn.pixabay.com/photo/2024/04/18/00/26/earth-8703270_1280.png" }
  ];
  var eventsGrid = document.getElementById('eventsGrid');
  var currentSet = [0, 1, 2, 3];
  var eventInterval;

  function renderEventCards(indices) {
    if (!eventsGrid) return;
    eventsGrid.innerHTML = '';
    indices.forEach(function(idx) {
      var ev = eventsData[idx % eventsData.length];
      var card = document.createElement('div');
      card.className = 'event-card';
      card.style.opacity = '0';
      card.style.transition = 'opacity 0.6s ease';
      card.innerHTML = 
        '<div class="event-bg" style="background-image:url(\'' + ev.bg + '\');"></div>' +
        '<div class="event-overlay">' +
          '<i class="' + ev.icon + '"></i>' +
          '<h3>' + ev.name + '</h3>' +
          '<p>' + ev.desc + '</p>' +
        '</div>' +
        '<div class="event-tag"><i class="fas fa-gift"></i> Get a Quote</div>';
      card.addEventListener('click', function() {
        window.location.href = '/contact';
      });
      eventsGrid.appendChild(card);
      setTimeout(function() {
        card.style.opacity = '1';
      }, 50);
    });
  }

  function rotateEvents() {
    var nextSet = [];
    var lastVal = currentSet[3];
    for (var i = 0; i < 4; i++) {
      nextSet.push((lastVal + i + 1) % eventsData.length);
    }
    currentSet = nextSet;
    renderEventCards(currentSet);
  }

  renderEventCards(currentSet);
  eventInterval = setInterval(rotateEvents, 7000);

  // ===== FOOTER WELCOME TYPING =====
  var langs = ["Welcome", "Wamukelekile", "Welkom", "Uyemukelwa", "Re a go amogela", "Zvirisei", "Ngiyakwemukela", "Ndokwamukela", "Kuvhura", "Amogetswe"];
  var li = 0, ci = 0, del = false;
  var welEl = document.getElementById('typingWelcome');

  if (welEl) {
    function typeWel() {
      var w = langs[li];
      if (!del) {
        if (ci < w.length) {
          welEl.textContent = w.substring(0, ci + 1);
          ci++;
        } else {
          del = true;
          setTimeout(function() {}, 1200);
        }
      } else {
        if (ci > 0) {
          welEl.textContent = w.substring(0, ci - 1);
          ci--;
        } else {
          del = false;
          li = (li + 1) % langs.length;
        }
      }
      setTimeout(typeWel, del ? 60 : 130);
    }
    typeWel();
  }

  // ===== NAVIGATION (clean URLs) =====
  var homeNavBtn = document.getElementById('homeNavBtn');
  var galleryNavBtn = document.getElementById('galleryNavBtn');
  var contactMainBtn = document.getElementById('contactMainBtn');
  var aboutNavBtn = document.getElementById('aboutNavBtn');
  var contactUsBtn = document.getElementById('contactUsBtn');

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

  if (contactUsBtn) {
    contactUsBtn.addEventListener('click', function() {
      window.location.href = '/contact';
    });
  }

})();
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
    }, 500);
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

  // ===== AUTO TYPING HEADER (desktop only) =====
  (function() {
    var el = document.getElementById('autoTypeTitle');
    if (!el) return;
    var fullText = "Ruties Party Shop";
    var isMobile = window.matchMedia("(max-width: 768px)").matches;
    
    if (isMobile) {
      el.textContent = fullText;
      return;
    }

    var i = 0;
    var isDeleting = false;
    var loopTimer;

    function typeLoop() {
      if (!isDeleting) {
        if (i < fullText.length) {
          el.textContent = fullText.substring(0, i + 1);
          i++;
          loopTimer = setTimeout(typeLoop, 120);
        } else {
          isDeleting = true;
          loopTimer = setTimeout(typeLoop, 1800);
        }
      } else {
        if (i > 0) {
          el.textContent = fullText.substring(0, i - 1);
          i--;
          loopTimer = setTimeout(typeLoop, 60);
        } else {
          isDeleting = false;
          loopTimer = setTimeout(typeLoop, 400);
        }
      }
    }
    typeLoop();
  })();

  // ===== THEME TOGGLE =====
  var themeBtn = document.getElementById('themeToggleBtn');
  var themeSymbol = themeBtn ? themeBtn.querySelector('.theme-symbol') : null;

  if (themeBtn && themeSymbol) {
    themeBtn.addEventListener('click', function() {
      document.getElementById('bodyRoot').classList.toggle('theme-mode');
      themeSymbol.textContent = document.getElementById('bodyRoot').classList.contains('theme-mode') ? '☀️' : '🌙';
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

  // ===== NAVIGATION (clean URLs) =====
  var navHome = document.getElementById('navHome');
  var navGallery = document.getElementById('navGallery');
  var navAbout = document.getElementById('navAbout');

  if (navHome) {
    navHome.addEventListener('click', function() {
      window.location.href = '/';
    });
  }

  if (navGallery) {
    navGallery.addEventListener('click', function() {
      window.location.href = '/gallery';
    });
  }

  if (navAbout) {
    navAbout.addEventListener('click', function() {
      window.location.href = '/about';
    });
  }

  // ===== FLOATING ICONS FOR EACH CARD =====
  function createFloatingIcons(containerId, iconClass, count) {
    count = count || 6;
    var container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    for (var i = 0; i < count; i++) {
      var icon = document.createElement('i');
      icon.className = 'fas ' + iconClass + ' floating-icon';
      var left = Math.random() * 90;
      var top = Math.random() * 85;
      var delay = Math.random() * 3;
      var size = 1.2 + Math.random() * 1.5;
      icon.style.left = left + '%';
      icon.style.top = top + '%';
      icon.style.animationDelay = delay + 's';
      icon.style.fontSize = size + 'rem';
      container.appendChild(icon);
    }
  }

  createFloatingIcons('floatCall', 'fa-phone');
  createFloatingIcons('floatEmail', 'fa-envelope');
  createFloatingIcons('floatInstagram', 'fa-instagram');
  createFloatingIcons('floatWhatsApp', 'fa-whatsapp');

  // ===== CONTACT MODAL =====
  var modalOverlay = document.getElementById('modalOverlay');
  var modalTitle = document.getElementById('modalTitle');
  var modalDetail = document.getElementById('modalDetail');
  var modalActions = document.getElementById('modalActions');
  var modalCloseBtn = document.getElementById('modalCloseBtn');

  var contactData = {
    call: {
      title: '📞 Call Ruties',
      detail: '(071) 320-2405',
      actions: [
        { text: '📞 Call Now', class: 'fancy-btn', href: 'tel:+27713202405' },
        { text: '📋 Copy Number', class: 'fancy-btn secondary', onclick: 'copyToClipboard("+27713202405")' }
      ]
    },
    email: {
      title: '📧 Email Ruties',
      detail: 'info@rutiesgroup.co.za',
      actions: [
        { text: '✉️ Send Email', class: 'fancy-btn', href: 'mailto:info@rutiesgroup.co.za' },
        { text: '📋 Copy Email', class: 'fancy-btn secondary', onclick: 'copyToClipboard("info@rutiesgroup.co.za")' }
      ]
    },
    instagram: {
      title: '📸 Follow on Instagram',
      detail: '@rutiesgroup',
      actions: [
        { text: '📱 Open Instagram', class: 'fancy-btn', href: 'https://www.instagram.com/rutiesgroup?igsh=aHdxNHpucnZpMzJw&utm_source=qr', target: '_blank' },
        { text: '📋 Copy Handle', class: 'fancy-btn secondary', onclick: 'copyToClipboard("@rutiesgroup")' }
      ]
    },
    whatsapp: {
      title: '💬 WhatsApp Ruties',
      detail: '(071) 320-2405',
      actions: [
        { text: '💬 Open WhatsApp', class: 'fancy-btn', href: 'https://wa.me/27713202405', target: '_blank' },
        { text: '📋 Copy Number', class: 'fancy-btn secondary', onclick: 'copyToClipboard("27713202405")' }
      ]
    }
  };

  function openModal(type) {
    var data = contactData[type];
    if (!data) return;

    if (modalTitle) modalTitle.textContent = data.title;
    if (modalDetail) modalDetail.textContent = data.detail;

    if (modalActions) {
      modalActions.innerHTML = '';
      data.actions.forEach(function(action) {
        var btn = document.createElement(action.href ? 'a' : 'button');
        btn.className = action.class;
        btn.textContent = action.text;
        if (action.href) {
          btn.href = action.href;
          if (action.target) btn.target = action.target;
        }
        if (action.onclick) {
          btn.setAttribute('onclick', action.onclick);
        }
        modalActions.appendChild(btn);
      });
    }

    if (modalOverlay) {
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // ===== CONTACT CARD CLICKS =====
  document.querySelectorAll('.contact-card').forEach(function(card) {
    card.addEventListener('click', function() {
      var type = this.getAttribute('data-contact-type');
      openModal(type);
    });
  });

  // ===== MODAL CLOSE =====
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', function(e) {
      if (e.target === this) {
        closeModal();
      }
    });
  }

  // ===== ESC KEY TO CLOSE MODAL =====
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  // ===== COPY TO CLIPBOARD =====
  window.copyToClipboard = function(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(function() {
        alert('✅ Copied to clipboard!');
      }).catch(function() {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  };

  function fallbackCopy(text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      alert('✅ Copied to clipboard!');
    } catch (err) {
      alert('❌ Failed to copy. Please copy manually.');
    }
    document.body.removeChild(textarea);
  }

  // ===== GET DIRECTIONS =====
  var directionsBtn = document.getElementById('directionsBtn');
  if (directionsBtn) {
    directionsBtn.addEventListener('click', function() {
      var address = encodeURIComponent('Fourways Mall, 11 Ruby Cl, Witkoppen, Sandton, 2068');
      var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      if (isMobile) {
        window.location.href = 'https://maps.google.com/maps?daddr=' + address;
      } else {
        window.open('https://www.google.com/maps/dir/?api=1&destination=' + address, '_blank');
      }
    });
  }

  // ===== MAP CAROUSEL =====
  var mapSlides = document.querySelectorAll('#mapCarousel img');
  var currentMapSlide = 0;

  if (mapSlides.length > 0) {
    setInterval(function() {
      mapSlides[currentMapSlide].classList.remove('active');
      currentMapSlide = (currentMapSlide + 1) % mapSlides.length;
      mapSlides[currentMapSlide].classList.add('active');
    }, 4000);
  }

  // ===== FOOTER BACKGROUND CAROUSEL =====
  var footerSlides = document.querySelectorAll('#footerBgCarousel img');
  var currentFooterSlide = 0;

  if (footerSlides.length > 0) {
    setInterval(function() {
      footerSlides[currentFooterSlide].classList.remove('active');
      currentFooterSlide = (currentFooterSlide + 1) % footerSlides.length;
      footerSlides[currentFooterSlide].classList.add('active');
    }, 5000);
  }

})();
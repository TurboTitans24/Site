(function() {
  "use strict";

  // ===== AOS INIT =====
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, once: true, offset: 30 });
  }

  // ===== LOADING SCREEN =====
  window.addEventListener('load', function() {
    setTimeout(function() {
      var loader = document.getElementById('loadingScreen');
      if (loader) loader.classList.add('loader-hidden');
    }, 1800);
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

  // ===== CORPORATE & RETAIL CARD NAVIGATION =====
  var corpCardDiv = document.getElementById('corporateCard');
  var retailCardDiv = document.getElementById('retailCard');
  var corpBtn = document.getElementById('gotoCorporateBtn');
  var retailBtn = document.getElementById('gotoRetailBtn');

  function goToCorporate() {
    window.location.href = 'corporate';
  }

  function goToRetail() {
    window.location.href = 'retail';
  }

  if (corpCardDiv) {
    corpCardDiv.addEventListener('click', function(e) {
      if (corpBtn && (e.target === corpBtn || corpBtn.contains(e.target))) return;
      goToCorporate();
    });
  }

  if (retailCardDiv) {
    retailCardDiv.addEventListener('click', function(e) {
      if (retailBtn && (e.target === retailBtn || retailBtn.contains(e.target))) return;
      goToRetail();
    });
  }

  if (corpBtn) {
    corpBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      goToCorporate();
    });
  }

  if (retailBtn) {
    retailBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      goToRetail();
    });
  }

  // ===== MENU NAVIGATION =====
  var pageMap = {
    'corporate-gifts': 'corporate',
    'party-supplies': 'retail',
    'gallery': 'gallery',
    'contact': 'contact',
    'about-page': 'about'
  };

  document.querySelectorAll('.menu-item').forEach(function(item) {
    item.addEventListener('click', function() {
      var page = item.getAttribute('data-page');
      var url = pageMap[page];
      if (url) {
        window.location.href = url;
      }
    });
  });

  // ===== CONTACT MODAL =====
  var modal = document.getElementById('contactModal');
  var modalTitle = document.getElementById('modalContactTitle');
  var modalDetail = document.getElementById('modalContactDetail');
  var modalActionBtn = document.getElementById('modalActionBtn');
  var modalCloseBtn = document.getElementById('modalCloseBtn');

  var contactsMap = {
    call: { 
      title: "📞 Call Rutie's Group", 
      detail: "(071) 320-2405", 
      actionText: "📱 Call Now", 
      actionType: "tel", 
      value: "+27713202405" 
    },
    email: { 
      title: "✉️ Email Us", 
      detail: "info@rutiesgroup.co.za", 
      actionText: "📧 Send Email", 
      actionType: "mail", 
      value: "info@rutiesgroup.co.za" 
    },
    instagram: { 
      title: "📸 Instagram", 
      detail: "@rutiesgroup", 
      actionText: "🌐 Open Instagram", 
      actionType: "link", 
      value: "https://www.instagram.com/rutiesgroup?igsh=aHdxNHpucnZpMzJw&utm_source=qr" 
    },
    whatsapp: { 
      title: "💬 WhatsApp", 
      detail: "(071) 320-2405", 
      actionText: "💬 Start Chat", 
      actionType: "wa", 
      value: "27713202405" 
    }
  };

  function showContactModal(type) {
    var info = contactsMap[type];
    if (!info) return;
    
    if (modalTitle) modalTitle.innerText = info.title;
    if (modalDetail) modalDetail.innerText = info.detail;
    if (modalActionBtn) {
      modalActionBtn.innerText = info.actionText;
      modalActionBtn.onclick = function() {
        if (info.actionType === 'tel') {
          window.location.href = 'tel:' + info.value;
        } else if (info.actionType === 'mail') {
          window.location.href = 'mailto:' + info.value;
        } else if (info.actionType === 'link') {
          window.open(info.value, '_blank');
        } else if (info.actionType === 'wa') {
          window.open('https://wa.me/' + info.value, '_blank');
        }
        closeModal();
      };
    }
    
    if (modal) {
      modal.style.visibility = 'visible';
      modal.style.opacity = '1';
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modal) {
      modal.style.visibility = 'hidden';
      modal.style.opacity = '0';
      document.body.style.overflow = '';
    }
  }

  document.querySelectorAll('.contact-icon-item').forEach(function(el) {
    el.addEventListener('click', function() {
      var type = el.getAttribute('data-contact-type');
      showContactModal(type);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) closeModal();
    });
  }

  // ===== IMAGE ERROR FALLBACKS =====
  document.querySelectorAll('.contact-icon-item img').forEach(function(img) {
    img.addEventListener('error', function() {
      var parent = img.closest('.contact-icon-item');
      var type = parent ? parent.getAttribute('data-contact-type') : null;
      if (type === 'call') img.src = 'https://placehold.co/40x40/21561f/white?text=📞';
      else if (type === 'email') img.src = 'https://placehold.co/40x40/64285c/white?text=✉️';
      else if (type === 'instagram') img.src = 'https://placehold.co/40x40/e7a102/white?text=📸';
      else if (type === 'whatsapp') img.src = 'https://placehold.co/40x40/25D366/white?text=💬';
    });
  });

})();
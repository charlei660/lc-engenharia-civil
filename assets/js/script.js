/* ========================================
   JAVASCRIPT - LC ENGENHARIA CIVIL
   ======================================== */

/* ========================================
   MENU MOBILE
   ======================================== */
document.addEventListener('DOMContentLoaded', function() {
  const navbarToggle = document.getElementById('navbar-toggle');
  const navbar = document.getElementById('navbar');
  const navbarMenu = document.getElementById('navbar-menu');
  const navbarLinks = document.querySelectorAll('.navbar-link');

  // Abrir/fechar menu mobile
  if (navbarToggle) {
    navbarToggle.addEventListener('click', function() {
      navbar.classList.toggle('active');
      // Atualizar aria-expanded para acessibilidade
      const isActive = navbar.classList.contains('active');
      navbarToggle.setAttribute('aria-expanded', isActive);
    });
  }

  // Fechar menu quando clicar em um link
  navbarLinks.forEach(link => {
    link.addEventListener('click', function() {
      navbar.classList.remove('active');
      if (navbarToggle) {
        navbarToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Fechar menu ao clicar fora
  document.addEventListener('click', function(event) {
    const isClickInsideNavbar = navbar.contains(event.target);
    if (!isClickInsideNavbar && navbar.classList.contains('active')) {
      navbar.classList.remove('active');
      if (navbarToggle) {
        navbarToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
});

/* ========================================
   FAQ ACCORDION
   ======================================== */
function toggleFaq(button) {
  const faqItem = button.parentElement;
  const isActive = faqItem.classList.contains('active');

  // Fechar todos os FAQs abertos
  document.querySelectorAll('.faq-item.active').forEach(item => {
    if (item !== faqItem) {
      item.classList.remove('active');
    }
  });

  // Toggle do FAQ atual
  faqItem.classList.toggle('active');

  // Atualizar aria-expanded para acessibilidade
  button.setAttribute('aria-expanded', !isActive);
}

// Permitir navegação por teclado no FAQ
document.addEventListener('DOMContentLoaded', function() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleFaq(this);
      }
    });
  });
});

/* ========================================
   GALERIA / LIGHTBOX
   ======================================== */
const galleryImages = [
  {
    id: 'estrutura',
    src: 'assets/img/estrutura.jpg',
    alt: 'Estrutura de obra em Botucatu',
    caption: 'Estrutura da Obra'
  },
  {
    id: 'fundacao',
    src: 'assets/img/fundacao.jpg',
    alt: 'Fundação de obra em Botucatu',
    caption: 'Fundação da Obra'
  },
  {
    id: 'pronta',
    src: 'assets/img/pronta.jpg',
    alt: 'Obra finalizada em Botucatu',
    caption: 'Obra Finalizada'
  },
  {
    id: 'hero',
    src: 'assets/img/hero.jpg',
    alt: 'Projeto em destaque',
    caption: 'Projeto em Destaque'
  }
];

let currentImageIndex = 0;

function openLightbox(imageId) {
  const lightbox = document.getElementById('lightbox');
  const image = galleryImages.find(img => img.id === imageId);

  if (!image) return;

  currentImageIndex = galleryImages.indexOf(image);
  updateLightboxImage();
  lightbox.setAttribute('aria-hidden', 'false');

  // Prevenir scroll no body quando lightbox está aberto
  document.body.style.overflow = 'hidden';

  // Fechar lightbox ao pressionar ESC
  document.addEventListener('keydown', handleLightboxKeydown);
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  document.removeEventListener('keydown', handleLightboxKeydown);
}

function handleLightboxKeydown(e) {
  if (e.key === 'Escape') {
    closeLightbox();
  } else if (e.key === 'ArrowLeft') {
    prevImage();
  } else if (e.key === 'ArrowRight') {
    nextImage();
  }
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  updateLightboxImage();
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  updateLightboxImage();
}

function updateLightboxImage() {
  const image = galleryImages[currentImageIndex];
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');

  if (lightboxImage && lightboxCaption) {
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = image.caption;
  }
}

// Fechar lightbox ao clicar no overlay
document.addEventListener('DOMContentLoaded', function() {
  const lightbox = document.getElementById('lightbox');

  if (lightbox) {
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }
});

/* ========================================
   SCROLL SMOOTH PARA ÂNCORAS
   ======================================== */
document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      // Ignorar links do lightbox
      if (href === '#img-estrutura' || href === '#img-fundacao' || href === '#img-pronta' || href === '#img-hero') {
        return;
      }

      const target = document.querySelector(href);

      if (target && href !== '#') {
        e.preventDefault();

        // Calcular offset para a navbar fixa
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.offsetTop - navbarHeight;

        // Usar scroll behavior smooth do CSS ou fallback JavaScript
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

/* ========================================
   RASTREAMENTO DE EVENTOS
   ======================================== */
// Garantir que Google Analytics está disponível
if (typeof gtag !== 'undefined') {
  // Rastreamento automático de cliques em links WhatsApp
  document.addEventListener('DOMContentLoaded', function() {
    const whatsappLinks = document.querySelectorAll('a[href*="whatsapp"]');

    whatsappLinks.forEach(link => {
      if (!link.hasAttribute('data-tracking-added')) {
        link.setAttribute('data-tracking-added', 'true');
      }
    });
  });
}

/* ========================================
   VERIFICAÇÃO DE ACESSIBILIDADE
   ======================================== */
document.addEventListener('DOMContentLoaded', function() {
  // Verificar se todas as imagens têm alt
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (!img.hasAttribute('alt') || img.getAttribute('alt').trim() === '') {
      console.warn('Imagem sem atributo alt:', img.src);
    }
  });

  // Verificar botões acessíveis
  const buttons = document.querySelectorAll('button');
  buttons.forEach(btn => {
    if (!btn.hasAttribute('aria-label') && btn.textContent.trim() === '') {
      console.warn('Botão sem label acessível:', btn);
    }
  });
});

/* ========================================
   PERFORMANCE - LAZY LOADING MANUAL FALLBACK
   ======================================== */
// Fallback para navegadores que não suportam lazy loading nativo
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

/* ========================================
   RESPEITAR prefers-reduced-motion
   ======================================== */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  document.documentElement.style.scrollBehavior = 'auto';
}

/* ========================================
   INICIALIZAÇÃO DE COMPONENTES
   ======================================== */
document.addEventListener('DOMContentLoaded', function() {
  console.log('✓ LC Engenharia Civil - Website carregado com sucesso');

  // Verificar elementos críticos
  const criticalElements = [
    { id: 'navbar', name: 'Navbar' },
    { id: 'navbar-toggle', name: 'Menu Toggle' },
    { id: 'lightbox', name: 'Lightbox' },
    { class: 'faq-item', name: 'FAQ Items' }
  ];

  criticalElements.forEach(element => {
    if (element.id) {
      const el = document.getElementById(element.id);
      if (!el) {
        console.warn(`⚠ Elemento crítico não encontrado: ${element.name} (#${element.id})`);
      }
    } else if (element.class) {
      const els = document.querySelectorAll(`.${element.class}`);
      if (els.length === 0) {
        console.warn(`⚠ Elementos críticos não encontrados: ${element.name} (.${element.class})`);
      }
    }
  });
});

/* ========================================
   ERROR HANDLING
   ======================================== */
window.addEventListener('error', function(event) {
  console.error('Erro não tratado:', event.error);
});

window.addEventListener('unhandledrejection', function(event) {
  console.error('Promise rejection não tratada:', event.reason);
});

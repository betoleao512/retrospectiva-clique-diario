/* ============================================================
   RETROSPECTIVA CLIQUE DIÁRIO — main.js
   Navbar scroll · Lightbox com foto + áudio + Ken Burns + fade out
   ============================================================ */

// --- NAVBAR --------------------------------------------------
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.style.background = 'rgba(17,17,16,0.98)';
      navbar.style.backdropFilter = 'blur(8px)';
    } else {
      navbar.style.background = '#111110';
      navbar.style.backdropFilter = 'none';
    }
  });
}

// --- LIGHTBOX ------------------------------------------------
const lightbox      = document.getElementById('lightbox');
const lightboxFoto  = document.getElementById('lightbox-foto');
const lightboxAudio = document.getElementById('lightbox-audio');
const lightboxClose = document.getElementById('lightbox-close');
const galleryItems  = document.querySelectorAll('.gallery-item');

if (galleryItems.length && lightbox) {
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const audioSrc  = item.dataset.audio;
      const fotoSrc   = item.dataset.foto;
      const fotoPos   = item.dataset.position || 'center center';
      if (!audioSrc || !fotoSrc) return;

      // Garante que lightbox está visível e sem fade
      lightbox.classList.remove('fadeout');
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Carrega foto com enquadramento específico
      lightboxFoto.src = fotoSrc;
      lightboxFoto.style.objectPosition = fotoPos;

      // Reinicia Ken Burns
      lightboxFoto.classList.remove('ken-burns');
      void lightboxFoto.offsetWidth;
      lightboxFoto.classList.add('ken-burns');

      // Carrega e toca áudio
      lightboxAudio.src = audioSrc;
      lightboxAudio.load();
      lightboxAudio.play();
    });
  });

  // Fechar com botão ✕
  lightboxClose.addEventListener('click', fecharLightbox);

  // Fechar clicando no fundo escuro
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) fecharLightbox();
  });

  // Fechar com tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fecharLightbox();
  });

  // Fechar automaticamente quando o áudio termina — com fade out
  lightboxAudio.addEventListener('ended', () => {
    fecharLightboxComFade();
  });
}

// Fecha imediatamente (botão ✕ ou Escape)
function fecharLightbox() {
  if (!lightbox) return;
  lightboxAudio.pause();
  lightboxAudio.src = '';
  lightboxFoto.src  = '';
  lightboxFoto.classList.remove('ken-burns');
  lightbox.classList.remove('active', 'fadeout');
  document.body.style.overflow = '';
}

// Fecha com fade out suave (fim do áudio)
function fecharLightboxComFade() {
  if (!lightbox) return;
  lightboxAudio.pause();

  // Inicia fade out
  lightbox.classList.add('fadeout');

  // Após a animação terminar, limpa tudo
  setTimeout(() => {
    lightboxFoto.src = '';
    lightboxFoto.classList.remove('ken-burns');
    lightbox.classList.remove('active', 'fadeout');
    lightboxAudio.src = '';
    document.body.style.overflow = '';
  }, 1500); // duração do fade — 1.5s
}

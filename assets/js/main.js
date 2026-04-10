/* ============================================================
   RETROSPECTIVA CLIQUE DIÁRIO — main.js
   Navbar scroll · Lightbox com foto + áudio + Ken Burns
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
      const audioSrc = item.dataset.audio;
      const fotoSrc  = item.dataset.foto;
      if (!audioSrc || !fotoSrc) return;

      // Carrega foto e áudio
      lightboxFoto.src  = fotoSrc;
      lightboxAudio.src = audioSrc;

      // Reinicia animação Ken Burns
      lightboxFoto.classList.remove('ken-burns');
      void lightboxFoto.offsetWidth; // força reflow para reiniciar animação
      lightboxFoto.classList.add('ken-burns');

      lightboxAudio.load();
      lightboxAudio.play();
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
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
}

function fecharLightbox() {
  if (!lightbox) return;
  lightboxAudio.pause();
  lightboxAudio.src = '';
  lightboxFoto.src  = '';
  lightboxFoto.classList.remove('ken-burns');
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

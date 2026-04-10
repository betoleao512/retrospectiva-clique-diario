/* ============================================================
   RETROSPECTIVA CLIQUE DIÁRIO — contato.js
   Formulário de contato via mailto
   ============================================================ */

function enviarContato() {
  const nome      = document.getElementById('nome').value.trim();
  const email     = document.getElementById('email').value.trim();
  const assunto   = document.getElementById('assunto').value.trim();
  const mensagem  = document.getElementById('mensagem').value.trim();

  if (!nome || !email || !mensagem) {
    alert('Por favor, preencha nome, e-mail e mensagem.');
    return;
  }

  const corpo = encodeURIComponent(
    `Nome: ${nome}\nE-mail: ${email}\n\n${mensagem}`
  );
  const assuntoEncoded = encodeURIComponent(assunto || 'Contato via Exposição Clique Diário');

  window.location.href = `mailto:alfabile@gmail.com?subject=${assuntoEncoded}&body=${corpo}`;
}

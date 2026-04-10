/* ============================================================
   RETROSPECTIVA CLIQUE DIÁRIO — ialfa.js
   Gerador de poemas via Claude API · i.Alfa
   ============================================================ */

const fotosTags = [
  { src: 'assets/images/foto-01.jpg', tags: ['porto', 'trabalho', 'mar', 'peixe', 'gente'] },
  { src: 'assets/images/foto-02.jpg', tags: ['cidade', 'luz', 'concreto', 'urbano', 'sombra'] },
  { src: 'assets/images/foto-03.jpg', tags: ['manhã', 'cais', 'barco', 'rio', 'silêncio'] },
  { src: 'assets/images/foto-04.jpg', tags: ['rio', 'memória', 'reflexo', 'água', 'calma'] },
  { src: 'assets/images/foto-05.jpg', tags: ['pôr do sol', 'céu', 'fogo', 'horizonte', 'beleza'] },
  { src: 'assets/images/foto-06.jpg', tags: ['pesca', 'silêncio', 'espera', 'paciência', 'mar'] },
  { src: 'assets/images/foto-07.jpg', tags: ['infância', 'criança', 'brincadeira', 'alegria', 'mar'] },
  { src: 'assets/images/foto-08.jpg', tags: ['natureza', 'verde', 'sal', 'vento', 'caminho'] },
  { src: 'assets/images/foto-09.jpg', tags: ['janela', 'espera', 'olhar', 'distância', 'porto'] },
  { src: 'assets/images/foto-10.jpg', tags: ['estrada', 'horizonte', 'liberdade', 'viagem', 'infinito'] },
  { src: 'assets/images/foto-11.jpg', tags: ['reflexo', 'porto', 'água', 'barco', 'noite'] },
  { src: 'assets/images/foto-12.jpg', tags: ['fim', 'partida', 'barco', 'mar', 'despedida'] },
];

function encontrarFoto(palavra) {
  const p = palavra.toLowerCase().trim();
  let melhorFoto = fotosTags[0];
  let melhorScore = 0;

  fotosTags.forEach(foto => {
    const score = foto.tags.filter(tag => p.includes(tag) || tag.includes(p)).length;
    if (score > melhorScore) {
      melhorScore = score;
      melhorFoto = foto;
    }
  });

  if (melhorScore === 0) {
    melhorFoto = fotosTags[Math.floor(Math.random() * fotosTags.length)];
  }
  return melhorFoto;
}

let ultimaGeracao = 0;
const INTERVALO_MS = 30000;

async function gerarPoema() {
  const nome    = document.getElementById('ialfa-nome').value.trim();
  const palavra = document.getElementById('ialfa-palavra').value.trim();

  if (!nome || !palavra) {
    alert('Por favor, preencha seu nome e uma palavra.');
    return;
  }

  const agora = Date.now();
  if (agora - ultimaGeracao < INTERVALO_MS) {
    const restante = Math.ceil((INTERVALO_MS - (agora - ultimaGeracao)) / 1000);
    alert(`Aguarde ${restante} segundos antes de gerar outro poema.`);
    return;
  }

  document.getElementById('ialfa-loading').style.display  = 'flex';
  document.getElementById('ialfa-result').style.display   = 'none';
  document.getElementById('ialfa-btn').disabled           = true;

  const systemPrompt = `Você é i.Alfa — a voz poética de Alfa Bile, fotógrafo e escritor de Itajaí, Santa Catarina.

Seu estilo de escrita tem estas características:
- Frases curtas e densas
- Verbos que humanizam elementos da natureza
- Tom lírico e contemplativo
- Imagens sensoriais fortes
- Sentido de lugar (mar, porto, rio, cidade litorânea)
- Metáforas visuais, como se cada verso fosse uma fotografia
- Última linha emocionalmente forte e memorável

Você escreve poemas curtos: entre 4 e 6 linhas.
Nunca use rimas forçadas. Prefira o verso livre com ritmo natural.
Nunca use hashtags, emojis ou linguagem de internet.
Responda APENAS com o poema — sem título, sem introdução, sem explicações.`;

  const userPrompt = `Escreva um poema curto para ${nome}, cuja palavra do momento é "${palavra}".
O poema deve ser inspirado no olhar de um fotógrafo que ama Itajaí e o mar.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 300,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }]
      })
    });

    const data = await response.json();
    const poema = data.content?.[0]?.text?.trim() || 'O mar não respondeu desta vez. Tente novamente.';

    const foto = encontrarFoto(palavra);

    document.getElementById('ialfa-poem').textContent = poema;
    document.getElementById('ialfa-photo').innerHTML  =
      `<img src="${foto.src}" alt="Foto de Alfa Bile" style="max-width:380px;margin:0 auto;display:block;border:1px solid rgba(200,146,42,0.2);" />`;

    document.getElementById('ialfa-result').style.display  = 'block';
    document.getElementById('ialfa-loading').style.display = 'none';

    ultimaGeracao = Date.now();

  } catch (err) {
    console.error('Erro i.Alfa:', err);
    document.getElementById('ialfa-loading').style.display = 'none';
    alert('Algo saiu errado. Tente novamente em alguns instantes.');
  }

  document.getElementById('ialfa-btn').disabled = false;
}

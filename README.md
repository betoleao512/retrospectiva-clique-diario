# Retrospectiva Clique Diário — Alfa Bile
Exposição virtual · HOW5 · UNIVALI ADS · 2026

## Estrutura de pastas

```
retrospectiva-clique-diario/
├── index.html               ← Home
├── galeria.html             ← Galeria + i.Alfa + Lightbox
├── artista.html             ← Sobre o Artista
├── contato.html             ← Contato
└── assets/
    ├── css/
    │   └── style.css        ← Design system completo
    ├── js/
    │   ├── main.js          ← Navbar scroll + Lightbox (foto + áudio + Ken Burns)
    │   ├── ialfa.js         ← Gerador de poemas (Claude API)
    │   └── contato.js       ← Formulário mailto
    ├── images/
    │   ├── hero-bg.jpg      ← Foto de fundo da Home
    │   ├── alfa-bile.jpg    ← Retrato do Alfa (página Artista)
    │   ├── foto-01.jpg      ← 12 fotos da galeria
    │   ├── foto-02.jpg
    │   └── ...foto-12.jpg
    └── audio/
        ├── voz/
        │   ├── g1-01-peixeiro-do-porto.mp3
        │   ├── g1-02-luz-entre-concreto.mp3
        │   └── ...g1-12-o-ultimo-barco.mp3
        ├── efeitos/         ← Sons ambiente (buzina, água, etc.) — fase futura
        └── musica/          ← Fundo musical — fase futura
```

## Como adicionar as fotos e áudios

1. Coloque as fotos em `assets/images/` com os nomes `foto-01.jpg` até `foto-12.jpg`
2. Coloque os áudios das locuções em `assets/audio/voz/` seguindo a nomenclatura `g1-XX-nome-da-foto.mp3`
3. Atualize os títulos das fotos em `galeria.html` (atributo `data-title` de cada `.gallery-item`)
4. Atualize as tags do i.Alfa em `assets/js/ialfa.js` (array `fotosTags`) conforme o tema de cada foto

## Lightbox — como funciona

Ao clicar em uma foto na galeria:
- A foto abre em tela cheia com efeito Ken Burns (zoom suave via CSS)
- O áudio da locução do Alfa Bile inicia automaticamente
- Apenas um botão ✕ discreto aparece no canto superior direito
- Fechar com ✕, clique no fundo escuro ou tecla Escape

## GitHub Pages

O site está publicado em:
`https://betoleao512.github.io/retrospectiva-clique-diario`

Para atualizar o site após alterações:
```bash
git add .
git commit -m "descrição da alteração"
git push
```

## Design System

| Variável       | Valor     | Uso                        |
|----------------|-----------|----------------------------|
| --preto        | #0A0A08   | Fundo principal            |
| --carbon       | #111110   | Navbar, cards, seções alt  |
| --ambar        | #C8922A   | Destaque, botões, tags     |
| --ambar-claro  | #E8B96A   | Hover, títulos em itálico  |
| --texto        | #D4CFC4   | Texto corrido              |
| --texto-suave  | #8A8070   | Labels, subtextos, ✕       |
| --branco-osso  | #F0EBE0   | Títulos principais         |

Fontes: Cormorant Garamond (títulos) · Cinzel (tags/labels) · Raleway (corpo)

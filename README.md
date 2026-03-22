# 💍 Convite de Casamento — Leandro & Evelin

Site interativo de convite de casamento com envelope animado, galeria de fotos, lista de presentes com PIX e confirmação via WhatsApp.

---

## 🚀 Como Rodar

### 1. Criar o projeto com CRA e instalar dependências

```bash
npx create-react-app leandro-evelin-wedding
cd leandro-evelin-wedding
npm install framer-motion
```

### 2. Substituir os arquivos

Copie todos os arquivos deste projeto para dentro da pasta criada:
- `src/` → substitua completamente
- `public/index.html` → substitua o arquivo padrão

### 3. Iniciar o servidor de desenvolvimento

```bash
npm start
```

Acesse: **http://localhost:3000**

### 4. Gerar build de produção

```bash
npm run build
```

---

## 📁 Estrutura de Pastas

```
src/
├── App.js                  # Componente raiz
├── App.css                 # Estilos globais e variáveis CSS
├── index.js                # Entry point React
├── data.js                 # ⭐ TODOS OS DADOS EDITÁVEIS AQUI
└── components/
    ├── Envelope.js/.css     # Animação do envelope com Framer Motion
    ├── Hero.js/.css         # Seção inicial com nomes e data
    ├── PhotoSections.js/.css # 7 seções com fotos de fundo
    ├── CeremonyInfo.js/.css  # Informações da cerimônia
    ├── GiftList.js/.css      # Lista de presentes + PIX
    ├── RSVP.js/.css          # Confirmação de presença → WhatsApp
    ├── Footer.js/.css        # Rodapé
    └── PixToast.js/.css      # Notificação de código PIX copiado
```

---

## ✏️ Como Editar

### Dados do casal, data e local
Edite o arquivo **`src/data.js`** — ele centraliza tudo:

```js
export const WEDDING = {
  noivo: 'Leandro',
  noiva: 'Evelin',
  data: '26 de Julho de 2025',
  horario: '18h00',
  local: 'Balneário Camboriú · SC',
  whatsapp: '5548996377486',
  pixChave: '48996377486',
  // ...
};
```

### Fotos do casal
No array `PHOTOS` em `data.js`, substitua as URLs:
```js
export const PHOTOS = [
  {
    url: 'URL_DA_SUA_FOTO_AQUI',  // ← coloque a URL da foto
    titulo: '"Com toda alegria..."',
    sub: 'Subtítulo da seção',
  },
  // ...
];
```

### Lista de presentes
No array `GIFTS` em `data.js`:
```js
export const GIFTS = [
  {
    emoji: '🍽️',
    nome: 'Jantar Romântico',
    desc: 'Descrição do presente...',
    valor: 150,           // ← valor em reais
    tag: 'Experiência',   // ← badge do card
  },
  // ...
];
```

### Informações da cerimônia
No array `CEREMONY` em `data.js`, edite endereços e horários.

---

## 🎨 Personalizar Cores

Em `src/App.css`, edite as variáveis CSS:

```css
:root {
  --gold: #C9A84C;       /* Dourado principal */
  --gold-light: #E8D5A3; /* Dourado claro */
  --gold-dark: #9B7A2F;  /* Dourado escuro */
  --rose: #D4A0A0;       /* Rosa */
  --cream: #FAF7F2;      /* Creme (fundo) */
  --dark: #2A1F1A;       /* Escuro (seções dark) */
}
```

---

## 📲 Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| 🎁 Envelope animado | Clique para abrir com animação de lacre |
| 📸 7 seções de fotos | Fundo parallax com frases românticas |
| 💝 Lista de presentes | Cards elegantes com emoji e valor |
| 💸 Cópia de PIX | Copia código automaticamente ao clicar |
| 📲 RSVP WhatsApp | Redireciona com mensagem pronta |
| 🌙 Design responsivo | Mobile-first, funciona em qualquer tela |

---

## 🛠️ Tecnologias

- **React 18** + Create React App
- **Framer Motion** — animação do envelope
- **CSS puro** com variáveis customizadas
- **Google Fonts** — Cormorant Garamond + Jost
- **IntersectionObserver API** — animações no scroll
- **Clipboard API** — cópia do código PIX
- **WhatsApp API** — link direto com mensagem

---

*Feito com 💛 para Leandro & Evelin*

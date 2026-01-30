# 🛒 PAGLY - Smart Shopping Assistant

> Aplicativo mobile de compras inteligente com reconhecimento de imagem, gestão financeira e integração Open Finance.

[![Version](https://img.shields.io/badge/version-1.0.0--beta-blue.svg)](https://github.com/Luccastteo/smartcart-ui-refresh)
[![React Native](https://img.shields.io/badge/React%20Native-0.81.5-61dafb.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~54.0-000020.svg)](https://expo.dev/)
[![NestJS](https://img.shields.io/badge/NestJS-10.0-e0234e.svg)](https://nestjs.com/)

---

## 📱 Sobre o Projeto

PAGLY é um assistente de compras inteligente que utiliza reconhecimento de imagem (estilo Google Lens) para identificar produtos e preços automaticamente, além de oferecer gestão financeira completa integrada com Open Finance.

### ✨ Funcionalidades Principais

- 📸 **Capture** - Reconhecimento de produtos por foto
- 📝 **Listas Inteligentes** - Gerenciamento de listas de compras
- 🛒 **Carrinho** - Controle de produtos e valores
- 💰 **Finanças** - Gestão de gastos e orçamento
- 💳 **Carteira Digital** - Integração com contas e cartões
- 🔐 **Autenticação JWT** - Login seguro
- 🌙 **Dark Mode Premium** - Interface moderna e elegante

---

## 🏗️ Arquitetura

```
smartcart-ui-refresh/
├── mobile/              # App React Native + Expo
│   ├── src/
│   │   ├── screens/     # Telas do app
│   │   ├── navigation/  # Navegação
│   │   ├── context/     # Contexts (Auth, Cart)
│   │   ├── services/    # APIs e serviços
│   │   └── constants/   # Tema e constantes
│   └── assets/          # Imagens e ícones
│
└── backend/             # API NestJS
    └── src/
        ├── auth/        # Autenticação JWT
        ├── users/       # Usuários
        ├── products/    # Produtos
        ├── lists/       # Listas de compras
        └── finances/    # Transações financeiras
```

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Expo CLI
- Android Studio (para Android) ou Xcode (para iOS)

### 1️⃣ Clonar o Repositório

```bash
git clone https://github.com/Luccastteo/smartcart-ui-refresh.git
cd smartcart-ui-refresh
```

### 2️⃣ Configurar o Mobile

```bash
cd mobile
npm install

# Iniciar Metro Bundler
npx expo start

# Ou com tunnel (para redes diferentes)
npx expo start --tunnel
```

### 3️⃣ Configurar o Backend

```bash
cd backend
npm install

# Criar arquivo .env
cp .env.example .env

# Rodar migrations
npm run migration:run

# Iniciar servidor
npm run start:dev
```

### 4️⃣ Rodar no Dispositivo

**Opção 1: Expo Go (Desenvolvimento Rápido)**
1. Instale o Expo Go no seu celular
2. Escaneie o QR code do terminal

**Opção 2: Development Build (Recomendado)**
```bash
# Android
npx expo run:android

# iOS
npx expo run:ios
```

---

## 📦 Tecnologias Utilizadas

### Mobile
- **React Native** 0.81.5
- **Expo** ~54.0
- **TypeScript** 5.9
- **React Navigation** 7.x
- **Expo Camera** - Captura de imagens
- **Expo Haptics** - Feedback tátil
- **AsyncStorage** - Persistência local
- **Lucide Icons** - Ícones modernos

### Backend
- **NestJS** 10.x
- **TypeORM** - ORM
- **SQLite** - Banco de dados (dev)
- **JWT** - Autenticação
- **Passport** - Estratégias de auth

---

## 🎨 Design System

### Cores
```typescript
COLORS = {
  background: '#0a0a0a',      // Preto profundo
  surface: '#1a1a1a',         // Cinza escuro
  accent: '#a3e635',          // Verde lima
  textPrimary: '#ffffff',     // Branco
  textSecondary: '#a1a1a1',   // Cinza claro
}
```

### Tipografia
- **Font Family:** Inter (Light, Regular, Medium, Bold)
- **Sizes:** 12px - 32px

---

## 📸 Screenshots

> Em breve - capturas de tela das principais funcionalidades

---

## 🗺️ Roadmap

### ✅ Fase 1 - MVP (Concluída)
- [x] Autenticação e onboarding
- [x] Telas principais (Home, Lista, Carrinho, Finanças, Carteira)
- [x] Funcionalidade Capture
- [x] Navegação completa
- [x] UI/UX premium

### 🔄 Fase 2 - Integração (Em Andamento)
- [ ] CartContext com persistência
- [ ] Integração backend real
- [ ] Cálculo automático de totais
- [ ] Sincronização de dados

### 🔜 Fase 3 - Pagamentos
- [ ] Integração Mercado Pago
- [ ] Checkout funcional
- [ ] Webhooks de confirmação
- [ ] Recibos digitais

### 🔜 Fase 4 - Produção
- [ ] Testes E2E
- [ ] Build de produção
- [ ] Publicação Play Store
- [ ] Publicação App Store

---

## 🧪 Testes

```bash
# Mobile
cd mobile
npm test

# Backend
cd backend
npm run test
npm run test:e2e
```

---

## 📝 Variáveis de Ambiente

### Mobile (.env)
```env
API_URL=http://localhost:3000
MERCADOPAGO_PUBLIC_KEY=your_key_here
```

### Backend (.env)
```env
DATABASE_URL=./database.sqlite
JWT_SECRET=your_secret_here
PORT=3000
```

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Lucas Matteo**
- GitHub: [@Luccastteo](https://github.com/Luccastteo)

---

## 🙏 Agradecimentos

- Expo Team
- React Native Community
- NestJS Team

---

**Feito com ❤️ e ☕ por Lucas Matteo**

# PAGLY Flutter - Smart Shopping Cart

App nativo Flutter para gerenciamento inteligente de compras com OCR, listas, carrinho e análise financeira.

## 🚀 Stack Técnica

- **Flutter** + Dart
- **Riverpod** - Estado
- **go_router** - Navegação
- **Supabase** - Backend (Auth + Database + Storage)
- **google_mlkit_text_recognition** - OCR
- **Material 3** - Design System

## 📁 Estrutura do Projeto

```
lib/
├── main.dart                 # Entry point
├── theme/                    # Design system
│   ├── colors.dart
│   ├── typography.dart
│   ├── spacing.dart
│   └── app_theme.dart
├── core/                     # Utilities
│   ├── env.dart
│   └── utils/
│       ├── currency_formatter.dart
│       └── validators.dart
├── data/                     # Data layer
│   ├── supabase_client.dart
│   └── repositories/
│       └── auth_repository.dart
├── domain/                   # Domain models
│   └── models/
│       ├── user.dart
│       └── cart_item.dart
├── features/                 # Features
│   ├── auth/
│   │   ├── screens/
│   │   ├── widgets/
│   │   └── providers/
│   ├── home/
│   ├── lists/
│   ├── cart/
│   ├── scanner/
│   ├── finance/
│   └── wallet/
└── router/                   # Navigation
    └── app_router.dart
```

## 🔧 Setup

### 1. Pré-requisitos

- Flutter SDK (>= 3.0.0)
- Dart SDK
- Android Studio / Xcode
- Conta Supabase

### 2. Instalação

```bash
# Clone o repositório
cd mobile_flutter

# Instalar dependências
flutter pub get

# Configurar variáveis de ambiente
# Crie o arquivo .env na raiz do projeto
```

### 3. Configurar `.env`

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua-anon-key
GOOGLE_VISION_API_KEY=sua-google-vision-key
```

### 4. Rodar o App

```bash
# Android
flutter run

# iOS (requer macOS)
flutter run -d ios

# Web (desenvolvimento)
flutter run -d chrome
```

## 🏗️ Build

### Android

```bash
# Debug APK
flutter build apk --debug

# Release APK
flutter build apk --release

# App Bundle (Play Store)
flutter build appbundle --release
```

### iOS (via CI - GitHub Actions / Codemagic)

```yaml
# .github/workflows/ios-build.yml
name: iOS Build
on: [push]
jobs:
  build:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v2
      - uses: subosito/flutter-action@v2
      - run: flutter pub get
      - run: flutter build ios --release --no-codesign
```

## 📱 Funcionalidades Implementadas

### ✅ Autenticação
- [x] Welcome Screen
- [x] Sign In
- [x] Sign Up
- [x] Logout
- [ ] Reset Password

### ✅ Home
- [x] Balance Card
- [x] Quick Actions
- [x] Recent Transactions
- [x] Bottom Navigation

### ✅ Listas
- [x] Lista de compras (MVP)
- [ ] Criar lista
- [ ] Editar lista
- [ ] Deletar lista

### ✅ Carrinho
- [x] Visualizar itens (MVP)
- [ ] Adicionar item
- [ ] Remover item
- [ ] Atualizar quantidade
- [ ] Finalizar compra

### 🔄 Scanner (Em Desenvolvimento)
- [ ] Câmera
- [ ] OCR (Google ML Kit)
- [ ] Parse nome/preço
- [ ] Revisão antes de salvar
- [ ] Upload no Supabase Storage

### 🔄 Finanças (Placeholder)
- [ ] Gráficos de gastos
- [ ] Categorias
- [ ] Análise mensal

### 🔄 Carteira (Placeholder)
- [ ] Saldo
- [ ] Transações
- [ ] Metas

### 🔄 Export/Import (Não Implementado)
- [ ] Export CSV
- [ ] Export PDF
- [ ] Export XLSX
- [ ] Import CSV

## 🎨 Design System

### Cores

```dart
AppColors.background        // #262F30
AppColors.accent            // #A3E635 (Lime)
AppColors.textPrimary       // #FFFFFF
AppColors.textSecondary     // #A0AEC0
```

### Tipografia

- Fonte: **Inter** (via Google Fonts)
- Tamanhos: h1 (32px), h2 (24px), h3 (20px), body (16px), caption (14px)

### Espaçamento

- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- xxl: 48px

## 🗄️ Supabase

### Tabelas Existentes

- `users` - Usuários
- `cart_items` - Itens do carrinho
- `shopping_lists` - Listas de compras
- `transactions` - Transações financeiras
- `scan_sessions` - Sessões de scanner

### RLS (Row Level Security)

Todas as tabelas têm RLS habilitado para segurança.

## 🧪 Testes

```bash
# Unit tests
flutter test

# Integration tests
flutter test integration_test/
```

## 📦 Dependências Principais

```yaml
flutter_riverpod: ^2.4.10      # Estado
go_router: ^13.2.0              # Navegação
supabase_flutter: ^2.3.4        # Backend
google_mlkit_text_recognition   # OCR
google_fonts: ^6.1.0            # Fontes
```

## 🚧 Próximos Passos

1. Implementar Scanner com OCR real
2. Conectar CRUD com Supabase
3. Implementar Export/Import
4. Adicionar gráficos em Finanças
5. Testes unitários e de integração
6. Build iOS via CI

## 📝 Licença

MIT

## 👨‍💻 Autor

Lucas - PAGLY Team

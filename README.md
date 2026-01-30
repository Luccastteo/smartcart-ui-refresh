# PAGLY

Project transformed from web app to premium native mobile app.

## Structure

- `/mobile`: React Native (Expo) - The main application.
- `/backend`: NestJS - The backend API, database, authentication, and services.
- `/src`: (Legacy) Original web application (kept for reference/web version).

## Stack Decisions

### Mobile
- **Framework**: React Native + Expo
- **Language**: TypeScript
- **Navigation**: React Navigation (Bottom Tabs)
- **Styling**: Design functionality via tokens (constants), Linear Gradient, Lucide Icons.
- **Features**: Expo Camera (Scanner), Expo File System (Export), Expo Haptics.

### Backend
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: Postgres (via TypeORM/Prisma) - To be configured.
- **Auth**: JWT Strategy.

## Setup Instructions

### Prerequisites
- Node.js
- Postgres Database (Local or Cloud like Supabase/Neon)

### Running Mobile
```bash
cd mobile
npm install
npx expo start
```

### Running Backend
```bash
cd backend
npm install
npm run start:dev
```

## Features Status
- [ ] Auth (Login/Register)
- [ ] Dashboard (Home/Lists)
- [ ] Scanner (OCR)
- [ ] Finances (Wallet)
- [ ] Export/Import

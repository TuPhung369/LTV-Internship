---
description: Repository Information Overview
alwaysApply: true
---

# Repository Information Overview

## Repository Summary

This repository contains a full-stack employee profile management system with separate frontend and backend components. The system is built using Vue.js for the frontend and Node.js with Moleculer microservices for the backend.

## Repository Structure

- **FrontVueJS/**: Contains all frontend projects built with Vue.js
  - **employee-profile-frontend/**: Main frontend application for employee profiles
  - **frontEnd-mg/**: Secondary frontend project
  - **ninjafood/**: Tailwind CSS practice project
- **BackVueJS/**: Contains all backend projects
  - **employee-profile-backend/**: Main backend microservices for employee profiles
  - **mg-backend/**: Secondary backend project
  - **services backup/**: Backup of microservices

## Projects

### Frontend (employee-profile-frontend)

**Configuration File**: package.json

#### Language & Runtime

**Language**: TypeScript
**Version**: TypeScript 4.5.5
**Build System**: Vite 4.1.1
**Package Manager**: Yarn

#### Dependencies

**Main Dependencies**:

- Vue 3.2.33
- Vue Router 4.0.14
- Pinia 2.0.13 (State Management)
- Element Plus 2.2.29 (UI Components)
- Tailwind CSS 3.2.6
- Axios 0.24.0
- Firebase 9.17.1

**Development Dependencies**:

- Jest 27.5.1
- ESLint 8.6.0
- Prettier 2.5.1
- TypeScript 4.5.5
- Vite 4.1.1

#### Build & Installation

```bash
yarn
yarn dev    # Development
yarn build  # Production build
```

#### Testing

**Framework**: Jest
**Test Location**: tests/
**Configuration**: jest.config.js
**Run Command**:

```bash
yarn test
```

### Backend (employee-profile-backend)

**Configuration File**: package.json

#### Language & Runtime

**Language**: TypeScript
**Version**: TypeScript 4.9.5
**Build System**: Node.js with esbuild
**Package Manager**: Yarn

#### Dependencies

**Main Dependencies**:

- Moleculer 0.14.28 (Microservices Framework)
- Prisma 5.12.1 (ORM)
- Firebase Admin 11.5.0
- Mongoose 8.4.3
- Axios 1.4.0
- NATS 2.11.0 (Message Broker)

**Development Dependencies**:

- Jest 29.3.1
- ESLint 8.30.0
- Prettier 2.8.0
- TypeScript 4.9.5
- ts-node 10.9.1

#### Build & Installation

```bash
yarn
yarn prisma:generate
yarn serve    # Development
yarn build    # Production build
```

#### Docker

**Dockerfile**: Dockerfile
**Image**: Node 18 Alpine
**Configuration**: Multi-stage build with separate builder and runtime stages

#### Testing

**Framework**: Jest
**Test Location**: services/**/**tests**/**/\*.(spec|test).ts
**Configuration**: jest.config.js
**Run Command**:

```bash
yarn test
yarn test:coverage
```

#### Services

The backend is organized as a microservices architecture with the following services:

- accounts
- category
- department
- device
- gateway (API)
- history
- notification
- position
- qualification
- skill
- status
- vcards

# RestaurantOS

RestaurantOS is a restaurant management dashboard built with a modern TypeScript monorepo architecture using Turborepo, Expo, Hono, PostgreSQL, Drizzle ORM, OpenAPI, and React Query.

## Overview

The project provides a dashboard for restaurant operations management, including:

- Menu management
- Order management
- Customer management
- Restaurant settings
- Reusable design system components

## Architecture

```
restaurant-os
├── apps
│   └── dashboard          # Expo React Native dashboard
│
├── services
│   └── backend            # Hono API + Drizzle ORM
│
├── packages
│   ├── api-client         # Orval generated API client
│   ├── shared             # Shared utilities
│   ├── types              # Shared types
│   └── ui                 # Shared UI package
```

## Tech Stack

### Frontend

- React Native
- Expo
- TypeScript
- React Query

### Backend

- Hono
- PostgreSQL
- Drizzle ORM
- drizzle-zod

### API

- OpenAPI
- Orval

### Monorepo

- Turborepo
- PNPM Workspaces

## Features

### Orders

- View orders
- Create orders
- Update order status
- Status badges

### Menu

- View menu items
- Create menu items

### Customers

- View customers

### Settings

- View restaurant settings

### Design System

Reusable UI components:

- AppButton
- AppInput
- AppSelect
- AppModal
- Card
- Badge
- LoadingState
- EmptyState

## API Endpoints

### Menu

```
GET    /menu-items
POST   /menu-items

GET    /menu-categories
```

### Orders

```
GET    /orders
POST   /orders
PATCH  /orders/{id}/status
```

### Customers

```
GET    /customers
```

### Settings

```
GET    /settings
```

## Running the Project

### Install dependencies

```bash
pnpm install
```

### Start backend

```bash
cd services/backend
pnpm dev
```

Backend runs on:

```
http://localhost:8787
```

### Start dashboard

```bash
cd apps/dashboard
pnpm start
```

### OpenAPI Documentation

```
http://localhost:8787/openapi.json
```

## Database

The backend uses PostgreSQL with Drizzle ORM.

Main entities:

- Menu Categories
- Menu Items
- Customers
- Orders
- Settings

## Reusable Components

The dashboard follows a reusable component architecture.

Examples:

- Modal dialogs
- Form inputs
- Buttons
- Cards
- Badges
- Empty states
- Loading states

## Future Improvements

- Edit menu items
- Delete menu items
- Advanced order workflows
- Authentication and authorization
- Dashboard analytics
- Automated testing
- CI/CD pipeline

## Author

Neethu Vasundharan Sheeja

Senior Full Stack Developer

France
# RestaurantOS

RestaurantOS is a full-stack restaurant operations dashboard built with a modern TypeScript monorepo architecture using Turborepo, Expo, Hono, PostgreSQL, Drizzle ORM, OpenAPI, Orval, and React Query.

The project demonstrates a contract-first architecture where API contracts are generated from the backend schema and shared across the application.

---

## Overview

RestaurantOS provides a centralized dashboard for restaurant management operations, including:

- Order management
- Menu management
- Customer relationship management (CRM)
- Restaurant settings management
- Dashboard KPIs and analytics
- Reusable design system components

---

## Architecture

```text
restaurant-os
├── apps
│   └── dashboard
│       └── Expo + React Native Web dashboard
│
├── services
│   └── backend
│       └── Hono API + Drizzle ORM + PostgreSQL
│
├── packages
│   ├── api-client
│   │   └── Orval generated API client
│   │
│   ├── shared
│   │   └── Shared utilities
│   │
│   ├── types
│   │   └── Shared types
│   │
│   └── ui
│       └── Shared UI components
│
└── turbo.json
```

---

## Technology Stack

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

### API & Contracts

- OpenAPI
- Orval-generated API client

### Monorepo

- Turborepo
- PNPM Workspaces

---

## Features

### Dashboard

- Total Orders KPI
- Total Customers KPI
- Total Revenue KPI

### Orders

- View orders
- Create new orders
- Update order status
- Order status badges
- Order detail information

### Menu

- View menu items
- Create menu items
- Category-based menu organization

### CRM (Customers)

- Customer list
- Order count per customer
- Customer total spend
- Recent customer orders

### Settings

- View restaurant settings
- Update preparation time
- Enable/disable auto-accept orders

### Design System

Reusable components include:

- AppButton
- AppInput
- AppSelect
- AppModal
- Card
- Badge
- LoadingState
- EmptyState

---

## API Endpoints

### Menu

```http
GET    /menu-items
POST   /menu-items

GET    /menu-categories
```

### Orders

```http
GET    /orders
POST   /orders
PATCH  /orders/{id}/status
```

### Customers

```http
GET    /customers
```

### Settings

```http
GET    /settings
PATCH  /settings
```

---

## Database Model

Main entities:

- Menu Categories
- Menu Items
- Customers
- Orders
- Order Items
- Settings

---

## Contract-First Architecture

The project follows:

```text
Drizzle Schema
      ↓
drizzle-zod
      ↓
Hono OpenAPI Routes
      ↓
OpenAPI Specification
      ↓
Orval Code Generation
      ↓
Frontend API Client
```

Benefits:

- Single source of truth
- Shared contracts
- End-to-end type safety
- Reduced API drift

---

## Running the Project

### Install Dependencies

```bash
pnpm install
```

### Start Dashboard

```bash
pnpm dev:dashboard
```

### Start Backend

```bash
pnpm dev:backend
```

Backend URL:

```text
http://localhost:8787
```

### Generate API Client

```bash
pnpm gen:contract
```

### OpenAPI Documentation

```text
http://localhost:8787/openapi.json
```

---

## Development Commands

```bash
pnpm dev:dashboard
pnpm dev:backend
pnpm gen:contract
pnpm lint
pnpm typecheck
pnpm test
```

---

## Testing

Frontend component testing is implemented using:

- Jest
- React Native Testing Library

Run tests:

```bash
pnpm test
```

---

## Architecture Decisions

### OpenAPI + Orval

Using OpenAPI and Orval provides:

- Shared API contracts
- Automatic client generation
- Strong typing across frontend and backend
- Reduced maintenance overhead

### Turborepo

Provides:

- Shared packages
- Better code organization
- Scalable monorepo architecture

### React Query

Provides:

- Data caching
- Loading state management
- Automatic refetching
- Improved API synchronization

---

## Tradeoffs

This project was completed as a time-boxed technical assignment.

Areas identified for future enhancement:

- Additional frontend and backend test coverage
- Advanced order workflow validation
- Menu item editing and deletion
- Expanded analytics dashboard
- Enhanced business rule enforcement

---

## Future Improvements

- Authentication and authorization
- Role-based access control
- Advanced dashboard analytics
- Notification system
- More comprehensive automated testing
- CI/CD integration

---

## Author

**Neethu Vasundharan Sheeja**

Senior Full Stack Developer

France
# AquaTrack Full-Stack Migration Plan

## Project Overview

The goal of this migration is to transform AquaTrack from a client-side JavaScript application that stores data in LocalStorage into a full-stack web application with a dedicated backend, REST API, and PostgreSQL database.

This migration will preserve all existing functionality while replacing LocalStorage with persistent database storage and creating a scalable architecture for future development.

---

# Current Architecture

```
Browser
│
├── HTML
├── CSS
├── JavaScript
└── LocalStorage
```

All business logic, validation, calculations and storage currently happen inside the browser.

---

# Target Architecture

```
Browser
│
├── HTML
├── CSS
└── JavaScript
        │
        ▼
REST API (Express)
        │
        ▼
Prisma ORM
        │
        ▼
PostgreSQL Database
```

Responsibilities will now be separated between the frontend and backend.

---

# Technology Stack

## Frontend

- HTML5
- CSS3
- Bootstrap 5
- JavaScript (ES6)
- Chart.js

## Backend

- Node.js
- Express.js

## Database

- PostgreSQL

## ORM

- Prisma

## Development Tools

- Git
- GitHub
- Netlify (Frontend)
- Render/Railway (Backend)

---

# Current Data

## Tank Profile

Currently stored in LocalStorage.

Fields:

- tankName
- tankLength
- tankWidth
- tankHeight
- tankVolume
- creationDate
- tankType

Future database model:

```
TankProfile
```

---

## Readings

Currently stored in LocalStorage.

Fields:

- readingId
- temperature
- ph
- ammonia
- nitrite
- nitrate
- recordedDate
- notes

Future database model:

```
Reading
```

---

## Maintenance

Currently stored in LocalStorage.

Fields:

- lastWaterChangeDate

Future database model:

```
Maintenance
```

---

# Existing Frontend Features

The following functionality already exists and must continue working after migration.

## Dashboard

- Latest reading
- Tank health
- Dashboard alerts
- Health recommendations
- Maintenance reminders

---

## Reading Management

- Add reading
- Edit reading
- Delete reading
- Search
- Sort

---

## Statistics

- Average values
- Highest values
- Lowest values
- Reading count

---

## Charts

- Historical parameter charts
- Trend analysis

---

## Tank Profile

- Create profile
- Edit profile
- Display profile

---

# Backend Responsibilities

The backend will become responsible for:

- Database communication
- CRUD operations
- Business logic
- Data persistence
- API responses

The frontend will become responsible for:

- Displaying information
- Sending requests
- Receiving responses
- User interaction

---

# Planned API Routes

## Readings

GET

```
/api/readings
```

GET

```
/api/readings/:id
```

POST

```
/api/readings
```

PUT

```
/api/readings/:id
```

DELETE

```
/api/readings/:id
```

---

## Tank Profile

GET

```
/api/tank-profile
```

POST

```
/api/tank-profile
```

PUT

```
/api/tank-profile/:id
```

---

## Maintenance

GET

```
/api/maintenance
```

POST

```
/api/maintenance
```

PUT

```
/api/maintenance/:id
```

---

# Migration Roadmap

## Phase 1

Project Planning

- Review architecture
- Design backend
- Create migration plan

---

## Phase 2

Backend Setup

- Create backend
- Install Express
- Configure server

---

## Phase 3

Database

- Install Prisma
- Configure PostgreSQL
- Create database models
- Run migrations

---

## Phase 4

REST API

Build CRUD endpoints for:

- Readings
- Tank Profile
- Maintenance

---

## Phase 5

Frontend Integration

Replace LocalStorage with API requests.

Replace:

```
loadReadings()
```

with

```
GET /api/readings
```

Replace:

```
saveReading()
```

with

```
POST /api/readings
```

Continue until all LocalStorage operations have been removed.

---

## Phase 6

Authentication (Future)

- User accounts
- Login
- Registration

---

## Phase 7

Deployment

Frontend

- Netlify

Backend

- Render or Railway

Database

- PostgreSQL

---

# Git Workflow

Main branch

```
main
```

Feature branches

```
feature/backend-setup
feature/database
feature/prisma
feature/readings-api
feature/profile-api
feature/frontend-api
feature/deployment
```

Every new feature will be developed on its own branch before being merged into main.

---

# Long-Term Goals

After the migration AquaTrack should support:

- Multiple users
- Authentication
- Cloud database
- Multiple aquariums
- Fish inventory
- Plant inventory
- Maintenance history
- Water testing history
- AI-powered recommendations
- Mobile-friendly deployment

---

# Current Status

- Frontend Complete
- GitHub Complete
- Deployment Complete
- Documentation Complete

Next milestone:

```
Backend Development
```
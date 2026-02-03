# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start dev server with hot-reload (nodemon + ts-node)
- `npm run build` — compile TypeScript to `dist/`
- `npm start` — run compiled server (`node dist/server.js`)
- `npm run db:seed` — seed the database with sample data
- `npm run db:dropdata` — reset database (removes all data and migrations)
- `npm run db:reset` — reset database and re-seed
- `npx prisma migrate dev` — create and apply migrations
- `npx prisma generate` — regenerate Prisma client after schema changes

No test framework is configured yet.

## Architecture

Express 5 + TypeScript server using a layered MVC pattern. The app runs on the port defined in `.env` (default 3000).

**`src/app.ts`** configures the Express application (middleware + routes) and exports it without calling `.listen()`. **`src/server.ts`** is the entry point that imports the app and starts listening. This separation exists so the app can be imported for testing without binding a port.

**Request flow:** incoming requests pass through middleware in order (helmet → cors → body parsers), then hit routes mounted at `/api`, and finally the global error handler.

**Adding a new route:**
1. Create a controller in `src/controllers/` with handler functions
2. Create a route file in `src/routes/` that maps HTTP methods to the controller
3. Mount the route in `src/routes/index.ts`

**Configuration:** `src/config/index.ts` loads `.env` via dotenv and exports a typed config object. All modules should read config from this module rather than `process.env` directly.

**Error handling:** The error handler in `src/middleware/errorHandler.ts` expects errors with an optional `statusCode` property. Pass errors via `next(err)` in route handlers.

## Database

Prisma ORM with SQLite (via better-sqlite3 adapter). The database file is at `dev.db` in the project root.

**Schema:** Defined in `prisma/schema.prisma`. After schema changes, run `npx prisma migrate dev` to create migrations and `npx prisma generate` to regenerate the client.

**Prisma client:** Generated to `src/generated/prisma/`. Import the singleton instance from `src/lib/prisma.ts`:

```typescript
import { prisma } from "../lib/prisma.js";
```

**Seeding:** `prisma/seed.ts` populates the database with sample data. Run via `npm run db:seed`.

```mermaid


erDiagram
  %%USER ||--o| STUDENT_PROFILE : has
  SPEAKER ||--o{ CHAPEL_SESSION : speaks 
  
  %%USER ||--o{ ATTENDANCE : records
  %%CHAPEL_SERVICE ||--o{ ATTENDANCE : includes

  USER ||--o{ FEEDBACK : gives
  CHAPEL_SESSION ||--o{ FEEDBACK : receives

  USER {
    int id PK
    string email UK "unique"
    string first_name
    string last_name
    UserType type "STUDENT | FACUTLY | STAFF | ALUMNI | GUEST"
  }

  SPEAKER {
    int id PK
    string first_name
    string last_name
    string bio
    string title "Dr., Mrs., Mr., etc."
    UserType user_type "STUDENT | FACUTLY | STAFF | ALUMNI | GUEST"
    %%CHAPEL_SESSION chapel_session_id FK
  }

%%   UserType {
%%       string value PK "STUDENT | FACUTLY | STAFF | ALUMNI | GUEST"
%%   }

  CHAPEL_SESSION {
    int id PK
    int speaker_id FK 
    string topic
    string scripture
    date date
    time end_time
    int number_standings
  }

  FEEDBACK {
    int id PK
    int stars "1 - 5"
    string response 
    int user_id FK
    int chapel_session_id FK
  }
  ```
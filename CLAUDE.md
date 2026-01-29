# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start dev server with hot-reload (nodemon + ts-node)
- `npm run build` — compile TypeScript to `dist/`
- `npm start` — run compiled server (`node dist/server.js`)

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

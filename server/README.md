# Beacon Server

Minimal backend for storing and serving incident reports for the Beacon app.

Run:

```bash
cd server
node index.js
```

By default the server listens on port `4000`.

CORS:

The server allows requests from `http://localhost:5173` by default (Vite dev server). To change this, set the `CORS_ORIGIN` environment variable before running.

API endpoints:

- `GET /api/incidents` — returns JSON array of incidents
- `POST /api/incidents` — accepts JSON body `{ title, description?, type?, lat, lng }` and returns the created incident

Example `curl`:

```bash
# list incidents
curl http://localhost:4000/api/incidents

# create an incident
curl -X POST http://localhost:4000/api/incidents \
  -H "Content-Type: application/json" \
  -d '{"title":"Suspicious activity","lat":33.7838,"lng":-118.1142}'
```

Notes:

- This server uses an in-memory store and is intended for development/prototyping only.
- For production, add persistent storage, authentication, rate-limiting, and proper API key checks.

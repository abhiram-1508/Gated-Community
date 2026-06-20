# Server layer

The implemented Express/MongoDB backend currently lives in `src/` and is wired by the root `package.json` scripts:

```text
npm run dev
npm start
```

Architecture mapping:

| Requested server layer | Current implemented folder |
|---|---|
| `server/config` | `src/config` |
| `server/controllers` | `src/controllers` |
| `server/models` | `src/models` |
| `server/routes` | `src/routes` |
| `server/middleware` | `src/middleware` |
| `server/utils` | `src/utils` |
| `server/app.js` | `src/app.js` |
| `server/server.js` | `src/server.js` |

This keeps the backend runnable while the documentation presents the clean Smart Community Management System architecture.

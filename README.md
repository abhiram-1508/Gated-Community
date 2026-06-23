# Smart Community Management System

A full role-based MERN community management application for residents, administrators, security teams, and maintenance staff.

## Included

- Modern responsive landing and authentication pages
- Resident, Admin, Security, and Maintenance dashboards
- Visitor QR/OTP passes and gate check-in/out
- Complaints with lifecycle tracking and feedback
- Invoices, payment history, and PDF receipts
- Notices, facilities, bookings, vehicles, forum, notifications, profiles, reports, and emergency alerts
- Dark mode and mobile bottom navigation
- Existing Express/MongoDB backend integration
- Architecture-aligned frontend folders for routes, layouts, Redux, services, hooks, utilities, assets, and reusable components
- Project documentation, API summary, and presentation assets

## Run

Install and start the backend from the project root:

```text
npm install
npm run dev
```

Install and start the frontend in another terminal:

```text
cd client
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Presentation assets

- UI/UX board: `docs/assets/smart-community-ui-ux-board.png`
- System architecture diagram: `docs/assets/system-architecture.svg`
- Architecture notes: `docs/ARCHITECTURE.md`
- API notes: `docs/API_Documentation.md`

## Main local structure

```text
client/      React + Vite frontend
src/         Existing Express + MongoDB backend implementation
server/      Architecture mapping note for the backend layer
docs/        Architecture, API notes, and presentation assets
uploads/     Runtime upload folder
```

Useful scripts:

```text
npm run dev              Start backend
npm run dev:client       Start frontend
npm run build:client     Build frontend
npm run install:client   Install frontend dependencies
```

## Local Git note

This folder uses `.git-work` for Git metadata because Windows blocked creation of the normal `.git` metadata during setup. Use the helper script for local Git commands:

```powershell
.\git-local.ps1 status
.\git-local.ps1 log --oneline
.\git-local.ps1 push -u origin main
```

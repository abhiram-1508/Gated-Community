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
- Presentation-safe demo fallback when the API is offline

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

## Frontend demo access

The React app can run in presentation/demo mode even when the backend is offline. On the login page, choose a role and sign in with any email/password to preview:

- Resident dashboard and resident services
- Admin analytics and management
- Security visitor verification
- Maintenance staff task tracking

Set `VITE_DEMO_MODE=false` in `client/.env` when you want strict live-backend authentication only.

## Presentation assets

- UI/UX board: `docs/assets/smart-community-ui-ux-board.png`
- System architecture diagram: `docs/assets/system-architecture.svg`
- Architecture notes: `docs/ARCHITECTURE.md`

## Local Git note

This folder uses `.git-work` for Git metadata because Windows blocked creation of the normal `.git` metadata during setup. Use the helper script for local Git commands:

```powershell
.\git-local.ps1 status
.\git-local.ps1 log --oneline
.\git-local.ps1 push -u origin main
```

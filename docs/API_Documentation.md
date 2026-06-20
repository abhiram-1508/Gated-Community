# Smart Community Management System API Documentation

Base URL:

```text
/api/v1
```

## Core modules

| Module | Example endpoints | Purpose |
|---|---|---|
| Authentication | `/auth/register`, `/auth/login`, `/auth/me` | User registration, login, refresh, and profile session |
| Residents/Admin | `/users`, `/dashboard/overview` | Resident/unit management and admin analytics |
| Visitors | `/visitors/preapprove`, `/visitors/verify`, `/visitors/:id/checkin` | QR/OTP visitor flow and gate logs |
| Complaints | `/complaints`, `/complaints/my`, `/complaints/assigned/me` | Complaint creation, assignment, timeline, feedback |
| Payments | `/invoices/my`, `/invoices/:id/pay`, `/invoices/:id/receipt` | Maintenance invoices and receipts |
| Bookings | `/facilities`, `/bookings`, `/bookings/:id/approve` | Facility listing and booking approval |
| Notices | `/announcements`, `/alerts/emergency` | Notice board and emergency broadcasts |
| Community | `/forum/posts`, `/notifications`, `/vehicles/my` | Forum, alerts, vehicles, and resident activity |

Use the included `SmartCommunity.postman_collection.json` for API testing.

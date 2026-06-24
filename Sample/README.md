# Smart Community Demo Mode

Run this when you want a demo with duplicate sample data:

```powershell
.\Sample\demo.ps1
```

The demo uses a separate MongoDB database named `smart_community_sample`.
It resets and reloads sample data each time so your real database is not changed.
If the Windows MongoDB service is not available, the demo starts a local MongoDB process using `Sample\mongo-data`.

Use the normal project launcher for real synced backend data:

```powershell
.\start-project.ps1
```

Demo password for all accounts: `password123`

- Admin: `admin.sample@smartcommunity.com`
- Resident: `resident.sample@smartcommunity.com`
- Guard: `guard.sample@smartcommunity.com`
- Staff: `staff.sample@smartcommunity.com`

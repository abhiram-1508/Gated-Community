# Smart Community Management System — Project Architecture

```text
Smart-Community-Management-System/
│
├── client/                          # React Frontend
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── logo.png
│   │   └── manifest.json
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   └── styles/
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar/
│   │   │   ├── Sidebar/
│   │   │   ├── Footer/
│   │   │   ├── Cards/
│   │   │   ├── Charts/
│   │   │   ├── Tables/
│   │   │   ├── Modals/
│   │   │   ├── Buttons/
│   │   │   ├── Forms/
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── layouts/
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── ResidentLayout.jsx
│   │   │   ├── SecurityLayout.jsx
│   │   │   └── MaintenanceLayout.jsx
│   │   │
│   │   ├── pages/
│   │   │
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   └── ForgotPassword.jsx
│   │   │   │
│   │   │   ├── Dashboard/
│   │   │   │   ├── ResidentDashboard.jsx
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── SecurityDashboard.jsx
│   │   │   │   └── MaintenanceDashboard.jsx
│   │   │   │
│   │   │   ├── Residents/
│   │   │   ├── Units/
│   │   │   ├── Visitors/
│   │   │   ├── Vehicles/
│   │   │   ├── Complaints/
│   │   │   ├── Payments/
│   │   │   ├── Bookings/
│   │   │   ├── Facilities/
│   │   │   ├── Notices/
│   │   │   ├── Forum/
│   │   │   ├── Notifications/
│   │   │   ├── Reports/
│   │   │   ├── Profile/
│   │   │   └── Settings/
│   │   │
│   │   ├── redux/
│   │   │   ├── store.js
│   │   │   ├── authSlice.js
│   │   │   ├── userSlice.js
│   │   │   ├── complaintSlice.js
│   │   │   ├── visitorSlice.js
│   │   │   ├── paymentSlice.js
│   │   │   └── notificationSlice.js
│   │   │
│   │   ├── services/
│   │   │   ├── authAPI.js
│   │   │   ├── residentAPI.js
│   │   │   ├── visitorAPI.js
│   │   │   ├── complaintAPI.js
│   │   │   ├── paymentAPI.js
│   │   │   ├── bookingAPI.js
│   │   │   └── noticeAPI.js
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useAxios.js
│   │   │   └── useSocket.js
│   │   │
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   ├── helper.js
│   │   │   ├── validator.js
│   │   │   └── formatDate.js
│   │   │
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
│
├── server/                          # Node.js + Express Backend
│   │
│   ├── config/
│   │   ├── db.js
│   │   ├── jwt.js
│   │   ├── cloudinary.js
│   │   └── mailConfig.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── residentController.js
│   │   ├── visitorController.js
│   │   ├── complaintController.js
│   │   ├── paymentController.js
│   │   ├── bookingController.js
│   │   ├── noticeController.js
│   │   ├── forumController.js
│   │   └── adminController.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Unit.js
│   │   ├── Visitor.js
│   │   ├── Vehicle.js
│   │   ├── Complaint.js
│   │   ├── Payment.js
│   │   ├── Facility.js
│   │   ├── Booking.js
│   │   ├── Notice.js
│   │   ├── ForumPost.js
│   │   └── Notification.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── residentRoutes.js
│   │   ├── visitorRoutes.js
│   │   ├── complaintRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── noticeRoutes.js
│   │   ├── forumRoutes.js
│   │   └── adminRoutes.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   ├── uploadMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── validateMiddleware.js
│   │
│   ├── services/
│   │   ├── paymentService.js
│   │   ├── smsService.js
│   │   ├── emailService.js
│   │   ├── notificationService.js
│   │   ├── qrService.js
│   │   └── socketService.js
│   │
│   ├── sockets/
│   │   └── socket.js
│   │
│   ├── uploads/
│   │   ├── profiles/
│   │   ├── complaints/
│   │   ├── receipts/
│   │   └── documents/
│   │
│   ├── utils/
│   │   ├── generateJWT.js
│   │   ├── generateOTP.js
│   │   ├── generateQR.js
│   │   └── logger.js
│   │
│   ├── app.js
│   ├── server.js
│   └── package.json
│
│
├── database/
│   ├── seed.js
│   ├── dummyData.js
│   └── migrations/
│
├── docs/
│   ├── API_Documentation.md
│   ├── ER_Diagram.png
│   ├── Architecture.png
│   └── Project_Report.pdf
│
├── .env
├── .gitignore
├── README.md
└── package.json
```

## Implementation note

The current working backend code is in `src/` and follows the same backend layers shown above: config, controllers, models, routes, middleware, jobs, utilities, uploads, and Socket.IO helpers. The architecture tree above is the clean presentation structure for the Smart Community Management System.

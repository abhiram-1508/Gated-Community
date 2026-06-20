export const demoNotices = [
  { _id: 'n1', title: 'Community town hall', body: 'Join the residents committee for the quarterly community update and open Q&A.', type: 'event', eventDate: new Date(Date.now() + 86400000).toISOString(), isPinned: true },
  { _id: 'n2', title: 'Water tank cleaning', body: 'Water supply will be paused in Blocks A and B between 10 AM and 1 PM.', type: 'notice', createdAt: new Date().toISOString() },
  { _id: 'n3', title: 'Emergency drill on Sunday', body: 'Please follow the floor marshal instructions during the scheduled safety drill.', type: 'emergency', createdAt: new Date().toISOString() },
];

export const demoVisitors = [
  { _id: 'v1', name: 'Kiran Shah', phone: '9876543210', purpose: 'Family visit', status: 'approved', validFrom: new Date().toISOString(), otp: '482913', host: { name: 'Abhiram Rao' }, unit: { blockName: 'A', unitNumber: '1204' } },
  { _id: 'v2', name: 'Swiggy Delivery', phone: '9123456780', purpose: 'Delivery', status: 'checked-in', checkInAt: new Date().toISOString(), host: { name: 'Nisha Menon' }, unit: { blockName: 'C', unitNumber: '305' } },
  { _id: 'v3', name: 'Rohit Verma', phone: '9988776655', purpose: 'Guest', status: 'checked-out', checkInAt: new Date(Date.now() - 7200000).toISOString(), checkOutAt: new Date(Date.now() - 3600000).toISOString(), host: { name: 'Abhiram Rao' }, unit: { blockName: 'A', unitNumber: '1204' } },
];

export const demoComplaints = [
  { _id: 'CMP-1042', category: 'plumbing', description: 'Kitchen sink tap has been leaking since yesterday.', priority: 'high', status: 'in-progress', createdAt: new Date(Date.now() - 86400000).toISOString(), assignedTo: { name: 'Manoj Reddy' }, raisedBy: { name: 'Abhiram Rao' }, unit: { blockName: 'A', unitNumber: '1204' } },
  { _id: 'CMP-1036', category: 'electrical', description: 'Corridor light outside the apartment is flickering.', priority: 'medium', status: 'assigned', createdAt: new Date(Date.now() - 172800000).toISOString(), assignedTo: { name: 'Suresh P' }, raisedBy: { name: 'Anita Rao' }, unit: { blockName: 'B', unitNumber: '804' } },
  { _id: 'CMP-1021', category: 'cleaning', description: 'Basement parking bay requires cleaning.', priority: 'low', status: 'resolved', createdAt: new Date(Date.now() - 604800000).toISOString(), assignedTo: { name: 'Manoj Reddy' }, raisedBy: { name: 'Vikram Singh' }, unit: { blockName: 'D', unitNumber: '1102' } },
];

export const demoFacilities = [
  { _id: 'f1', name: 'Skyline Clubhouse', type: 'clubhouse', description: 'A bright venue for celebrations and resident gatherings.', capacity: 100, openHours: { start: '08:00', end: '22:00' }, amenities: ['AV system', 'Kitchen', 'AC'] },
  { _id: 'f2', name: 'Badminton Court', type: 'tennis-court', description: 'Indoor synthetic court with evening slots.', capacity: 4, openHours: { start: '06:00', end: '21:00' }, amenities: ['Equipment', 'Changing room'] },
  { _id: 'f3', name: 'Fitness Studio', type: 'gym', description: 'Cardio, strength and yoga zones.', capacity: 30, openHours: { start: '05:30', end: '23:00' }, amenities: ['Trainer', 'Showers'] },
];

export const demoInvoices = [
  { _id: 'i1', invoiceNumber: 'INV-202606-1204', totalAmount: 3500, paidAmount: 0, dueDate: new Date(Date.now() + 86400000).toISOString(), status: 'sent', period: { month: 6, year: 2026 } },
  { _id: 'i2', invoiceNumber: 'INV-202605-1204', totalAmount: 3500, paidAmount: 3500, dueDate: '2026-05-10', paidAt: '2026-05-08', status: 'paid', period: { month: 5, year: 2026 } },
  { _id: 'i3', invoiceNumber: 'INV-202604-1204', totalAmount: 3400, paidAmount: 3400, dueDate: '2026-04-10', paidAt: '2026-04-09', status: 'paid', period: { month: 4, year: 2026 } },
];

export const demoNotifications = [
  { _id: 'nt1', type: 'invoice_overdue', title: 'Maintenance due tomorrow', message: 'Your June maintenance invoice of ₹3,500 is due tomorrow.', isRead: false, createdAt: new Date().toISOString() },
  { _id: 'nt2', type: 'visitor_arrived', title: 'Visitor arrived', message: 'Kiran Shah is waiting at Gate 1.', isRead: false, createdAt: new Date(Date.now() - 1800000).toISOString() },
  { _id: 'nt3', type: 'complaint_resolved', title: 'Complaint resolved', message: 'Your parking-area cleaning request has been completed.', isRead: true, createdAt: new Date(Date.now() - 86400000).toISOString() },
  { _id: 'nt4', type: 'booking_status', title: 'Booking approved', message: 'Your clubhouse booking for Saturday has been approved.', isRead: true, createdAt: new Date(Date.now() - 172800000).toISOString() },
];

export const demoForum = [
  { _id: 'p1', title: 'Weekend organic market', body: 'A local farmers collective will set up near the clubhouse this Sunday from 8 AM.', category: 'events', author: { name: 'Meera Joshi' }, likes: ['1','2','3','4','5','6','7','8','9','10','11','12'], comments: [], createdAt: new Date(Date.now() - 7200000).toISOString() },
  { _id: 'p2', title: 'Looking for a piano tutor', body: 'Any recommendations for a patient beginner-friendly tutor who can visit the community?', category: 'help', author: { name: 'Arjun Nair' }, likes: ['1','2','3','4','5'], comments: [], createdAt: new Date(Date.now() - 86400000).toISOString() },
  { _id: 'p3', title: 'Study table for sale', body: 'Solid wood study table in excellent condition. Photos available on request.', category: 'buy-sell', author: { name: 'Divya Rao' }, likes: ['1','2'], comments: [], createdAt: new Date(Date.now() - 172800000).toISOString() },
];

export const demoVehicles = [
  { _id: 'car1', vehicleNumber: 'TS 09 EZ 4021', type: 'car', make: 'Hyundai', model: 'Creta', color: 'White', parkingSlot: 'A2-118', isActive: true },
  { _id: 'bike1', vehicleNumber: 'TS 10 FH 8832', type: 'motorcycle', make: 'Royal Enfield', model: 'Classic 350', color: 'Black', parkingSlot: 'B1-44', isActive: true },
];

export const demoBookings = [
  { _id: 'b1', facility: { name: 'Skyline Clubhouse' }, slotStart: new Date(Date.now() + 259200000).toISOString(), slotEnd: new Date(Date.now() + 266400000).toISOString(), status: 'approved', purpose: 'Birthday celebration' },
  { _id: 'b2', facility: { name: 'Badminton Court' }, slotStart: new Date(Date.now() + 86400000).toISOString(), slotEnd: new Date(Date.now() + 90000000).toISOString(), status: 'pending', purpose: 'Practice' },
];

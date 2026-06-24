process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/smart_community_sample';
process.env.JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'sample_access_secret_for_demo_only';
process.env.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'sample_refresh_secret_for_demo_only';

const mongoose = require('mongoose');

const User = require('../src/models/User');
const Unit = require('../src/models/Unit');
const ResidentProfile = require('../src/models/ResidentProfile');
const Facility = require('../src/models/Facility');
const Announcement = require('../src/models/Announcement');
const Invoice = require('../src/models/Invoice');
const Payment = require('../src/models/Payment');
const Complaint = require('../src/models/Complaint');
const Vehicle = require('../src/models/Vehicle');
const Visitor = require('../src/models/Visitor');
const Notification = require('../src/models/Notification');
const Booking = require('../src/models/Booking');
const ForumPost = require('../src/models/ForumPost');
const AuditLog = require('../src/models/AuditLog');

const addDays = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

const createUser = async ({ name, email, phone, role }) => User.create({
  name,
  email,
  phone,
  role,
  status: 'active',
  passwordHash: await User.hashPassword('password123'),
});

async function resetSampleData() {
  await Promise.all([
    AuditLog.deleteMany({}),
    ForumPost.deleteMany({}),
    Booking.deleteMany({}),
    Notification.deleteMany({}),
    Visitor.deleteMany({}),
    Vehicle.deleteMany({}),
    Complaint.deleteMany({}),
    Payment.deleteMany({}),
    Invoice.deleteMany({}),
    Announcement.deleteMany({}),
    Facility.deleteMany({}),
    ResidentProfile.deleteMany({}),
    Unit.deleteMany({}),
    User.deleteMany({}),
  ]);
}

async function seed() {
  await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
  });
  await resetSampleData();

  const [admin, resident, secondResident, guard, staff, maintenance] = await Promise.all([
    createUser({
      name: 'Priya Sharma',
      email: 'admin.sample@smartcommunity.com',
      phone: '9000010001',
      role: 'Admin',
    }),
    createUser({
      name: 'Abhiram Rao',
      email: 'resident.sample@smartcommunity.com',
      phone: '9000010004',
      role: 'Resident',
    }),
    createUser({
      name: 'Nisha Iyer',
      email: 'nisha.sample@smartcommunity.com',
      phone: '9000010005',
      role: 'Resident',
    }),
    createUser({
      name: 'Ravi Kumar',
      email: 'guard.sample@smartcommunity.com',
      phone: '9000010002',
      role: 'Guard',
    }),
    createUser({
      name: 'Manoj Reddy',
      email: 'staff.sample@smartcommunity.com',
      phone: '9000010003',
      role: 'Staff',
    }),
    createUser({
      name: 'Suresh Naik',
      email: 'maintenance.sample@smartcommunity.com',
      phone: '9000010006',
      role: 'Staff',
    }),
  ]);

  const [unitA, unitB, unitC, unitD] = await Unit.create([
    {
      blockName: 'Skyline Apartments',
      unitNumber: 'A1289',
      floor: 12,
      type: 'apartment',
      owner: resident._id,
      occupancyStatus: 'owner-occupied',
      area: 1450,
      bedrooms: 3,
    },
    {
      blockName: 'Skyline Apartments',
      unitNumber: 'B1203',
      floor: 12,
      type: 'apartment',
      owner: secondResident._id,
      occupancyStatus: 'tenant-occupied',
      area: 1180,
      bedrooms: 2,
    },
    {
      blockName: 'Palm Villas',
      unitNumber: 'V07',
      floor: 0,
      type: 'villa',
      occupancyStatus: 'vacant',
      area: 2400,
      bedrooms: 4,
    },
    {
      blockName: 'Skyline Apartments',
      unitNumber: 'C0305',
      floor: 3,
      type: 'flat',
      occupancyStatus: 'vacant',
      area: 980,
      bedrooms: 2,
    },
  ]);

  await ResidentProfile.create([
    {
      user: resident._id,
      unit: unitA._id,
      familyMembers: [
        { name: 'Meera Rao', relation: 'Spouse', age: 34 },
        { name: 'Aarav Rao', relation: 'Son', age: 8 },
      ],
      emergencyContact: { name: 'Kiran Rao', phone: '9000022222', relation: 'Brother' },
      moveInDate: addDays(-420),
      notes: 'Owner resident. Uses clubhouse and visitor pre-approval often.',
    },
    {
      user: secondResident._id,
      unit: unitB._id,
      tenants: [
        {
          name: 'Nisha Iyer',
          phone: '9000010005',
          email: 'nisha.sample@smartcommunity.com',
          leaseStart: addDays(-90),
          leaseEnd: addDays(275),
        },
      ],
      emergencyContact: { name: 'Arun Iyer', phone: '9000033333', relation: 'Father' },
      moveInDate: addDays(-90),
      notes: 'Tenant profile used for payments and service requests.',
    },
  ]);

  const [clubhouse, gym, court, hall] = await Facility.create([
    {
      name: 'Clubhouse Lounge',
      type: 'clubhouse',
      description: 'Community lounge for resident gatherings and meetings.',
      capacity: 60,
      openHours: { start: '08:00', end: '22:00' },
      amenities: ['Projector', 'Coffee counter', 'Wi-Fi'],
      bookingRules: { maxSlotHours: 3, advanceBookingDays: 14, cancellationHours: 12, requiresApproval: true },
    },
    {
      name: 'Fitness Studio',
      type: 'gym',
      description: 'Cardio and strength area for residents.',
      capacity: 25,
      openHours: { start: '05:30', end: '23:00' },
      amenities: ['Treadmills', 'Free weights', 'Trainer desk'],
      bookingRules: { maxSlotHours: 1, advanceBookingDays: 3, cancellationHours: 2, requiresApproval: false },
    },
    {
      name: 'Badminton Court',
      type: 'tennis-court',
      description: 'Indoor court available in hourly slots.',
      capacity: 8,
      openHours: { start: '06:00', end: '21:00' },
      amenities: ['Lighting', 'Score board'],
      bookingRules: { maxSlotHours: 2, advanceBookingDays: 7, cancellationHours: 6, requiresApproval: true },
    },
    {
      name: 'Celebration Hall',
      type: 'party-hall',
      description: 'Larger event hall for birthdays and resident functions.',
      capacity: 120,
      openHours: { start: '09:00', end: '23:00' },
      amenities: ['Stage', 'Dining area', 'Sound system'],
      bookingRules: { maxSlotHours: 5, advanceBookingDays: 30, cancellationHours: 24, requiresApproval: true },
    },
  ]);

  await Announcement.create([
    {
      title: 'Water supply maintenance on Saturday',
      body: 'Water supply will be paused from 10:00 AM to 1:00 PM for tank cleaning.',
      type: 'notice',
      audience: 'all',
      postedBy: admin._id,
      expiresAt: addDays(7),
      isPinned: true,
      viewCount: 32,
    },
    {
      title: 'Weekend community breakfast',
      body: 'Join neighbors at the clubhouse lawn this Sunday morning.',
      type: 'event',
      audience: 'residents',
      postedBy: admin._id,
      eventDate: addDays(5),
      expiresAt: addDays(6),
      viewCount: 18,
    },
    {
      title: 'Gate 2 temporarily closed',
      body: 'Security team will redirect incoming visitors through Gate 1 until repairs are complete.',
      type: 'emergency',
      audience: 'all',
      postedBy: admin._id,
      expiresAt: addDays(2),
      isPinned: true,
      viewCount: 51,
    },
  ]);

  const [currentInvoice, paidInvoice, overdueInvoice] = await Invoice.create([
    {
      resident: resident._id,
      unit: unitA._id,
      invoiceNumber: 'SAMPLE-INV-202606-A1289',
      period: { month: 6, year: 2026 },
      lineItems: [
        { description: 'Monthly maintenance', amount: 4200, quantity: 1 },
        { description: 'Sinking fund', amount: 500, quantity: 1 },
      ],
      amount: 4700,
      tax: 235,
      totalAmount: 4935,
      dueDate: addDays(10),
      status: 'sent',
      notes: 'June maintenance invoice.',
    },
    {
      resident: resident._id,
      unit: unitA._id,
      invoiceNumber: 'SAMPLE-INV-202605-A1289',
      period: { month: 5, year: 2026 },
      lineItems: [{ description: 'Monthly maintenance', amount: 4200, quantity: 1 }],
      amount: 4200,
      tax: 210,
      totalAmount: 4410,
      dueDate: addDays(-20),
      status: 'paid',
      paidAmount: 4410,
      paidAt: addDays(-16),
      notes: 'Paid by UPI.',
    },
    {
      resident: secondResident._id,
      unit: unitB._id,
      invoiceNumber: 'SAMPLE-INV-202606-B1203',
      period: { month: 6, year: 2026 },
      lineItems: [
        { description: 'Monthly maintenance', amount: 3600, quantity: 1 },
        { description: 'Late fee', amount: 250, quantity: 1 },
      ],
      amount: 3850,
      tax: 193,
      totalAmount: 4043,
      dueDate: addDays(-3),
      status: 'overdue',
      remindersSent: 1,
      lastReminderAt: addDays(-1),
    },
  ]);

  await Payment.create([
    {
      invoice: paidInvoice._id,
      paidBy: resident._id,
      unit: unitA._id,
      amount: 4410,
      method: 'upi',
      reference: 'UPI-SAMPLE-4410',
      receiptNumber: 'SAMPLE-RCP-202605-A1289',
      status: 'completed',
      paidAt: addDays(-16),
      recordedBy: admin._id,
      notes: 'Sample completed payment.',
    },
    {
      invoice: currentInvoice._id,
      paidBy: resident._id,
      unit: unitA._id,
      amount: 4935,
      method: 'online',
      reference: 'ONLINE-SAMPLE-PENDING',
      receiptNumber: 'SAMPLE-RCP-202606-A1289',
      status: 'pending',
      paidAt: addDays(-1),
      recordedBy: admin._id,
      notes: 'Pending gateway confirmation for demo.',
    },
  ]);

  const [complaintOne, complaintTwo] = await Complaint.create([
    {
      raisedBy: resident._id,
      unit: unitA._id,
      category: 'plumbing',
      description: 'Kitchen sink tap is leaking continuously.',
      priority: 'high',
      status: 'in-progress',
      assignedTo: staff._id,
      assignedAt: addDays(-1),
      internalComments: [{ author: staff._id, message: 'Visited the unit and ordered washer replacement.' }],
      statusHistory: [
        { status: 'open', changedBy: resident._id, note: 'Complaint raised by resident.' },
        { status: 'assigned', changedBy: admin._id, note: 'Assigned to maintenance staff.' },
        { status: 'in-progress', changedBy: staff._id, note: 'Work started.' },
      ],
    },
    {
      raisedBy: secondResident._id,
      unit: unitB._id,
      category: 'parking',
      description: 'Unknown vehicle parked in reserved slot B-42.',
      priority: 'medium',
      status: 'open',
      statusHistory: [{ status: 'open', changedBy: secondResident._id, note: 'Awaiting security verification.' }],
    },
    {
      raisedBy: resident._id,
      unit: unitA._id,
      category: 'electrical',
      description: 'Corridor light outside A1289 was flickering.',
      priority: 'low',
      status: 'resolved',
      assignedTo: maintenance._id,
      assignedAt: addDays(-7),
      resolvedAt: addDays(-5),
      rating: 5,
      feedback: 'Resolved quickly.',
      statusHistory: [{ status: 'resolved', changedBy: maintenance._id, note: 'Light replaced.' }],
    },
  ]);

  await Vehicle.create([
    {
      owner: resident._id,
      unit: unitA._id,
      vehicleNumber: 'KA01AB1289',
      type: 'car',
      make: 'Hyundai',
      model: 'Creta',
      color: 'White',
      parkingSlot: 'A-41',
    },
    {
      owner: secondResident._id,
      unit: unitB._id,
      vehicleNumber: 'KA05NS1203',
      type: 'scooter',
      make: 'Ather',
      model: '450X',
      color: 'Grey',
      parkingSlot: 'B-42',
    },
  ]);

  const [visitorOne, visitorTwo] = await Visitor.create([
    {
      name: 'Deepak Verma',
      phone: '9880012345',
      purpose: 'Family visit',
      host: resident._id,
      unit: unitA._id,
      status: 'approved',
      entryType: 'pre-approved',
      otp: '128904',
      otpExpiresAt: addDays(1),
      validFrom: addDays(0),
      validUntil: addDays(1),
      approvedBy: guard._id,
      vehicleNumber: 'KA03DV4455',
      notes: 'Expected after 6 PM.',
    },
    {
      name: 'QuickFix Plumbing',
      phone: '9770097700',
      purpose: 'Complaint service visit',
      host: resident._id,
      unit: unitA._id,
      status: 'checked-in',
      entryType: 'walk-in',
      checkInAt: addDays(0),
      approvedBy: guard._id,
      notes: 'Linked to kitchen tap complaint.',
    },
    {
      name: 'Courier Partner',
      phone: '9660066000',
      purpose: 'Package delivery',
      host: secondResident._id,
      unit: unitB._id,
      status: 'checked-out',
      entryType: 'walk-in',
      checkInAt: addDays(-1),
      checkOutAt: addDays(-1),
      approvedBy: guard._id,
    },
  ]);

  await Booking.create([
    {
      facility: clubhouse._id,
      bookedBy: resident._id,
      unit: unitA._id,
      slotStart: addDays(3),
      slotEnd: addDays(3),
      status: 'approved',
      approvedBy: admin._id,
      approvedAt: addDays(-1),
      attendees: 18,
      purpose: 'Birthday gathering',
      specialRequirements: 'Need projector and extra chairs.',
    },
    {
      facility: court._id,
      bookedBy: secondResident._id,
      unit: unitB._id,
      slotStart: addDays(1),
      slotEnd: addDays(1),
      status: 'pending',
      attendees: 4,
      purpose: 'Evening badminton practice',
    },
    {
      facility: gym._id,
      bookedBy: resident._id,
      unit: unitA._id,
      slotStart: addDays(-2),
      slotEnd: addDays(-2),
      status: 'completed',
      attendees: 1,
      purpose: 'Morning workout',
    },
    {
      facility: hall._id,
      bookedBy: secondResident._id,
      unit: unitB._id,
      slotStart: addDays(8),
      slotEnd: addDays(8),
      status: 'rejected',
      rejectedReason: 'Hall is already reserved for association meeting.',
      attendees: 80,
      purpose: 'Family function',
    },
  ]);

  await ForumPost.create([
    {
      author: resident._id,
      title: 'Looking for carpool to Manyata Tech Park',
      body: 'I leave around 8:30 AM on weekdays. Happy to coordinate with nearby residents.',
      category: 'help',
      comments: [{ author: secondResident._id, body: 'I am interested on Tuesdays and Thursdays.' }],
      likes: [secondResident._id],
      isPinned: false,
    },
    {
      author: admin._id,
      title: 'Suggestions for monsoon preparedness',
      body: 'Please share drainage or leak-prone spots so maintenance can inspect them this week.',
      category: 'feedback',
      comments: [{ author: staff._id, body: 'Basement ramp inspection is scheduled tomorrow.' }],
      likes: [resident._id, secondResident._id],
      isPinned: true,
    },
  ]);

  await Notification.create([
    {
      recipient: resident._id,
      type: 'visitor_approved',
      title: 'Visitor approved',
      message: 'Deepak Verma has been approved for A1289.',
      relatedEntity: { model: 'Visitor', id: visitorOne._id },
      isRead: false,
    },
    {
      recipient: resident._id,
      type: 'complaint_assigned',
      title: 'Complaint assigned',
      message: 'Your plumbing complaint has been assigned to Manoj Reddy.',
      relatedEntity: { model: 'Complaint', id: complaintOne._id },
      isRead: false,
    },
    {
      recipient: admin._id,
      type: 'invoice_overdue',
      title: 'Invoice overdue',
      message: 'B1203 has one overdue maintenance invoice.',
      relatedEntity: { model: 'Invoice', id: overdueInvoice._id },
      isRead: false,
    },
    {
      recipient: guard._id,
      type: 'visitor_arrived',
      title: 'Service visitor checked in',
      message: 'QuickFix Plumbing checked in for A1289.',
      relatedEntity: { model: 'Visitor', id: visitorTwo._id },
      isRead: true,
      readAt: addDays(0),
    },
    {
      recipient: staff._id,
      type: 'complaint_assigned',
      title: 'New maintenance task',
      message: 'Kitchen sink leak at A1289 is assigned to you.',
      relatedEntity: { model: 'Complaint', id: complaintOne._id },
      isRead: false,
    },
    {
      recipient: secondResident._id,
      type: 'invoice_overdue',
      title: 'Payment reminder',
      message: 'Your June maintenance invoice is overdue.',
      relatedEntity: { model: 'Invoice', id: overdueInvoice._id },
      isRead: false,
    },
  ]);

  await AuditLog.create([
    {
      actor: admin._id,
      actorEmail: admin.email,
      action: 'seed.sample.created',
      entity: 'Sample',
      changes: { database: process.env.MONGO_URI, mode: 'demo' },
      timestamp: new Date(),
    },
    {
      actor: admin._id,
      actorEmail: admin.email,
      action: 'complaint.assigned',
      entity: 'Complaint',
      entityId: complaintOne._id,
      changes: { assignedTo: staff.email, status: 'in-progress' },
      timestamp: addDays(-1),
    },
    {
      actor: guard._id,
      actorEmail: guard.email,
      action: 'visitor.checked_in',
      entity: 'Visitor',
      entityId: visitorTwo._id,
      changes: { status: 'checked-in', unit: 'A1289' },
      timestamp: new Date(),
    },
  ]);

  console.log('Sample demo database seeded successfully.');
  console.log('Demo logins:');
  console.log('  Admin:    admin.sample@smartcommunity.com / password123');
  console.log('  Resident: resident.sample@smartcommunity.com / password123');
  console.log('  Guard:    guard.sample@smartcommunity.com / password123');
  console.log('  Staff:    staff.sample@smartcommunity.com / password123');
}

seed()
  .catch((error) => {
    console.error('Sample seed failed:', error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });

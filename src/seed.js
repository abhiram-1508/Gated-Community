require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');
const Unit = require('./models/Unit');
const ResidentProfile = require('./models/ResidentProfile');
const Facility = require('./models/Facility');
const Announcement = require('./models/Announcement');
const Invoice = require('./models/Invoice');
const Complaint = require('./models/Complaint');
const Vehicle = require('./models/Vehicle');
const Visitor = require('./models/Visitor');
const Notification = require('./models/Notification');

const password = 'password123';

const users = [
  { name: 'Priya Sharma', email: 'admin@smartcommunity.com', phone: '9000010000', role: 'Admin' },
  { name: 'Abhiram Rao', email: 'resident@smartcommunity.com', phone: '9000010001', role: 'Resident' },
  { name: 'Ravi Kumar', email: 'guard@smartcommunity.com', phone: '9000010002', role: 'Guard' },
  { name: 'Manoj Reddy', email: 'staff@smartcommunity.com', phone: '9000010003', role: 'Staff' },
];

async function upsertUser(data) {
  const passwordHash = await User.hashPassword(password);
  return User.findOneAndUpdate(
    { email: data.email },
    { ...data, passwordHash, status: 'active', isDeleted: false },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );
}

async function run() {
  await connectDB();

  const [admin, resident, guard, staff] = await Promise.all(users.map(upsertUser));

  const unit = await Unit.findOneAndUpdate(
    { blockName: 'A', unitNumber: '1204' },
    {
      blockName: 'A',
      unitNumber: '1204',
      floor: 12,
      type: 'apartment',
      owner: resident._id,
      occupancyStatus: 'owner-occupied',
      area: 1480,
      bedrooms: 3,
      isActive: true,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  await ResidentProfile.findOneAndUpdate(
    { user: resident._id },
    {
      user: resident._id,
      unit: unit._id,
      familyMembers: [
        { name: 'Ananya Rao', relation: 'Spouse' },
        { name: 'Aarav Rao', relation: 'Son', age: 10 },
      ],
      emergencyContact: { name: 'Ananya Rao', phone: '9988776655', relation: 'Family' },
      moveInDate: new Date('2024-04-01'),
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  const clubhouse = await Facility.findOneAndUpdate(
    { name: 'Skyline Clubhouse' },
    {
      name: 'Skyline Clubhouse',
      type: 'clubhouse',
      description: 'A bright venue for celebrations and resident gatherings.',
      capacity: 100,
      openHours: { start: '08:00', end: '22:00' },
      amenities: ['AV system', 'Kitchen', 'AC'],
      isActive: true,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  await Facility.findOneAndUpdate(
    { name: 'Fitness Studio' },
    {
      name: 'Fitness Studio',
      type: 'gym',
      description: 'Cardio, strength and yoga zones.',
      capacity: 30,
      openHours: { start: '05:30', end: '23:00' },
      amenities: ['Trainer', 'Showers'],
      isActive: true,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  await Announcement.findOneAndUpdate(
    { title: 'Community town hall' },
    {
      title: 'Community town hall',
      body: 'Join the residents committee for the quarterly community update and open Q&A.',
      type: 'event',
      audience: 'all',
      postedBy: admin._id,
      eventDate: new Date(Date.now() + 86400000),
      isPinned: true,
      isActive: true,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  const invoice = await Invoice.findOneAndUpdate(
    { resident: resident._id, unit: unit._id, 'period.month': 6, 'period.year': 2026 },
    {
      resident: resident._id,
      unit: unit._id,
      period: { month: 6, year: 2026 },
      lineItems: [{ description: 'Monthly maintenance', amount: 3500, quantity: 1 }],
      amount: 3500,
      tax: 0,
      totalAmount: 3500,
      paidAmount: 0,
      dueDate: new Date('2026-06-30'),
      status: 'sent',
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  await Complaint.findOneAndUpdate(
    { raisedBy: resident._id, description: 'Kitchen sink tap has been leaking since yesterday.' },
    {
      raisedBy: resident._id,
      unit: unit._id,
      category: 'plumbing',
      description: 'Kitchen sink tap has been leaking since yesterday.',
      priority: 'high',
      status: 'in-progress',
      assignedTo: staff._id,
      assignedAt: new Date(),
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  await Vehicle.findOneAndUpdate(
    { vehicleNumber: 'TS 09 EZ 4021' },
    {
      vehicleNumber: 'TS 09 EZ 4021',
      owner: resident._id,
      unit: unit._id,
      type: 'car',
      make: 'Hyundai',
      model: 'Creta',
      color: 'White',
      parkingSlot: 'A2-118',
      isActive: true,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  await Visitor.findOneAndUpdate(
    { phone: '9876543210', host: resident._id },
    {
      name: 'Kiran Shah',
      phone: '9876543210',
      purpose: 'Family visit',
      host: resident._id,
      unit: unit._id,
      status: 'approved',
      entryType: 'pre-approved',
      otp: '482913',
      otpExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  await Notification.findOneAndUpdate(
    { recipient: resident._id, title: 'New Invoice' },
    {
      recipient: resident._id,
      type: 'invoice_generated',
      title: 'New Invoice',
      message: `Maintenance invoice ${invoice.invoiceNumber} has been generated`,
      relatedEntity: { model: 'Invoice', id: invoice._id },
      isRead: false,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  console.log('Seed complete. Login users:');
  users.forEach((user) => console.log(`${user.role}: ${user.email} / ${password}`));
}

run()
  .then(() => mongoose.disconnect())
  .catch((error) => {
    console.error(error);
    mongoose.disconnect().finally(() => process.exit(1));
  });

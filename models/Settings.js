import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  companyName: { type: String, default: 'ZOHO IT Solutions' },
  address: { type: String, default: 'ZOHO IT Solutions Campus, Hyderabad, Telangana – 500001' },
  phone: { type: String, default: '+91 93601 98417' },
  email: { type: String, default: 'info@zohoitsolutions.com' },
  workingHours: { type: String, default: 'Mon-Sat: 9:30 AM-6:30 PM' },
});

const Settings = mongoose.model('Settings', settingsSchema);
export default Settings;

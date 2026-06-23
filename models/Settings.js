import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  companyName: { type: String, default: 'ZOHO IT Solutions' },
  addresses: { 
    type: [String], 
    default: [
      'Awfis Spero Primus, 1-2 Floor, Primus Building, Door No. SP – 7A, Guindy Industrial Estate, SIDCO Industrial Estate, Chennai, Tamil Nadu 600032',
      'Olympia Cyberspace, No. 21/22, Alandur Road, Arulayiammanpet 2nd Street, SIDCO Industrial Estate, Guindy, Chennai, Tamil Nadu - 600032'
    ] 
  },
  phone: { type: String, default: '+91 93601 98417' },
  email: { type: String, default: 'info@zohoitsolutions.com' },
  workingHours: { type: String, default: 'Mon-Sat: 9:30 AM-6:30 PM' },
});

const Settings = mongoose.model('Settings', settingsSchema);
export default Settings;

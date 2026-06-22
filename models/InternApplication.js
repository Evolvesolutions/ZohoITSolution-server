import mongoose from 'mongoose';

const internApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  college: { type: String },
  domain: { type: String },
  status: { 
    type: String, 
    enum: ['Pending', 'Reviewed', 'Accepted', 'Rejected'],
    default: 'Pending'
  },
  submittedAt: { type: Date, default: Date.now }
});

const InternApplication = mongoose.model('InternApplication', internApplicationSchema);

export default InternApplication;

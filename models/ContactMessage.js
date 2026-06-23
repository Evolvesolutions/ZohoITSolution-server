import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  course: { type: String },
  message: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Unread', 'Read'],
    default: 'Unread'
  },
  createdAt: { type: Date, default: Date.now }
});

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);

export default ContactMessage;

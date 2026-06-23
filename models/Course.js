import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number, default: null },
  createdAt: { type: Date, default: Date.now }
});

const Course = mongoose.model('Course', courseSchema);

export default Course;

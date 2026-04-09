const mongoose = require('mongoose');
const Counter = require('./Counter');

const studentSchema = new mongoose.Schema(
  {
    admissionNumber: {
      type: String,
      unique: true,
      index: true
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    course: {
      type: String,
      required: [true, 'Course is required'],
      enum: {
        values: ['B.Tech', 'B.Sc', 'B.Com', 'BCA', 'BBA', 'MBA', 'MCA', 'M.Tech', 'M.Sc', 'Other'],
        message: '{VALUE} is not a valid course'
      }
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
      min: [1, 'Year must be at least 1'],
      max: [6, 'Year cannot exceed 6']
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email']
    },
    mobileNumber: {
      type: String,
      required: [true, 'Mobile number is required'],
      match: [/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number']
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: {
        values: ['Male', 'Female', 'Other'],
        message: '{VALUE} is not a valid gender'
      }
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true,
      maxlength: [500, 'Address cannot exceed 500 characters']
    },
    photo: {
      type: String,
      default: ''
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

studentSchema.index({ name: 'text', email: 'text', admissionNumber: 'text' });

studentSchema.pre('save', async function (next) {
  if (this.isNew) {
    const seq = await Counter.getNextSequence('admissionNumber');
    const year = new Date().getFullYear();
    const padded = String(seq).padStart(5, '0');
    this.admissionNumber = `ADM-${year}-${padded}`;
  }
  next();
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;

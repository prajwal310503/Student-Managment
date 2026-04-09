const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const upload = require('../middleware/upload');
const {
  getAllStudents,
  getStats,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} = require('../controllers/studentController');

const studentValidators = [
  body('name').notEmpty().withMessage('Name is required').isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters').trim(),
  body('course').notEmpty().withMessage('Course is required').isIn(['B.Tech','B.Sc','B.Com','BCA','BBA','MBA','MCA','M.Tech','M.Sc','Other']).withMessage('Invalid course'),
  body('year').notEmpty().withMessage('Year is required').isInt({ min: 1, max: 6 }).withMessage('Year must be between 1 and 6'),
  body('dateOfBirth').notEmpty().withMessage('Date of birth is required').isISO8601().withMessage('Invalid date format'),
  body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email').normalizeEmail(),
  body('mobileNumber').notEmpty().withMessage('Mobile number is required').matches(/^[6-9]\d{9}$/).withMessage('Enter a valid 10-digit Indian mobile number'),
  body('gender').notEmpty().withMessage('Gender is required').isIn(['Male','Female','Other']).withMessage('Invalid gender'),
  body('address').notEmpty().withMessage('Address is required').isLength({ max: 500 }).withMessage('Address cannot exceed 500 characters').trim()
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg }))
    });
  }
  next();
};

// IMPORTANT: /stats must be before /:id
router.get('/stats', getStats);
router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.post('/', upload, studentValidators, validate, createStudent);
router.put('/:id', upload, studentValidators, validate, updateStudent);
router.delete('/:id', deleteStudent);

module.exports = router;

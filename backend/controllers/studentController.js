const Student = require('../models/Student');
const { deleteFile } = require('../utils/fileHelper');

// GET /api/students
const getAllStudents = async (req, res) => {
  const { search, course, year, gender, status, sortBy = 'createdAt', sortOrder = 'desc', page = 1, limit = 10 } = req.query;

  const query = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { admissionNumber: { $regex: search, $options: 'i' } }
    ];
  }
  if (course) query.course = course;
  if (year) query.year = Number(year);
  if (gender) query.gender = gender;
  if (status === 'active') query.isActive = true;
  if (status === 'inactive') query.isActive = false;

  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.max(1, Math.min(100, parseInt(limit)));
  const skip = (pageNum - 1) * limitNum;

  const allowedSort = ['createdAt', 'name', 'year'];
  const sortField = allowedSort.includes(sortBy) ? sortBy : 'createdAt';
  const sortDir = sortOrder === 'asc' ? 1 : -1;

  const [students, total] = await Promise.all([
    Student.find(query).sort({ [sortField]: sortDir }).skip(skip).limit(limitNum),
    Student.countDocuments(query)
  ]);

  res.json({
    success: true,
    count: students.length,
    total,
    totalPages: Math.ceil(total / limitNum),
    currentPage: pageNum,
    data: students
  });
};

// GET /api/students/stats
const getStats = async (req, res) => {
  const [totalStudents, activeStudents, courseWise, genderWise, yearWise] = await Promise.all([
    Student.countDocuments(),
    Student.countDocuments({ isActive: true }),
    Student.aggregate([{ $group: { _id: '$course', count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
    Student.aggregate([{ $group: { _id: '$gender', count: { $sum: 1 } } }]),
    Student.aggregate([{ $group: { _id: '$year', count: { $sum: 1 } } }, { $sort: { _id: 1 } }])
  ]);

  res.json({
    success: true,
    data: { totalStudents, activeStudents, courseWise, genderWise, yearWise }
  });
};

// GET /api/students/:id
const getStudentById = async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    return res.status(404).json({ success: false, message: 'Student not found' });
  }
  res.json({ success: true, data: student });
};

// POST /api/students
const createStudent = async (req, res) => {
  const data = { ...req.body };
  if (req.file) {
    data.photo = `/uploads/${req.file.filename}`;
  }
  delete data.admissionNumber;
  if ('isActive' in data) data.isActive = data.isActive === 'true' || data.isActive === true;

  const student = await Student.create(data);
  res.status(201).json({ success: true, message: 'Student added successfully', data: student });
};

// PUT /api/students/:id
const updateStudent = async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    return res.status(404).json({ success: false, message: 'Student not found' });
  }

  const updates = { ...req.body };
  delete updates.admissionNumber;
  if ('isActive' in updates) updates.isActive = updates.isActive === 'true' || updates.isActive === true;

  if (req.file) {
    if (student.photo) {
      deleteFile(student.photo);
    }
    updates.photo = `/uploads/${req.file.filename}`;
  }

  const updated = await Student.findByIdAndUpdate(
    req.params.id,
    { $set: updates },
    { new: true, runValidators: true }
  );

  res.json({ success: true, message: 'Student updated successfully', data: updated });
};

// DELETE /api/students/:id
const deleteStudent = async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    return res.status(404).json({ success: false, message: 'Student not found' });
  }

  if (student.photo) {
    deleteFile(student.photo);
  }

  await Student.findByIdAndDelete(req.params.id);

  res.json({ success: true, message: 'Student deleted successfully' });
};

module.exports = { getAllStudents, getStats, getStudentById, createStudent, updateStudent, deleteStudent };

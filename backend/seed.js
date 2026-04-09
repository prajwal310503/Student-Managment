require('dotenv').config();
const mongoose = require('mongoose');
const Student = require('./models/Student');
const Counter = require('./models/Counter');

const students = [
  { name: 'Aarav Sharma',     course: 'B.Tech',  year: 2, gender: 'Male',   email: 'aarav.sharma@example.com',     mobileNumber: '9876543210', dateOfBirth: '2003-05-14', address: 'A-204, Sector 15, Kharghar, Navi Mumbai - 410210', isActive: true },
  { name: 'Priya Patel',      course: 'BCA',     year: 1, gender: 'Female', email: 'priya.patel@example.com',      mobileNumber: '9823456781', dateOfBirth: '2004-08-22', address: 'B-12, Palm Beach Road, Vashi, Navi Mumbai - 400703', isActive: true },
  { name: 'Rohan Desai',      course: 'M.Tech',  year: 1, gender: 'Male',   email: 'rohan.desai@example.com',      mobileNumber: '9712345678', dateOfBirth: '2001-11-03', address: '301, Panvel Heights, Panvel, Navi Mumbai - 410206', isActive: true },
  { name: 'Sneha Kulkarni',   course: 'MBA',     year: 2, gender: 'Female', email: 'sneha.kulkarni@example.com',   mobileNumber: '9654321098', dateOfBirth: '2000-03-18', address: 'C-5, Seawoods Estate, Seawoods, Navi Mumbai - 400706', isActive: true },
  { name: 'Karan Mehta',      course: 'BBA',     year: 3, gender: 'Male',   email: 'karan.mehta@example.com',      mobileNumber: '9567890123', dateOfBirth: '2002-07-29', address: '102, Nerul Residency, Nerul, Navi Mumbai - 400706', isActive: true },
  { name: 'Ananya Reddy',     course: 'B.Sc',    year: 2, gender: 'Female', email: 'ananya.reddy@example.com',     mobileNumber: '9443210987', dateOfBirth: '2003-01-11', address: 'Flat 7, Belapur Towers, CBD Belapur, Navi Mumbai - 400614', isActive: true },
  { name: 'Vikram Singh',     course: 'MCA',     year: 2, gender: 'Male',   email: 'vikram.singh@example.com',     mobileNumber: '9334567890', dateOfBirth: '2001-09-25', address: '45, Shivaji Nagar, Airoli, Navi Mumbai - 400708', isActive: true },
  { name: 'Pooja Nair',       course: 'M.Sc',    year: 1, gender: 'Female', email: 'pooja.nair@example.com',       mobileNumber: '9225678901', dateOfBirth: '2002-04-07', address: '23, Ghansoli Village Road, Ghansoli, Navi Mumbai - 400701', isActive: true },
  { name: 'Arjun Verma',      course: 'B.Tech',  year: 4, gender: 'Male',   email: 'arjun.verma@example.com',      mobileNumber: '9116789012', dateOfBirth: '2000-12-30', address: '501, Kopar Khairane Plaza, Kopar Khairane, Navi Mumbai - 400709', isActive: true },
  { name: 'Divya Joshi',      course: 'B.Com',   year: 2, gender: 'Female', email: 'divya.joshi@example.com',      mobileNumber: '9007890123', dateOfBirth: '2003-06-15', address: '88, Sanpada Sector 2, Sanpada, Navi Mumbai - 400705', isActive: true },
  { name: 'Rahul Gupta',      course: 'BCA',     year: 3, gender: 'Male',   email: 'rahul.gupta@example.com',      mobileNumber: '8998901234', dateOfBirth: '2002-02-20', address: '14, Turbhe Industrial Area, Turbhe, Navi Mumbai - 400705', isActive: false },
  { name: 'Meera Iyer',       course: 'M.Tech',  year: 2, gender: 'Female', email: 'meera.iyer@example.com',       mobileNumber: '8889012345', dateOfBirth: '2000-10-08', address: 'D-302, Ulwe Sector 17, Ulwe, Navi Mumbai - 410206', isActive: true },
  { name: 'Nikhil Bose',      course: 'B.Sc',    year: 3, gender: 'Male',   email: 'nikhil.bose@example.com',      mobileNumber: '8779123456', dateOfBirth: '2001-08-16', address: '67, Roadpali, Kalamboli, Navi Mumbai - 410218', isActive: true },
  { name: 'Kavya Menon',      course: 'MBA',     year: 1, gender: 'Female', email: 'kavya.menon@example.com',      mobileNumber: '8669234567', dateOfBirth: '2001-03-04', address: 'A-901, Khanda Colony, New Panvel, Navi Mumbai - 410206', isActive: true },
  { name: 'Aditya Kumar',     course: 'BBA',     year: 2, gender: 'Male',   email: 'aditya.kumar@example.com',     mobileNumber: '8559345678', dateOfBirth: '2003-11-27', address: '33, Dronagiri, Uran, Navi Mumbai - 400702', isActive: false },
  { name: 'Ishaan Chopra',    course: 'B.Tech',  year: 1, gender: 'Male',   email: 'ishaan.chopra@example.com',    mobileNumber: '8449456789', dateOfBirth: '2004-04-19', address: '205, Pushpak Nagar, Kharghar Sector 7, Navi Mumbai - 410210', isActive: true },
  { name: 'Tanvi Bhatt',      course: 'M.Sc',    year: 2, gender: 'Female', email: 'tanvi.bhatt@example.com',      mobileNumber: '8339567890', dateOfBirth: '2001-07-13', address: 'B-504, Juinagar Sector 43, Juinagar, Navi Mumbai - 400706', isActive: true },
  { name: 'Siddharth Rao',    course: 'MCA',     year: 1, gender: 'Male',   email: 'siddharth.rao@example.com',    mobileNumber: '8229678901', dateOfBirth: '2003-09-02', address: '11, Taloja Phase 2, Taloja, Navi Mumbai - 410208', isActive: true },
  { name: 'Nandini Tiwari',   course: 'B.Com',   year: 3, gender: 'Female', email: 'nandini.tiwari@example.com',   mobileNumber: '8119789012', dateOfBirth: '2002-05-31', address: '78, Sector 20, Kamothe, Navi Mumbai - 410209', isActive: true },
  { name: 'Yash Malhotra',    course: 'B.Tech',  year: 3, gender: 'Male',   email: 'yash.malhotra@example.com',    mobileNumber: '8009890123', dateOfBirth: '2001-12-09', address: '55, Roadpali Sector 6, Panvel, Navi Mumbai - 410206', isActive: true },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB Atlas...');

    // Clear existing students and counter
    await Student.deleteMany({});
    await Counter.deleteMany({});
    console.log('Cleared existing data.');

    // Insert one by one so pre-save hook runs for each (auto admission number)
    for (const data of students) {
      await Student.create(data);
      process.stdout.write('.');
    }

    console.log('\n✓ Seeded 20 students successfully!');

    const all = await Student.find({}, 'name admissionNumber course').sort({ admissionNumber: 1 });
    console.log('\nInserted students:');
    all.forEach((s) => console.log(`  ${s.admissionNumber}  ${s.name}  (${s.course})`));

  } catch (err) {
    console.error('Seed error:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected.');
  }
}

seed();

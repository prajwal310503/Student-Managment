# StudentMS — Student Management System

A full-stack web application for managing student records in educational institutions. Built with React, Node.js, Express, and MongoDB Atlas. Features a real-time analytics dashboard, complete student CRUD operations, circle photo crop, advanced filters, shimmer loading effects, and a fully responsive design that works on all screen sizes.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js)
![Express](https://img.shields.io/badge/Express-4-000000?style=flat&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-7-47A248?style=flat&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=flat&logo=tailwind-css)

---

## About the Project

StudentMS is a complete student record management portal designed for colleges and institutes. Administrators can enrol new students, update their information, view analytics, search and filter records, and manage everything from a clean, modern UI.

Key highlights:
- Auto-generated admission numbers in `ADM-YYYY-XXXXX` format
- Live analytics with bar charts, pie charts, and area charts
- Profile photo upload with circle crop (drag & drop or click)
- Popup modal forms for Add and Edit — no page navigation required
- Shimmer skeleton loaders for a smooth experience
- Fully responsive — works perfectly on mobile (375px), tablet, and desktop

---

## Features

- **Dashboard Analytics** — Total students, course distribution bar chart, gender donut chart, yearly enrollment area chart, recent admissions list
- **Students List** — Card view and table view with toggle
- **Search** — Live search by name, email, or admission number
- **Filters** — Filter by course, year, gender, status; sort by name, year, or date
- **Add / Edit Students** — Modal popup with full validation; edit pre-fills all existing data
- **Delete Student** — Confirm dialog before deleting; photo file also removed from server
- **View Student** — Full profile page with all details
- **Photo Upload** — Drag & drop or click, circle crop with zoom + rotation, preview before saving
- **Pagination** — 8 students per page with page number navigation
- **Shimmer Skeletons** — Smooth loading placeholders for all pages and cards
- **Responsive Design** — Full-screen modal on mobile, adaptive layouts, scrollable filter bar
- **Toast Notifications** — Success and error feedback for all actions

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| React | 18 | UI framework |
| Vite | 5 | Build tool and dev server |
| Tailwind CSS | 3 | Utility-first styling |
| React Router | v6 | Client-side routing |
| React Hook Form | 7 | Form state and validation |
| Recharts | 3 | Bar, pie, and area charts |
| React Easy Crop | 5 | Circle photo cropping |
| Lucide React | — | Icon library |
| Axios | 1.6 | HTTP API client |
| React Hot Toast | 2 | Toast notifications |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| Node.js | 18+ | Runtime |
| Express | 4 | REST API framework |
| MongoDB Atlas | — | Cloud database |
| Mongoose | 7 | ODM / schema modeling |
| Multer | 1.4 | File upload handling |
| Helmet | 7 | HTTP security headers |
| Express Validator | 7 | Request body validation |
| Morgan | 1 | Request logging |
| Dotenv | 16 | Environment variable loading |

---

## Project Structure

```
Student-Management/
├── backend/
│   ├── config/
│   │   └── db.js                   # MongoDB connection
│   ├── controllers/
│   │   └── studentController.js    # All CRUD + stats handlers
│   ├── middleware/
│   │   ├── errorHandler.js         # Global error handler
│   │   ├── notFound.js             # 404 handler
│   │   └── upload.js               # Multer file upload config
│   ├── models/
│   │   ├── Student.js              # Student Mongoose schema
│   │   └── Counter.js              # Auto-increment sequence
│   ├── routes/
│   │   └── studentRoutes.js        # API route definitions
│   ├── utils/
│   │   └── fileHelper.js           # File delete utility
│   ├── uploads/                    # Uploaded student photos
│   ├── seed.js                     # Sample data seeder (20 students)
│   ├── server.js                   # Express app entry point
│   └── .env                        # Environment variables
│
└── frontend/
    └── src/
        ├── api/
        │   └── studentApi.js        # Axios API functions
        ├── components/
        │   ├── layout/
        │   │   ├── Layout.jsx       # App shell
        │   │   ├── Navbar.jsx       # Mobile top bar
        │   │   └── Sidebar.jsx      # Desktop sidebar + mobile drawer
        │   ├── students/
        │   │   ├── StudentCard.jsx  # Card view item
        │   │   ├── StudentTable.jsx # Table view
        │   │   ├── StudentForm.jsx  # Add/Edit form fields
        │   │   ├── StudentFormModal.jsx  # Popup modal wrapper
        │   │   └── PhotoUpload.jsx  # Drag & drop + crop uploader
        │   └── ui/
        │       ├── SearchBar.jsx
        │       ├── FilterBar.jsx
        │       ├── Pagination.jsx
        │       ├── CustomSelect.jsx
        │       ├── DatePicker.jsx
        │       ├── ConfirmModal.jsx
        │       ├── Skeletons.jsx    # Shimmer loading placeholders
        │       ├── Avatar.jsx
        │       ├── Badge.jsx
        │       └── EmptyState.jsx
        ├── hooks/
        │   └── useStudents.js       # Data fetching with filters + pagination
        ├── pages/
        │   ├── Dashboard.jsx        # Analytics and charts
        │   ├── StudentsList.jsx     # Browse all students
        │   ├── ViewStudent.jsx      # Student detail page
        │   ├── AddStudent.jsx       # Standalone add page
        │   └── EditStudent.jsx      # Standalone edit page
        └── utils/
            ├── helpers.js           # Constants, URL helpers
            └── validators.js        # Form validation rules
```

---

## Setup Instructions

### Prerequisites

- Node.js v18 or higher
- npm
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (free tier works fine)

---

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd Student-Management
```

---

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/student_management?retryWrites=true&w=majority&appName=<appName>
```

> Replace `<username>`, `<password>`, `<cluster>`, and `<appName>` with your MongoDB Atlas values.

Start the backend:

```bash
# Development (auto-reload with nodemon)
npm run dev

# Production
npm start
```

Backend runs on **http://localhost:5000**

---

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend/` folder:

```env
VITE_API_URL=http://localhost:5000/api
VITE_UPLOAD_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Frontend runs on **http://localhost:5173**

---

### 4. Seed sample data (optional)

To populate the database with 20 sample students from Navi Mumbai:

```bash
cd backend
node seed.js
```

This clears existing data and inserts 20 students across various courses, years, and genders.

---

## API Endpoints

### Students

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/students` | List all students (paginated, filterable) |
| `GET` | `/api/students/stats` | Dashboard statistics |
| `GET` | `/api/students/:id` | Get a single student |
| `POST` | `/api/students` | Add a new student |
| `PUT` | `/api/students/:id` | Update a student |
| `DELETE` | `/api/students/:id` | Delete a student |

---

### Query Parameters — `GET /api/students`

| Parameter | Type | Description | Default |
|---|---|---|---|
| `search` | string | Search name, email, admission no. | — |
| `course` | string | Filter by course | — |
| `year` | number | Filter by year of study (1–6) | — |
| `gender` | string | Male / Female / Other | — |
| `status` | string | `active` or `inactive` | — |
| `sortBy` | string | `name`, `year`, or `createdAt` | `createdAt` |
| `sortOrder` | string | `asc` or `desc` | `desc` |
| `page` | number | Page number | `1` |
| `limit` | number | Records per page | `8` |

---

### Request Body — `POST` / `PUT` (multipart/form-data)

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | Yes | 2–100 characters |
| `course` | string | Yes | See valid courses below |
| `year` | number | Yes | 1 to 6 |
| `dateOfBirth` | string | Yes | `YYYY-MM-DD` format |
| `email` | string | Yes | Must be unique |
| `mobileNumber` | string | Yes | 10-digit Indian mobile number |
| `gender` | string | Yes | Male / Female / Other |
| `address` | string | Yes | Max 500 characters |
| `photo` | file | No | JPG, PNG, or WEBP — max 10MB |

---

### Stats Response — `GET /api/students/stats`

```json
{
  "success": true,
  "data": {
    "totalStudents": 20,
    "activeStudents": 18,
    "courseWise": [
      { "_id": "B.Tech", "count": 6 },
      { "_id": "BCA", "count": 3 }
    ],
    "genderWise": [
      { "_id": "Male", "count": 12 },
      { "_id": "Female", "count": 7 },
      { "_id": "Other", "count": 1 }
    ],
    "yearWise": [
      { "_id": 1, "count": 5 },
      { "_id": 2, "count": 4 }
    ]
  }
}
```

---

## Student Data Model

```js
{
  admissionNumber: String,    // Auto-generated: ADM-2026-00001
  name:            String,    // Required, 2–100 chars
  course:          String,    // Enum (see below)
  year:            Number,    // 1–6
  dateOfBirth:     Date,      // Required
  email:           String,    // Unique, lowercase
  mobileNumber:    String,    // 10-digit Indian format (6–9XXXXXXXXX)
  gender:          String,    // Male / Female / Other
  address:         String,    // Max 500 chars
  photo:           String,    // Relative path to uploaded file
  isActive:        Boolean,   // Default: true
  createdAt:       Date,      // Auto (timestamps)
  updatedAt:       Date       // Auto (timestamps)
}
```

### Valid Courses

`B.Tech` &nbsp;·&nbsp; `B.Sc` &nbsp;·&nbsp; `B.Com` &nbsp;·&nbsp; `BCA` &nbsp;·&nbsp; `BBA` &nbsp;·&nbsp; `MBA` &nbsp;·&nbsp; `MCA` &nbsp;·&nbsp; `M.Tech` &nbsp;·&nbsp; `M.Sc` &nbsp;·&nbsp; `Other`

---

## Pages

| Page | Route | Description |
|---|---|---|
| Dashboard | `/` | Analytics overview — stat cards, charts, recent admissions |
| Students List | `/students` | Browse all students with search, filters, card/table toggle |
| View Student | `/students/:id` | Full student profile page |
| Add Student | `/students/add` | Standalone add student page |
| Edit Student | `/students/:id/edit` | Standalone edit student page |

> Add and Edit also work as modal popups when triggered from Dashboard or Students List.

---

## Environment Variables

### `backend/.env`

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/student_management?retryWrites=true&w=majority
```

### `frontend/.env`

```env
VITE_API_URL=http://localhost:5000/api
VITE_UPLOAD_URL=http://localhost:5000
```

---

## Screnshots

<img width="1920" height="1414" alt="image" src="https://github.com/user-attachments/assets/e212481e-608a-4939-814c-f967dd344873" />

<img width="1920" height="1437" alt="image" src="https://github.com/user-attachments/assets/ddcc138e-864e-4455-b18d-2ff886c30cd2" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/7bc1d7e6-cc7e-4b80-b8d1-4a7ca468a045" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/30091751-400e-4c0d-a30d-3150a638ad0b" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/5c759ed7-37dd-4bd1-adcf-a8bfcb7f1454" />


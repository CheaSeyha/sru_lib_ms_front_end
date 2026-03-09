# SRU Library Management System – Frontend

A modern **Library Management System Frontend** built with **React + Vite** to manage books, students, staff, and library activities efficiently.

The system provides an interactive dashboard, QR-based student entry tracking, and powerful reporting tools for library administrators.

---

# Overview

This system was developed as a final-year project by a team of 16 Computer Science students at Svay Rieng University. The goal of the project is to digitize and simplify library management by providing tools for book management, student tracking, and activity monitoring through a modern web application.

---

# Features

## Authentication & Security
- Secure **JWT-based authentication**
- Protected routes
- Role-based access control
- Login system with token decoding

## Dashboard & Analytics
- Interactive dashboard with charts and statistics
- Daily library activity monitoring
- Student entry and exit tracking
- Data visualization

## Book Management
- Add new books
- Update book information
- Manage book records
- Track book availability

## Student Management
- Manage student profiles
- Track student library activities
- Student entry monitoring

## QR Code Student Entry
- Scan student ID using **QR scanner**
- Automatically record entry and exit
- Real-time scanning with camera

## Staff & User Management
- Manage staff accounts
- Manage system users
- Control user permissions

## Reporting System
Export reports in multiple formats:
- PDF
- Excel
- DOCX

## Internationalization
Multi-language support using **i18n**
- English
- Khmer

## UI & User Experience
- Fully responsive interface
- Dark mode support
- Smooth animations
- Component-based design

---

# Tech Stack

## Frontend
- React 18
- Vite

## UI & Styling
- TailwindCSS
- DaisyUI
- Material UI
- Framer Motion

## Data Visualization
- ApexCharts
- Chart.js
- Recharts

## Utilities
- Axios
- Day.js
- JWT Decode
- React Router

## Document Export
- jsPDF
- jsPDF-AutoTable
- XLSX
- Docxtemplater

## QR Scanner
- react-qr-scanner
---

# Project Structure
```
src
├── api
├── assets
├── Context
├── hooks
├── layout
├── pages
│ ├── Dashboard
│ ├── Book
│ ├── StudentManage
│ ├── StaffManage
│ ├── UserManage
│ ├── QR
│ └── Settings
├── utils
├── Translation
└── App.jsx
```

# Install dependencies
```
npm install
```

# Run development server
```
npm run dev
```

# Build for production
```
npm run build
```

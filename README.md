# Event Booking System

A full-stack event booking web application built with **React**, **Node.js**, **Express**, and **MongoDB**. The app allows users to view events, book them, and manage their bookings. Admins can manage events, users, and bookings via a dedicated dashboard.

---

## Features

### User
- Sign up / Login
- View upcoming events
- Book events
- View my bookings
- Booking confirmation with calendar integration

### Admin
- Login for admins
- Dashboard with total events, users, and bookings
- CRUD operations for events
- View all bookings
- View all registered users

### Additional
- Responsive design using **Tailwind CSS**
- Rich UI with **Framer Motion** animations
- Secure authentication with **JWT**
- Role-based access control

---

## Tech Stack

- **Frontend:** React 19, Tailwind CSS, Framer Motion, React Router
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT
- **Icons:** Lucide-react

---

## Installation

1. Clone the repository:

```bash
git clone <your-repo-link>
cd <project-folder>
````

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

4. Create a `.env` file in the backend folder with:

```
MONGO_URI=<your-mongo-db-uri>
JWT_SECRET=<your-secret-key>
PORT=5000
```

5. Start backend:

```bash
cd backend
npm run dev
```

6. Start frontend:

```bash
cd frontend
npm start
```

---

## API Routes

### Public

* `GET /api/events` - List all events
* `GET /api/events/:id` - Get event details
* `POST /api/events/:id/book` - Book an event (requires user auth)

### Admin

* `POST /api/admin/login` - Admin login
* `GET /api/admin/overview` - Admin dashboard stats
* `GET /api/admin/events` - List events
* `POST /api/admin/events` - Create event
* `PUT /api/admin/events/:id` - Update event
* `DELETE /api/admin/events/:id` - Delete event
* `GET /api/admin/bookings` - List all bookings
* `GET /api/admin/users` - List all users

---

## Folder Structure

```
frontend/        # React frontend
backend/         # Node.js + Express backend
backend/models   # MongoDB models
backend/routes   # Express routes
backend/middleware # Auth middleware
```

---

## License

This project is open-source and available under the MIT License.

---

## Author

Hari Baskar
Email: [baskarh54@gmail.com](mailto:baskarh54@gmail.com)

```

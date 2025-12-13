# 🍬 Sweet Shop Management System

A full-stack application for managing a sweet shop with user authentication, inventory management, and a modern React frontend.

## 📋 Prerequisites

Before running the project, make sure you have installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** - [Download](https://www.postgresql.org/download/)
- **npm** (comes with Node.js)

## 🚀 Quick Start Guide

### Step 1: Database Setup

1. **Install PostgreSQL** (if not already installed)
2. **Create a new database:**
   ```sql
   CREATE DATABASE sweetshop;
   ```

### Step 2: Backend Setup

1. **Navigate to Backend folder:**

   ```bash
   cd Backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create `.env` file** in the Backend folder:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/sweetshop?schema=public"
   JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
   PORT=5000
   FRONTEND_URL="http://localhost:3000"
   NODE_ENV="development"
   ```

   **Replace:**

   - `username` with your PostgreSQL username (usually `postgres`)
   - `password` with your PostgreSQL password
   - `sweetshop` with your database name

4. **Generate Prisma Client:**

   ```bash
   npx prisma generate
   ```

5. **Run database migrations:**

   ```bash
   npx prisma migrate dev
   ```

6. **Start the backend server:**

   ```bash
   npm run dev
   ```

   You should see: `🚀 Server running on http://localhost:5000`

### Step 3: Frontend Setup

1. **Open a NEW terminal window** (keep backend running)

2. **Navigate to Frontend folder:**

   ```bash
   cd Frontend
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Start the frontend development server:**

   ```bash
   npm run dev
   ```

   The browser should automatically open at `http://localhost:3000`

## 📁 Project Structure

```
Sweet Shop management/
├── Backend/              # Node.js + Express + TypeScript + Prisma
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── services/     # Business logic
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Auth middleware
│   │   └── utils/        # Utilities
│   ├── prisma/           # Database schema & migrations
│   └── .env              # Environment variables (create this)
│
└── Frontend/             # React + Vite
    ├── src/
    │   ├── components/   # React components
    │   ├── pages/        # Page components
    │   └── services/     # API service
    └── index.html        # Entry point
```

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Sweets (Public)

- `GET /api/sweets` - Get all sweets
- `GET /api/sweets/search` - Search sweets

### Sweets (Admin Only)

- `POST /api/sweets` - Add new sweet
- `PUT /api/sweets/:id` - Update sweet
- `DELETE /api/sweets/:id` - Delete sweet

### Inventory

- `POST /api/inventory/sweets/:id/purchase` - Purchase sweet (decrease stock)
- `POST /api/inventory/sweets/:id/restock` - Restock sweet (admin only)

### Health Check

- `GET /api/health` - Server health status

## 🧪 Testing the Application

1. **Backend should be running on:** `http://localhost:5000`
2. **Frontend should be running on:** `http://localhost:3000`

### Test Flow:

1. Open `http://localhost:3000` in your browser
2. You should see the Dashboard with sweets (mock data if database is empty)
3. Click "Register" to create a new account
4. After registration, you'll be logged in automatically
5. Browse sweets, search, and filter by category
6. Try purchasing a sweet (if logged in)

## 🛠️ Troubleshooting

### Backend Issues

**Error: "Missing required environment variables"**

- Make sure you created `.env` file in Backend folder
- Check that all required variables are set

**Error: "Can't reach database server"**

- Verify PostgreSQL is running
- Check DATABASE_URL in `.env` file
- Ensure database name exists

**Error: "Prisma Client not generated"**

- Run: `npx prisma generate`

### Frontend Issues

**Error: "Cannot connect to API"**

- Make sure backend is running on port 5000
- Check `src/services/api.jsx` has correct baseURL

**Port already in use**

- Change port in `vite.config.js` or kill the process using the port

## 📝 Environment Variables

### Backend (.env)

```env
DATABASE_URL="postgresql://user:password@localhost:5432/sweetshop?schema=public"
JWT_SECRET="your-secret-key-here"
PORT=5000
FRONTEND_URL="http://localhost:3000"
NODE_ENV="development"
```

## 🎯 Development Commands

### Backend

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm test         # Run tests
```

### Frontend

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 📦 Dependencies

### Backend

- Express - Web framework
- Prisma - ORM for database
- JWT - Authentication
- bcryptjs - Password hashing
- TypeScript - Type safety

### Frontend

- React - UI library
- React Router - Routing
- Axios - HTTP client
- Vite - Build tool

## 🚀 Production Deployment

1. **Build Backend:**

   ```bash
   cd Backend
   npm run build
   ```

2. **Build Frontend:**

   ```bash
   cd Frontend
   npm run build
   ```

3. **Set production environment variables**
4. **Deploy to your hosting service**

## 📞 Support

If you encounter any issues, check:

1. All dependencies are installed
2. Database is running and accessible
3. Environment variables are set correctly
4. Ports 3000 and 5000 are available

---

**Happy Coding! 🍬**

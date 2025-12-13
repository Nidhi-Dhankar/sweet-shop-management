# 🚀 How to Run Your Sweet Shop Project

## Quick Start Guide

You need **2 terminal windows** - one for Backend, one for Frontend.

---

## 📋 Prerequisites Check

Before starting, make sure you have:

- ✅ PostgreSQL installed and running
- ✅ Database `sweetshop` created
- ✅ `.env` file in Backend folder (already created)

---

## 🔧 Step 1: Setup Backend (First Time Only)

If this is your first time, run these commands in the Backend folder:

```powershell
cd "C:\Users\Ndhan\Desktop\Sweet Shop management\Backend"

# Install dependencies (if not done)
npm install

# Generate Prisma Client (if not done)
npx prisma generate

# Run database migrations (if not done)
npx prisma migrate dev
```

---

## 🖥️ Step 2: Start Backend Server

**Open Terminal/PowerShell Window 1:**

```powershell
cd "C:\Users\Ndhan\Desktop\Sweet Shop management\Backend"
npm run dev
```

**✅ You should see:**

```
🚀 Server running on http://localhost:5000
📝 API Health: http://localhost:5000/api/health
```

**Keep this terminal open!**

---

## 🎨 Step 3: Start Frontend Server

**Open a NEW Terminal/PowerShell Window 2:**

```powershell
cd "C:\Users\Ndhan\Desktop\Sweet Shop management\Frontend"
npm install
npm run dev
```

**✅ You should see:**

```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

**Browser should open automatically at `http://localhost:3000`**

---

## ✅ You're All Set!

- **Backend:** http://localhost:5000
- **Frontend:** http://localhost:3000

### Test It:

1. Open http://localhost:3000 in your browser
2. You should see the Sweet Shop Dashboard
3. Click "Register" to create an account
4. Browse sweets, search, and filter!

---

## 🛑 To Stop Servers

Press `Ctrl + C` in each terminal window.

---

## 📝 Daily Usage (After First Setup)

Once everything is set up, you only need:

**Terminal 1:**

```powershell
cd "C:\Users\Ndhan\Desktop\Sweet Shop management\Backend"
npm run dev
```

**Terminal 2:**

```powershell
cd "C:\Users\Ndhan\Desktop\Sweet Shop management\Frontend"
npm run dev
```

That's it! 🎉

---

## 🐛 Troubleshooting

### Backend won't start?

- Check PostgreSQL is running
- Verify `.env` file exists and has correct database credentials
- Make sure port 5000 is not in use

### Frontend won't start?

- Make sure backend is running first
- Check port 3000 is not in use
- Verify all dependencies are installed: `npm install`

### Database errors?

- Ensure PostgreSQL is running
- Check database `sweetshop` exists
- Verify DATABASE_URL in `.env` file is correct

---

## 🔍 Verify Everything Works

1. **Backend Health Check:**

   - Open: http://localhost:5000/api/health
   - Should return: `{"status":"ok","message":"Server is running"}`

2. **Frontend:**
   - Open: http://localhost:3000
   - Should show the dashboard with sweets

---

**Happy Coding! 🍬**

# 🚀 DevBoard — Personal Productivity Dashboard

DevBoard is a **full-stack productivity platform** built to help developers organize their goals, track habits, and visualize progress — all in one place.

It’s not a clone of any existing app — it’s a learning-ground project designed to mimic **real-world full-stack workflows**, featuring authentication, dashboards, analytics, and an optional community hub for development challenges and posts.

---

## 🧭 Features

### 🧑‍💻 Before Login
- **Home Page:** Overview of features and value
- **Sign Up / Login:** Secure JWT-based authentication
- **Contact Page:** Quick contact for feedback or inquiries

### 📊 After Login
- **Task Dashboard:** Create, update, and complete personal tasks
- **Habit Dashboard:** Track recurring habits with streaks
- **Analytics Page:** Visual insights (weekly completion rates, progress trends)
- **Community Hub (Admin only):**  
  Admins can share dev posts, updates, or challenges  
  Users can comment and engage
- **Notifications:** Email or in-app reminders for pending goals
- **Badges & Themes:** Reward streaks, toggle between light/dark mode
- **AI Summary (optional):** Auto-summarize weekly achievements

---

## 🧱 Tech Stack

### Frontend
- **React 18 + TypeScript + Vite**
- **TailwindCSS**
- **React Query (TanStack Query)** — API data management
- **Zustand / Redux Toolkit** — Global state management
- **Axios** — HTTP client
- **Vercel** — Frontend hosting

### Backend
- **Node.js + Express + TypeScript**
- **MongoDB + Mongoose** — Data persistence
- **Zod** — Request validation
- **JWT + bcrypt** — Authentication & authorization
- **Cloudinary** (optional) — File uploads
- **Render / Railway** — Backend hosting
- **Docker** — Local development environment
- **GitHub Actions** — Continuous integration

---

## 🗂️ Project Structure
``` 
| devboard/
│
├── client/ # React Frontend
│ ├── src/
│ │ ├── components/
│ │ ├── features/ # Auth, Tasks, Habits, Analytics, Community
│ │ ├── store/ # Zustand/Redux state
│ │ ├── lib/ # Axios, helpers
│ │ ├── pages/ # Page-level components
│ │ ├── routes/ # Protected/Public routes
│ │ └── types/
│ └── vite.config.ts
│
├── server/ # Express Backend
│ ├── src/
│ │ ├── config/ # DB, Cloudinary, JWT setup
│ │ ├── models/ # Mongoose schemas
│ │ ├── controllers/ # Route logic
│ │ ├── middlewares/ # Auth, validation, error handling
│ │ ├── routes/ # API endpoints
│ │ └── validations/ # Zod schemas
│
├── shared/ # (optional) shared types/interfaces
│
├── .github/workflows/ # CI pipeline config
├── docker-compose.yml
└── README.md 
```

---

## ⚙️ Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/<your-username>/devboard.git
cd devboard
```

### 2. Backend setup
```bash
cd server
npm install
cp .env.example .env
npm run dev
```



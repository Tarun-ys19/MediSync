# HealthSync

An AI-powered preventive healthcare and clinical monitoring system built with the MERN stack (MongoDB, Express, React, Node.js). HealthSync provides intelligent symptom tracking, personalized diet and wellness planning, medication adherence scheduling, daily vitals monitoring, multi-channel notifications (SMS & Email), and comprehensive clinical PDF report generation.

---

## Key Features

- **AI Symptom Analysis**: Multi-modal health evaluations analyzing textual symptoms and clinical imagery with instant risk assessment and recommendations.
- **Daily Health Monitoring**: Track vital metrics including sleep patterns, water intake, meals, mood, blood pressure, blood glucose, and weight with 7-day trend analysis.
- **Medication Scheduler**: Automated medication reminder engine powered by cron scheduling with multi-channel alerts (Email & SMS via Twilio).
- **Personalized Indian Diet Engine**: AI-generated nutrition and meal plans customized to user health goals, medical conditions, and dietary preferences.
- **AI Health Assistant**: Intelligent conversational chatbot providing context-aware answers informed by recent patient monitoring logs.
- **Clinical Health Reports**: Automated PDF report generator detailing vitals, symptom severity trends, and medical history.
- **Secure Authentication**: JWT-based session security and password hashing.

---

## Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite, TailwindCSS, React Router 7, Axios, Lucide Icons, Recharts |
| **Backend** | Node.js, Express.js 5, Mongoose (MongoDB ODM) |
| **AI / ML** | Google Generative AI (Gemini Flash) |
| **Notifications** | Twilio (SMS), Nodemailer (SMTP Email) |
| **Document Generation** | PDFKit |
| **Scheduling** | node-cron |

---

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── config/             # Database connection setup
│   │   ├── controllers/        # Request handlers & business logic
│   │   │   ├── aiController.js
│   │   │   ├── aiDietController.js
│   │   │   ├── alertController.js
│   │   │   ├── authController.js
│   │   │   ├── chatController.js
│   │   │   ├── dailyMonitoringController.js
│   │   │   ├── dashboardController.js
│   │   │   ├── dietController.js
│   │   │   ├── medController.js
│   │   │   ├── reportController.js
│   │   │   ├── reportPDFController.js
│   │   │   └── symptomController.js
│   │   ├── middleware/         # Auth & upload middleware
│   │   ├── models/             # Mongoose schemas (User, Alert, Symptom, etc.)
│   │   ├── routes/             # Express API route declarations
│   │   ├── schedulers/         # Background cron jobs (Medication & Daily reminders)
│   │   └── utils/              # Notification, AI, and formatting utilities
│   ├── uploads/                # Local directory for uploaded symptom images
│   ├── server.js               # Express application entrypoint
│   └── package.json
│
├── frontend/
│   ├── public/                 # Static assets & icons
│   ├── src/
│   │   ├── assets/             # Brand logos & dashboard graphic assets
│   │   ├── components/         # Modular React components
│   │   │   ├── Chat/
│   │   │   ├── DailyMonitoring/
│   │   │   ├── Dashboard/
│   │   │   ├── MedicationSchedule/
│   │   │   ├── Notification/
│   │   │   ├── Recipe/
│   │   │   ├── Symptom/
│   │   │   ├── MainLayout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── SplashScreen.jsx
│   │   ├── contexts/           # Authentication and state contexts
│   │   ├── pages/              # Primary view pages
│   │   ├── services/           # Axios API client functions
│   │   ├── styles/             # Application styles & CSS animations
│   │   ├── App.jsx             # Route definitions
│   │   └── main.jsx            # Application root
│   ├── vite.config.js
│   └── package.json
│
├── DEPLOYMENT.md               # Production deployment walkthrough
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **MongoDB**: Local MongoDB instance or MongoDB Atlas cluster URI
- **API Keys**:
  - Google Gemini API key (`BIOMISTRAL_API_KEY`)
  - SMTP Credentials (for email delivery)
  - Twilio Account SID, Auth Token & Phone Number (for SMS notifications)

---

### Installation & Local Setup

#### 1. Clone the repository
```bash
git clone https://github.com/Tarun-ys19/MediSync.git
cd HEALTHSYNC_MERN
```

#### 2. Configure Backend Environment
Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/healthsync?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here
BIOMISTRAL_API_KEY=your_gemini_api_key

# Twilio SMS
TWILIO_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE=your_twilio_phone_number

# SMTP Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_app_password

# Client URL
FRONTEND_URL=http://localhost:5173
```

#### 3. Install Backend Dependencies & Start Server
```bash
cd backend
npm install
npm run dev
```
The backend server runs on `http://localhost:5000`.

#### 4. Configure Frontend Environment
Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:5000
```

#### 5. Install Frontend Dependencies & Start App
```bash
cd ../frontend
npm install
npm run dev
```
The client will be running on `http://localhost:5173`.

---

## Core API Endpoints

| Category | Method | Endpoint | Description |
|---|---|---|---|
| **Auth** | `POST` | `/api/auth/register` | Register new user profile |
| **Auth** | `POST` | `/api/auth/login` | Authenticate user & issue JWT |
| **Auth** | `GET` | `/api/auth/me` | Fetch active user credentials |
| **Dashboard** | `GET` | `/api/dashboard` | Aggregated metrics, adherence & recent logs |
| **Symptoms** | `POST` | `/api/symptoms` | Submit symptom description & clinical photo |
| **Symptoms** | `GET` | `/api/symptoms` | Retrieve logged symptoms & severity scores |
| **Monitoring** | `POST` | `/api/daily-monitoring/create` | Record daily vitals, sleep, water, and mood |
| **Monitoring** | `GET` | `/api/daily-monitoring/today` | Fetch today's monitoring status |
| **Monitoring** | `GET` | `/api/daily-monitoring/history` | Retrieve historical monitoring logs |
| **Medication** | `GET` | `/api/medications` | List scheduled medications |
| **Medication** | `POST` | `/api/medications` | Create medication schedule |
| **Medication** | `PUT` | `/api/medications/:id/adherence` | Log taken / skipped dose status |
| **Diet** | `GET` | `/api/diet` | Fetch current personalized diet plan |
| **AI** | `POST` | `/api/ai/generate` | Generate customized Indian recipes |
| **AI Chat** | `POST` | `/api/chat/send` | Chat with the health AI assistant |
| **Reports** | `GET` | `/api/report/pdf/download` | Download compiled medical PDF report |
| **Alerts** | `GET` | `/api/alerts` | List patient notifications & critical alerts |

---

## Production Build

To bundle the frontend for production deployment:
```bash
cd frontend
npm run build
```
The compiled output is located in `frontend/dist/`. For end-to-end cloud hosting on Vercel and Render, refer to [DEPLOYMENT.md](DEPLOYMENT.md).


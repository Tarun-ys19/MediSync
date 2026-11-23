# Deployment Guide

This guide outlines the production deployment workflow for HealthSync using **MongoDB Atlas** (Database), **Render** (Backend), and **Vercel** (Frontend).

---

## 1. Database Setup (MongoDB Atlas)

1. Sign in to your [MongoDB Atlas](https://cloud.mongodb.com/) dashboard.
2. Under **Network Access**, ensure your IP access list permits connections from the web service (add `0.0.0.0/0` to allow all IP addresses for cloud hosting).
3. Under **Database Access**, create a database user and record the username and password.
4. Navigate to **Database** -> **Connect** -> **Drivers** and copy the standard MongoDB connection string:
   ```
   mongodb+srv://<username>:<password>@<cluster-address>/healthsync?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your database user credentials.

---

## 2. Backend Deployment (Render)

1. Sign in to [Render](https://render.com/).
2. Click **New +** -> **Web Service**.
3. Connect your repository containing the project.
4. Configure service settings:
   - **Name**: `healthsync-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: Free or Standard
5. Under **Environment Variables**, configure the following keys:
   - `NODE_ENV`: `production`
   - `PORT`: `10000`
   - `MONGODB_URI`: `<Your MongoDB connection string from Step 1>`
   - `JWT_SECRET`: `<A strong random secret string>`
   - `BIOMISTRAL_API_KEY`: `<Your Google Gemini API Key>`
   - `TWILIO_SID`: `<Your Twilio Account SID>`
   - `TWILIO_AUTH_TOKEN`: `<Your Twilio Auth Token>`
   - `TWILIO_PHONE`: `<Your Twilio Phone Number>`
   - `SMTP_HOST`: `smtp.gmail.com`
   - `SMTP_PORT`: `465`
   - `SMTP_SECURE`: `true`
   - `SMTP_USER`: `<Your SMTP Email>`
   - `SMTP_PASS`: `<Your SMTP App Password>`
   - `FRONTEND_URL`: `https://<your-frontend-domain>.vercel.app` *(update once frontend is deployed)*
6. Click **Deploy Web Service**.
7. Once deployed, copy your service URL (e.g. `https://healthsync-backend.onrender.com`).

---

## 3. Frontend Deployment (Vercel)

1. Sign in to [Vercel](https://vercel.com/).
2. Click **Add New...** -> **Project**.
3. Import your repository.
4. Configure project settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click edit and select `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Under **Environment Variables**, add:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://<your-render-backend-url>` *(without trailing slash, e.g. `https://healthsync-backend.onrender.com`)*
6. Click **Deploy**.
7. Once the build finishes, copy your live frontend domain (e.g. `https://healthsync-app.vercel.app`).

---

## 4. Final Configuration

1. Return to **Render** -> your backend service -> **Environment Variables**.
2. Ensure `FRONTEND_URL` exactly matches your production Vercel URL (e.g. `https://healthsync-app.vercel.app`).
3. Save changes. Render will automatically redeploy with the updated CORS origin allowed.

---

## 5. Verification Checklist

- [ ] MongoDB Atlas connection verifies successfully on backend boot.
- [ ] User registration and login return valid JWTs and authentication headers.
- [ ] Daily health monitoring logs save and compute 7-day trend analysis.
- [ ] Symptom submission evaluates via AI and triggers high-severity alerts when applicable.
- [ ] Medication cron scheduler executes reminders.
- [ ] PDF report generation downloads cleanly from the dashboard.

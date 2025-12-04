# Flight Search & Booking — Assignment

A simplified Flight Search & Booking app (React + TypeScript + Redux Toolkit + Node.js + MongoDB + JWT).


---

## Project structure (important files)

- `backend/` — Node.js + Express + Mongoose + JWT
  - `server.js`, `config/db.js`, `models/`, `routes/`, `seed.js`
- `frontend/` — Vite + React + TypeScript + Redux Toolkit
  - `src/` pages, components, store, `api/axios.ts`
- `scripts/screenshot.js` — headless Playwright script to capture screenshots (optional)
- `README.md` — this file

---

## Quick setup (Windows / PowerShell)

> **Open two terminals** (one for backend, one for frontend).

### Backend

```powershell
cd "E:/Assignment/Unitres Tech/flight-booking-app/backend"
# install (only first time)
npm install
# seed the database (must be run from backend root)
npm run seed
# start backend (nodemon)
npm run dev
```

MONGO_URI=mongodb://127.0.0.1:27017/flight_app

JWT_SECRET=supersecretjwtkey

PORT=5000

DEFAULT_USER_EMAIL=test@example.com

DEFAULT_USER_PASSWORD=Password123

## How to test the app manually (end-to-end)

Go to http://localhost:5173/.

Login:

Email: test@example.com

Password: Password123

You should be redirected to Search Flights.

Search example:

From: Delhi

To: Mumbai

Date: 2025-12-12

Passengers: 1

Click Search → list of flights should appear.

Click Book Now on a flight → fill passenger form → Confirm Booking.

You will be redirected to Booking Success page showing booking details.

![alt text](Login.JPG)

![alt text](<Search Flight.JPG>)

![alt text](<Available Flight.JPG>)

![alt text](<Booking Successful.JPG>)


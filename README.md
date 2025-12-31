## 📌 Project Overview
VitalFlow provides an efficient solution for emergency blood search by allowing users to find donors based on blood group and district/Upazila. Users can request blood, receive notifications when donors are available, and track their request history. The system also includes role-based access for Admins and Volunteers to manage users, donors, requests, and funding activities.

---

## 🎯 Purpose
The main purpose of VitalFlow is to save lives by reducing the time required to find blood donors in emergency situations. By offering district-wise search, request tracking, and instant notifications, the platform ensures that users can quickly connect with suitable donors nearby.

---

## 🛠️ Technologies Used

### Frontend
- React
- Tailwind CSS
- DaisyUI
- React Router
- Framer Motion
- Lucide Icons

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Firebase Authentication

### Payment
- Stripe

---

## ✨ Core Features

### User Features
- View blood donors with contact details, blood group, and location
- Search donors by blood group and district/Upazila
- Request blood and get notified when a donor is available
- View and manage personal profile
- Track blood request history and cancel requests
- View donation and funding history
- See emergency and urgent blood requests
- Fund blood-related causes via secure payment

### Admin Features
- View and manage all users, donors, and volunteers
- Approve, block, or activate donors
- Change user roles (User ↔ Donor ↔ Volunteer ↔ Admin)
- Manage all blood requests and funding records
- Monitor platform activity and user data

### Volunteer Features
- View user and donor information
- Update donor availability status

---

## 📦 Dependencies Used

### Backend
- express
- cors
- mongodb
- dotenv
- jsonwebtoken
- stripe

### Frontend
- react
- react-router
- react-toastify
- tailwindcss
- daisyui
- lucide-react
- framer-motion

---

## ▶️ Run the Project Locally

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Tafsirchy/VitalFlow-Frontend.git
git clone https://github.com/Tafsirchy/VitalFlow-BackendNew.git

2️⃣ Install dependencies
Backend
cd server
npm install

Frontend
cd client
npm install

3️⃣ Environment Variables

Create a .env file inside the server folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key

4️⃣ Start the application
Backend
Nodemon Index.js

Frontend
npm run dev


The application will run at:
👉 http://localhost:5000

🌐 Live Project & Resources

🔗 Live Website:=
https://vitalflow-9b72a.web.app/

💻 GitHub Repository:
https://github.com/Tafsirchy/VitalFlow-Frontend.git
https://github.com/Tafsirchy/VitalFlow-BackendNew.git

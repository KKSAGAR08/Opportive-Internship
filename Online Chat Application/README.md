# 💬 Online Chat Application

A full-stack real-time chat application that supports one-on-one messaging, realtime messaging, authentication, and responsive design.

---

## 🌐 Hosted Website

👉 [https://online-chat-application-psi.vercel.app](https://online-chat-application-psi.vercel.app)

---

## 🚀 Features

* 🔐 User Authentication (Signup & Login)
* 👤 One-on-One Messaging
* 📱 Responsive UI (mobile & desktop)
* 🔄 Real-time messaging with Socket.IO
* 🌐 Deployed on Vercel

---

## 🛠 Tech Stack

### Frontend:

* React.js
* Tailwind CSS
* Axios
* Zustand

### Backend:

* Node.js
* Express.js
* MongoDB (Mongoose)
* Socket.IO
* JWT Authentication
* CORS

---

## 📦 Requirements

* Node.js (v18+)
* MongoDB
* Git

---

## 🧑‍💻 Local Setup

### 📥 Clone the Repository & Switch to Master Branch

```bash
git clone https://github.com/KKSAGAR08/Opportive-Internship.git
cd Opportive-Internship

# Ensure you're on master branch
git checkout master
```

### 🔧 Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

```bash
npm run dev
```

### 💻 Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```


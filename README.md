# 📝 Feedback System

A full-stack web application where users can submit feedback via forms, and admins can create/manage feedback forms and view responses.

---

## 🌐 Hosted App

👉 [https://feedback-collection-system-five.vercel.app](https://feedback-collection-system-five.vercel.app)

> Replace with your actual deployed link if hosted.

---

## 🚀 Features

* 🧾 Create feedback forms with different question types (text, ratings, etc.)
* 🙋‍♂️ Users can fill and submit feedback
* 📊 Admin panel to view all feedback responses
* 🧑‍🔧 Role-based access (Admin & User)
* 🔒 Secure login/signup with JWT
* ⚡ Fast and responsive UI

---

## 🛠 Tech Stack

### Frontend:

* React.js
* Tailwind CSS
* Axios
* React Router
* React Hook Form

### Backend:

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* CORS

---

## 📦 Requirements

* Node.js (v18+)
* MongoDB
* Git

---

## 🧑‍💻 Local Setup

### 📥 Clone the Repository

```bash
git clone https://github.com/your-username/feedback-system.git
cd feedback-system
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

---


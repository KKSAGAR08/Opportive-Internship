# 📝 Feedback System

A full-stack web application where users can submit feedback via forms, and admins can create/manage feedback forms and view responses.

---

## 🌐 Hosted App

👉 [https://feedback-collection-system-five.vercel.app](https://feedback-collection-system-five.vercel.app)



---

## 🚀 Features

* 🧾 Create feedback forms with different question types (text, ratings, etc.)
* 🙋‍♂️ Users can fill and submit feedback
* 📊 Admin panel to view all feedback responses
* 🧑‍🔧 Role-based access (Admin & User)
* 🔒 Secure login/signup with JWT
* ⚡ Fast and responsive UI


---

## 🧭 Steps to Use the Feedback System

### 👨‍💼 For Admin:

1. **Login**  
   Admin logs in using their email and password.

2. **Create or View Feedback Form**  
   After login, admin can:
   - Create a new feedback form  
   - Or click on “View Details” for any existing feedback form

3. **Analyze Responses**  
   Inside the feedback detail page:
   - View graphical analysis of feedback
   - Browse individual responses

4. **Copy Feedback Link**  
   - Use the **Copy** button in the navigation bar to copy the unique feedback URL

5. **Share Link**  
   - Send the copied link to the target customer/user

---

### 👤 For User/Customer:

1. **Open the Link**  
   User clicks the shared feedback link.

2. **Submit Feedback**  
   User fills out and submits the feedback form.

3. **Response Stored**  
   The submitted response gets saved and becomes visible to the admin under that feedback form.

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


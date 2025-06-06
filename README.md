# 🛒 Al-Powered Customer Query Assistant
This is a full-stack e-commerce web application with user authentication, admin product management, and an AI-powered chatbot assistant integrated via OpenRouter.

---

## 🚀 Features

### 👤 User
- Register/Login with JWT authentication
- View available products
- Intelligent AI Chatbot for product-related queries

### 🛠️ Admin
- Add/Delete products via an admin dashboard
- Admin access protected with role-based authorization

### 🤖 Chatbot Assistant
- Integrated with OpenRouter API using GPT-3.5 Turbo
- Can answer product-related queries intelligently
- Chat UI with collapsible/minimized view

---

## 🧰 Tech Stack

### 🖥️ Frontend
- React
- Axios
- React Router DOM
- CSS3

### ⚙️ Backend
- Express.js
- MongoDB + Mongoose
- JWT (JSON Web Tokens)
- Dotenv

### 💡 AI Integration
- OpenRouter API (GPT-3.5 Turbo)

---

## 📁 Project Structure

```
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/       # Navbar, ChatBot, Footer
│   │   ├── pages/            # Home, Login, Register, AdminDashboard
│   │   ├── App.jsx
│   │   └── index.js
│   └── package.json
│
├── server/
│   ├── models/               # User.js, Product.js
│   ├── middleware/           # auth.js (auth & role checks)
│   ├── routes/               # auth.js, products.js, chat.js
│   ├── app.js
│   └── package.json
│
└── .env                      # Contains Mongo URI & OpenRouter API key
```

---

## 🔧 Setup Instructions

### 1. Setup Server

```bash
cd server
npm install
```

#### Create a `.env` file in `/server`:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
OPENROUTER_API_KEY=your_openrouter_api_key
```

```bash
nodemon app.js
```

### 2. Setup Client

```bash
cd ../client
npm install
npm start
```

---

## 🌐 Routes Overview

### Public
- `POST /api/register` – Register a new user
- `POST /api/login` – Authenticate user and return token
- `GET /api/products` – Fetch all products

### Admin (Protected)
- `POST /api/products` – Add a product
- `DELETE /api/products/:id` – Delete a product

### Chat
- `POST /api/chat` – Ask chatbot any query

---

## 🧠 Example Queries to Ask the Chatbot

- "What is the price of the iPhone?"
- "Tell me about available products"
- "How many products are listed?"
- "Can you recommend something under ₹1000?"

---#

# TaskFlow

**TaskFlow** is a full-stack web-based task management application designed to help individuals and teams organize, track, and manage tasks efficiently. Built with a Vite-powered React frontend and a Spring Boot backend, it provides a scalable, secure, and user-friendly solution for task productivity.

---

## 🚀 Features

- ✅ JWT-based user authentication and role-based access control
- ✅ CRUD operations on tasks (Create, Read, Update, Delete)
- ✅ Filter and sort tasks by category, due date, or priority
- ✅ Responsive UI with Vite + React + TypeScript
- ✅ Spring Boot + MySQL backend
- ✅ Password hashing using BCrypt
- ✅ Heroku/AWS-ready cloud deployment setup

---

## 📁 Project Structure

```
taskflow/
├── backend/       # Spring Boot app
│   └── src/...    # Java source files
├── frontend/      # Vite + React app
│   └── src/...    # React + TypeScript components
└── README.md
```

---

## ⚙️ Technologies

**Frontend**
- React + Vite
- TypeScript
- Axios, React Router DOM

**Backend**
- Java + Spring Boot
- Spring Security + JWT
- Spring Data JPA
- MySQL

**DevOps**
- Maven
- Git & GitHub
- Heroku Cloud Deployment

---

## 🛠 Setup Instructions

### 🔧 Backend Setup
```bash
cd backend
./mvnw spring-boot:run
```

Make sure to configure `application.properties` with your MySQL connection and JWT secret.

### ⚛️ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Ensure your Vite proxy is set to `http://localhost:8080` in `vite.config.ts`.

---

## 🧪 Testing
- Backend: JUnit tests in `src/test/java`
- Frontend: Coming soon with Vitest / React Testing Library

---

## 📌 License
This project is licensed under the MIT License.

---

## 📫 Contact
Created by **Michael Smart** — [GitHub](https://github.com/riiansmart) | [LinkedIn](https://www.linkedin.com/in/michael-smart-47576a264/)

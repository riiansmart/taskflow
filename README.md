# TaskFlow

**TaskFlow** is a full-stack web-based task management application designed to help individuals and teams organize, track, and manage tasks efficiently. Built with a Vite-powered React frontend and a Spring Boot backend, it provides a scalable, secure, and user-friendly solution for task productivity.

---

## 🚀 Features

- ✅ JWT-based user authentication and role-based access control
- ✅ CRUD operations on tasks (Create, Read, Update, Delete)
- ✅ Advanced task filtering and sorting:
  - By status (Not Started, In Progress, Completed)
  - By priority (Low, Medium, High)
  - By due date
  - Text search across task titles and descriptions
- ✅ Bulk task operations (create, update, delete)
- ✅ Responsive UI with dark/light theme support
- ✅ Task categorization (Feature/Bug)
- ✅ Modern UI with cyberpunk-inspired design
- ✅ Real-time task status updates
- ✅ User profile management
- ✅ Secure password hashing with BCrypt
- ✅ PostgreSQL database with Prisma ORM
- ✅ Cloud-ready deployment configuration

---

## 📁 Project Structure

```
taskflow/
├── backend/           # Spring Boot app
│   └── src/...       # Java source files
├── frontend/         # Vite + React app
│   ├── src/...      # React + TypeScript components
│   ├── prisma/      # Database schema and migrations
│   └── public/      # Static assets
└── README.md
```

---

## ⚙️ Technologies

**Frontend**
- React 18 + Vite
- TypeScript
- React Router DOM v6
- Axios for API calls
- Prisma Client
- CSS Modules + Custom Theme Support

**Backend**
- Java + Spring Boot
- Spring Security + JWT
- Spring Data JPA
- PostgreSQL
- Prisma ORM

**DevOps & Tools**
- Maven
- Git & GitHub
- Docker & Docker Compose
- Prisma CLI
- Node.js & npm

---

## 🛠 Setup Instructions

### 🔧 Backend Setup
```bash
cd backend
./mvnw spring-boot:run
```

Configure `application.properties` with your PostgreSQL connection and JWT secret.

### ⚛️ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The Vite dev server will start at `http://localhost:5173` with API proxy to `http://localhost:8080`.

### 🗄️ Database Setup

1. Ensure PostgreSQL is installed & running
   - Use Docker Compose:
     ```bash
     docker-compose up -d db
     ```

2. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env`:
   ```dotenv
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/taskflow_dev?schema=public"
   JWT_SECRET="your-secret-key-change-this-in-production"
   ```

3. Initialize database:
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

4. (Optional) Launch Prisma Studio:
   ```bash
   npx prisma studio
   ```

### 🎨 Theme Customization
The application supports both light and dark themes. Toggle between themes using the theme switcher in the navigation bar.

---

## 🧪 Testing
- Backend: JUnit tests in `src/test/java`
- Frontend: Component testing with React Testing Library (coming soon)

---

## 📌 License
This project is licensed under the MIT License.

---

## 📫 Contact
**Michael Smart** - Project Owner & Backend Developer — [GitHub](https://github.com/riiansmart) | [LinkedIn](https://www.linkedin.com/in/michael-smart-47576a264/)

**Owen Lindsey** - Frontend Developer — [GitHub](https://github.com/omniV1) | [LinkedIn](https://www.linkedin.com/in/owen-lindsey-5b323a23b/)

## 🎉 Quick Start for Contributors

After cloning the repository:

```bash
# 1. Install dependencies
cd frontend
npm install

# 2. Start PostgreSQL
docker-compose up -d db

# 3. Set up environment
cp .env.example .env
# Edit .env with your settings

# 4. Initialize database
npx prisma migrate deploy
npx prisma generate

# 5. Start development servers
# Terminal 1 - Backend
cd ../backend
./mvnw spring-boot:run

# Terminal 2 - Frontend
cd ../frontend
npm run dev
```

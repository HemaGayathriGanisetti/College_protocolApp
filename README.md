# 🏫 College Protocol App

A Full Stack College Protocol Management System built with:

- ⚙️ Spring Boot (Backend)
- 📱 React Native (Frontend)

This application helps colleges digitally manage **rules, labs, timetable, categories, and users** with secure authentication and role-based access.

---

# 🚀 Features

## 🎓 Student Features
- Secure Login / Registration (JWT Authentication)
- View College Rules
- View Labs Information
- View Timetable
- Browse Categories (Hostel, Mess, Classroom, Cultural Events)
- Search Rules & Labs
- Clean and simple mobile UI

---

## 🛠️ Admin Features
- Admin Dashboard with full control
- Add / Edit / Delete Rules
- Manage Labs (CRUD operations)
- Manage Categories
- Manage Timetable
- View Students data
- Role-based access (Admin / Student)
- Secure JWT-based authentication

---

## 📊 Admin Dashboard Features
- ➕ Add new Rules (Hostel, Mess, Classroom, Cultural Events)
- ✏️ Edit existing Rules
- 🗑️ Delete Rules
- 📚 Manage Labs
- 🏷️ Manage Categories
- 📅 Manage Timetable
- 👥 View Students
- 🔐 Admin-only secure access
- 📊 Central control panel

---

# 🧰 Tech Stack

## Backend (Spring Boot)
- Java
- Spring Boot
- Spring Security (JWT)
- Spring Data JPA
- MySQL
- Maven

## Frontend (React Native)
- React Native (TypeScript)
- React Navigation
- Axios
- Context API

---

# 📁 Project Structure

## Backend

Backend/
└── protocolapp/
├── src/main/java/com/college/protocolapp/
├── config/
│ ├── DataInitializer.java
│ └── SecurityConfig.java
├── controller/
│ ├── AdminController.java
│ ├── AuthController.java
│ ├── CategoryController.java
│ ├── LabController.java
│ ├── RuleController.java
│ ├── StudentController.java
│ ├── TimetableController.java
│ └── UserController.java
├── dto/
├── exception/
├── model/
├── repository/
├── security/
├── service/
├── resources/
│ └── application.properties
└── ProtocolappApplication.java


---

## Frontend

frontend/
├── src/
│ ├── components/
│ │ └── RuleCard.tsx
│ ├── constants/
│ ├── context/
│ ├── navigation/
│ ├── screens/
│ │ ├── CategoriesScreen.tsx
│ │ ├── HomeScreen.tsx
│ │ ├── LabsScreen.tsx
│ │ ├── LoginScreen.tsx
│ │ ├── RuleDetailsScreen.tsx
│ │ ├── RulesScreen.tsx
│ │ ├── SearchScreen.tsx
│ │ ├── SettingsScreen.tsx
│ │ ├── SplashScreen.tsx
│ │ ├── TimetableScreen.tsx
│ │ └── AdminDashboard.tsx
│ ├── theme/
│ ├── utils/
│ └── App.tsx
├── index.js
├── package.json
└── tsconfig.json


---

# ⚙️ Setup Instructions

# 🔧 Backend Configuration (`application.properties`)

```properties
# Application Name
spring.application.name=protocolapp

# MySQL Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/protocolapp
spring.datasource.username=YOUR_DB_USERNAME
spring.datasource.password=YOUR_DB_PASSWORD

# JPA / Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Server Port
server.port=8080

# JWT Configuration
jwt.secret=YOUR_SECRET_KEY
jwt.expiration=36000000
```

⚡ Important: Replace database credentials with your actual MySQL credentials.

---

# ▶️ How to Run the Project

# 1️⃣ Clone Repository

```bash
git clone https://github.com/HemaGayathriGanisetti/college-protocol-project.git
```

---

# 2️⃣ Setup MySQL Database

```sql
CREATE DATABASE protocolapp;
```

---

# 3️⃣ Run Backend

```bash
cd Backend/protocolapp

mvn clean install

mvn spring-boot:run
```

✅ Backend runs at:

```bash
http://localhost:8080
```

---

# 4️⃣ Run Frontend

```bash
cd frontend

npm install

npx react-native start
```

---

# ▶️ Run Android App

Open another terminal:

```bash
npx react-native run-android
```

---

# 🔑 Important Notes

- Make sure backend is running before frontend
- MySQL server must be active
- JWT token is used for secured APIs
- Android Emulator or Physical Device required for React Native

---

# 🔑 API Endpoints

# 🔓 Public APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login user |

---

# 🔐 Secured APIs

## Categories

| Method | Endpoint | Description |
|---|---|---|
| GET | `/categories` | Get all categories |
| POST | `/categories` | POST categories |
| PUT | `/categories/{id}` | update categories |
| DELETE | `/categories/{id}` | delete categories |

---

## Rules

| Method | Endpoint | Description |
|---|---|---|
| GET | `/rules` | Get all rules |
| GET | `/rules/{id}` | Get rule by ID |
| DELETE | `/rules/{id}` | delete rule by ID |

---

## Labs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/labs` | Get all labs |
| GET | `/labs/{id}` | Get lab by ID |
| PUT | `/labs/{id}` | update lab by ID |
| DELETE | `/labs/{id}` | delete lab by ID |

---

## Timetable

| Method | Endpoint | Description |
|---|---|---|
| GET | `/timetable` | Get timetable |
| PUT | `/timetable/{id}` | update timetable |
| DELETE | `/timetable/{id}` | delete timetable |

---

## Students

| Method | Endpoint | Description |
|---|---|---|
| GET | `/students` | Get students |
| POST | `/students` | Add student |

---

# 📬 Testing APIs with Postman

## 1️⃣ Install Postman

https://www.postman.com/downloads/

---

## 2️⃣ Test Public APIs

- `POST /auth/register`
- `POST /auth/login`

Login returns JWT token.

---

## 3️⃣ Test Secured APIs

Use header:

```bash
Authorization: Bearer YOUR_JWT_TOKEN
```

Example:

```bash
GET /rules
GET /labs
GET /categories
```

---

# ⚙️ Prerequisites

Before running this project, install:

- Java 17
- Maven
- MySQL
- Node.js
- npm
- Android Studio
- React Native CLI
- Postman (Optional)
- VS Code / Eclipse / IntelliJ IDEA

---

# ⚠️ Troubleshooting

| Problem | Cause | Solution |
|---|---|---|
| Backend not starting | MySQL not running | Start MySQL service |
| Authentication failed | Invalid JWT token | Login again |
| API not working | Backend server stopped | Run Spring Boot server |
| React Native build failed | Dependencies missing | Run `npm install` |
| Android build failed | Invalid drawable name | Use lowercase image names |
| Metro Bundler issue | Cache issue | Run `npx react-native start --reset-cache` |

---

# 🚀 Future Enhancements

- Admin Dashboard
- Push Notifications
- Attendance Management
- Dark Mode
- Cloud Deployment
- Role-Based Access Control
- Profile Management
- File Upload Support

---

# 👩‍💻 Author

**Hema Gayathri Ganisetti**

 

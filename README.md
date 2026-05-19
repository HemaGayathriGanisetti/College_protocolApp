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

## Backend Setup

```bash
cd Backend/protocolapp
mvn spring-boot:run

# ⚙️ Configuration & Setup

## 🗄️ application.properties (Backend)

Configure your MySQL database connection in the backend:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/college_db
spring.datasource.username=root
spring.datasource.password=yourpassword

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

## Frontend Setup
cd frontend
npm install
npx react-native start
npx react-native run-android

# 🔐 Authentication

This project uses a secure authentication system to protect user data and APIs.

## 🔑 Key Features
- JWT (JSON Web Token) based authentication
- Role-based access control (Admin / Student)
- Secure API protection using Spring Security
- Token-based session management (no server-side session storage)
- Automatic authorization for protected routes

# 🧠 Future Improvements

- 📢 Push Notifications  
- 📊 Attendance System  
- 💰 Fee Management Module  
- 📅 Event Booking System  
- 🌙 Dark Mode UI  
- 📈 Analytics Dashboard  

---

# 👨‍💻 Author

**Hema Gayathri Ganisetti**
 

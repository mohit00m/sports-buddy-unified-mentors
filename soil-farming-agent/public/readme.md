# 🌱 Soil Farming Agent

## 📌 Project Overview

Soil Farming Agent is a cloud-based web application developed using **HTML, CSS, JavaScript, and Firebase**.

The application helps users explore soil types and crop/seed distributors.  
The Admin manages soil information and distributor details, while Users can view the information.

This project demonstrates:

- Firebase Authentication
- Role-based access control
- Firestore database integration
- Logging system
- Cloud hosting using Firebase Hosting
- Modular JavaScript architecture

---

# 🚀 Live Deployment

🔗 Live Website:  
https://soil-farming-agent-2026-3a8c3.web.app

---

# 🛠 Technologies Used

- HTML5
- CSS3 (Modern Gradient UI)
- JavaScript (ES Modules)
- Firebase Authentication
- Firebase Firestore Database
- Firebase Hosting
- Git & GitHub

---

# 📂 Project Structure

```
soil-farming-agent/
│
├── firebase.json
├── firestore.rules
│
└── public/
    │
    ├── index.html
    ├── register.html
    ├── login.html
    ├── dashboard.html
    ├── soils.html
    ├── distributors.html
    │
    ├── css/
    │   └── style.css
    │
    └── js/
        ├── firebase-config.js
        ├── auth.js
        ├── logger.js
        ├── role.js
        ├── soil.js
        └── distributor.js
```

---

# 👥 System Modules

## 🔐 ADMIN

- Login
- Add Soil Details
- Update Soil Details
- Delete Soil
- Add Distributor Details
- Update Distributor Details
- Delete Distributor
- View Dashboard Statistics

## 👤 USER

- Register
- Login
- View Soil Details
- View Distributor Details

---

# 📊 Features Implemented

## ✅ Authentication
- Register new user
- Login
- Logout
- Role stored in Firestore
- Admin/User role control

## ✅ Soil Management (CRUD)
- Add soil
- View soil list
- Edit soil
- Delete soil

## ✅ Distributor Management (CRUD)
- Add distributor
- View distributor list
- Edit distributor
- Delete distributor

## ✅ Dashboard Statistics
- Total soils count
- Total distributors count

## ✅ Logging System
Every action is logged in Firestore:

- Register
- Login
- Logout
- Add Soil
- Add Distributor

Collection used:
```
logs
```

## ✅ Modern UI
- Gradient background
- Card-based layout
- Responsive design
- Clean navigation

---

# 🗄 Database Structure (Firestore)

## users
```
users
   └── uid
        ├── name
        ├── email
        └── role (admin/user)
```

## soils
```
soils
   └── autoId
        ├── name
        └── description
```

## distributors
```
distributors
   └── autoId
        ├── name
        └── contact
```

## logs
```
logs
   └── autoId
        ├── action
        ├── uid
        └── timestamp
```

---

# 🔒 Firestore Rules

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /users/{uid} {
      allow read, write: if request.auth != null;
    }

    match /soils/{id} {
      allow read, write: if request.auth != null;
    }

    match /distributors/{id} {
      allow read, write: if request.auth != null;
    }

    match /logs/{id} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

# ⚙️ Setup Instructions (Run Locally)

## 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/soil-farming-agent.git
cd soil-farming-agent
```

## 2️⃣ Install Firebase CLI

```bash
npm install -g firebase-tools
```

## 3️⃣ Login to Firebase

```bash
firebase login
```

## 4️⃣ Initialize Project

```bash
firebase init
```

Select:
- Hosting
- Firestore

## 5️⃣ Deploy

```bash
firebase deploy
```

---

# 🧠 System Architecture

Client (Browser)  
↓  
Firebase Authentication  
↓  
Firestore Database  
↓  
Firebase Hosting  

Architecture Type:  
Client-Side Application with Cloud Backend (BaaS - Backend as a Service)

---

# 🧪 Test Cases

| Test Case | Expected Result |
|-----------|----------------|
| Register new user | User added to Firestore |
| Login user | Redirect to dashboard |
| Add soil | Soil appears in list |
| Edit soil | Soil updates correctly |
| Delete soil | Soil removed |
| Add distributor | Distributor appears |
| Logout | Redirect to login |

---

# 🏗 Optimization Strategy

## Code Level
- Modular JS files
- Reusable Firebase config
- Separated logic per feature

## Architecture Level
- Firebase BaaS reduces backend complexity
- Firestore scalable NoSQL design
- Cloud hosting ensures portability

## Performance
- Minimal external libraries
- Direct Firestore queries
- Efficient DOM rendering

---

# 📈 Project Evaluation Metrics

✔ Modular Code  
✔ Secure Authentication  
✔ Cloud Deployment  
✔ Logging System  
✔ Maintainable Structure  
✔ Portable (Works on all OS)  
✔ GitHub Version Control  

---

# 📌 Future Improvements

- Search functionality
- Role-based UI hiding
- Pagination
- Advanced dashboard analytics
- Dark mode theme

---

# 👨‍💻 Author

Mohit  

GitHub: https://github.com/mohit00m  

---

# 🎯 Conclusion

Soil Farming Agent is a fully functional cloud-based agriculture support system built with Firebase.

The project demonstrates authentication, database integration, logging, deployment, and modular architecture suitable for scalable applications.

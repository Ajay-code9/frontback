# Superadmin Management System

A React + Tailwind CSS application for managing admins and users with role-based access control.

## Features

- **Superadmin Login**: Secure login system for superadmin access
- **Admin Management**: Create, edit, and delete admins with custom permissions
- **Country Assignment**: Assign specific countries to each admin
- **Permission Control**: Granular permission management for admins
- **User Management**: View and manage all users in the system

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open your browser and navigate to:
```
http://localhost:3000/admin
```

## Default Login Credentials

- **Username**: `superadmin`
- **Password**: `admin123`

## Project Structure

```
frontback/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── SuperAdminLogin.js
│   │   ├── SuperAdminDashboard.js
│   │   ├── AdminManagement.js
│   │   ├── CreateAdminModal.js
│   │   ├── EditAdminModal.js
│   │   └── UserManagement.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## Features Overview

### Superadmin Dashboard
- Two main tabs: Admin Management and User Management
- Logout functionality
- Persistent authentication using localStorage

### Admin Management
- Create new admins with User ID and Password
- Assign countries that the admin can access
- Set specific permissions for each admin
- Edit existing admin details
- Delete admins
- Search functionality

### User Management
- View all users in the system
- Filter users by country
- Search users by name, email, or ID
- View user statistics

## Data Persistence

All data (admins, users, authentication state) is stored in browser localStorage for demonstration purposes. In a production environment, this should be replaced with a backend API.


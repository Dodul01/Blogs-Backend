# Blog Management System

## Project Overview

The **Blog Management System** is a robust RESTful API designed to create, manage, and organize blogs. Built with **Node.js**, **Express**, and **Mongoose** this application simplifies the process of managing blog content for authors and administrators.

---

**NOTE: if you try to use any private endpoint make sure you send jwt using this format**

Request Header:Authorization: `Bearer <admin_token>`

---

### Admin login crediential (email and password)

```
    Email: admin@gmail.com
    Password: blogAdmin

```

## Features

### Blog Management

- Add, update, delete, and retrieve blog posts.
- Support for advanced queries, including search, sorting, and filtering.
- Manage blog attributes like title, content, author.

### User Management

- Register new users.
- Login system with JWT-based authentication.
- Role-based access control (Admin/User) to restrict actions.

### Admin Features

- Block users to manage platform security.
- Delete blogs that violate guidelines or are no longer needed.

### Data Validation

- Input validation using Zod to ensure reliable and secure operations.

---

## Technologies Used

- **Node.js**
- **Express**
- **Mongoose**
- **Zod**
- **TypeScript**
- **JWT (JSON Web Tokens)**

---

## How to run the project locally

STEP 1: **Clone the Repository**

```bash
   git clone <repository-url>
   cd <repository-folder>
```

STEP 2: **Install all packge which helps to run the project**

```
    npm install
```

STEP 3: **Create a .env file in the project root and add the following variables**

```
    PORT=5000
    DATABASE_URL=YOUR_DATABASE_URL
    JWT_ACCESS_SECRET=YOUR_ACCESS_SECRET
    JWT_REFRESH_SECRET=YOUR_REFRESH_SECRET
    JWT_ACCESS_EXPIRY=1h
    JWT_REFRESH_EXPIRY=7d

```

STEP 4: **Start the server with the following command**

```
    npm run dev

```

**The project should run on the port you set locally on your .env file.**

---

## API Endpoints

### Authentication

| Method | Endpoint             | Description              |
| ------ | -------------------- | ------------------------ |
| POST   | `/api/auth/register` | Register to the platform |
| POST   | `/api/auth/login`    | Log In to the platform   |

---

### Blog Management

| Method | Endpoint         | Description   |
| ------ | ---------------- | ------------- |
| POST   | `/api/blogs`     | Create blog   |
| PATCH  | `/api/blogs/:id` | Update blog   |
| DELETE | `/api/blogs/:id` | Delete blog   |
| GET    | `/api/blogs`     | Get all blogs |

**Use this to filter through all blogs**

`/api/blogs?search=technology&sortBy=createdAtsortOrder=desc&filter=authorID`

### Admin Actions

| Method | Endpoint                         | Description |
| ------ | -------------------------------- | ----------- |
| PATCH  | `/api/admin/users/:userId/block` | Block User  |
| DELETE | `/api/admin/blogs/:id`           | Delete blog |

# 🛠️ Backend API Documentation

## 📌 POST `/users/register`

### ✅ Description
Registers a new user into the system.

---

### 📤 Request Headers

| Header         | Value              | Required | Description             |
|----------------|--------------------|----------|-------------------------|
| Content-Type   | application/json   | ✅       | Must be set for JSON body |

---

### 🧾 Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

---

### 🔍 Validation Rules

| Field                 | Rule                                      |
|----------------------|-------------------------------------------|
| `fullname.firstname` | Must be at least 3 characters long        |
| `email`              | Must be a valid email format              |
| `password`           | Must be at least 6 characters long        |

---

### 🟢 Success Response

**Status Code:** `201 Created`

```json
{
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

---

### 🔴 Error Response

**Status Code:** `400 Bad Request` – Input validation errors

```json
{
  "errors": [
    {
      "type": "field",
      "msg": "First name must be at least 3 characters long",
      "path": "fullname.firstname",
      "location": "body"
    },
    {
      "type": "field",
      "msg": "Invalid Email",
      "path": "email",
      "location": "body"
    }
  ]
}
```

---

### 🛑 Other Error Scenarios

- **Email already exists** – handled by MongoDB's unique constraint
- **Internal server errors** – status `500` with relevant error message

---
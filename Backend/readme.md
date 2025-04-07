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

## 📌 POST `/users/login`

### ✅ Description
Authenticates a user and returns a JWT token.

---

### 📤 Request Headers

| Header         | Value              | Required | Description             |
|----------------|--------------------|----------|-------------------------|
| Content-Type   | application/json   | ✅       | Must be set for JSON body |

---

### 🧾 Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

---

### 🔍 Validation Rules

| Field       | Rule                             |
|-------------|----------------------------------|
| `email`     | Must be a valid email format     |
| `password`  | Must be at least 6 characters long |

---

### 🟢 Success Response

**Status Code:** `200 OK`

```json
{
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

### 🔴 Error Responses

#### 🔐 400 - Validation Errors

```json
{
  "errors": [
    {
      "type": "field",
      "msg": "Invalid Email",
      "path": "email",
      "location": "body"
    }
  ]
}
```

#### ❌ 401 - Invalid Credentials

```json
{
  "message": "Invalid email or password"
}
```

---

## 📌 GET `/users/profile`

### ✅ Description
Returns the currently logged-in user's profile information.

---

### 🔐 Authorization

| Header | Value                    | Required | Description                 |
|--------|--------------------------|----------|-----------------------------|
| Cookie | token=JWT_TOKEN          | ✅       | JWT Token from login        |

---

### 🟢 Success Response

**Status Code:** `200 OK`

```json
{
  "_id": "user_id",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}
```

---

### 🔴 Error Response

**Status Code:** `401 Unauthorized`

```json
{
  "message": "Unauthorized"
}
```

---

## 📌 GET `/users/logout`

### ✅ Description
Logs out the user by blacklisting their JWT token and clearing the cookie.

---

### 🔐 Authorization

| Header | Value                    | Required | Description                 |
|--------|--------------------------|----------|-----------------------------|
| Cookie | token=JWT_TOKEN          | ✅       | JWT Token from login        |

---

### 🟢 Success Response

**Status Code:** `200 OK`

```json
{
  "message": "Logged out"
}
```

---

### 🔴 Error Response

**Status Code:** `401 Unauthorized`

```json
{
  "message": "Unauthorized"
}
```

---

## 🔐 Token Blacklisting

- On logout, the user's token is blacklisted for **24 hours** using a TTL MongoDB schema.
- All protected routes check against the blacklist before proceeding.

---

## 📌 POST /captain/register

### ✅ Description
Registers a new captain into the system.

---

### 📤 Request Headers

| Header         | Value              | Required | Description             |
|----------------|--------------------|----------|-------------------------|
| Content-Type   | application/json   | ✅       | Must be set for JSON body |

---

### 🧾 Request Body

json{  "fullname": {    "firstname": "John",    "lastname": "Doe"  },  "email": "john.doe@example.com",  "password": "securePassword123",  "vehicle": {    "color": "red",    "plate": "XYZ123",    "capacity": 4,    "vehicleType": "car"  },  "location": {    "latitude": 40.7128,    "longitude": -74.0060  }}

---

### 🔍 Validation Rules

| Field                 | Rule                                      |
|----------------------|-------------------------------------------|
| fullname.firstname   | Must be at least 3 characters long        |
| email                | Must be a valid email format              |
| password             | Must be at least 6 characters long        |
| vehicle.color        | Must be at least 3 characters long        |
| vehicle.plate        | Must be at least 3 characters long        |
| vehicle.capacity     | Must be at least 1                        |
| vehicle.vehicleType  | Must be one of ['car', 'motorcycle', 'auto'] |

---

### 🟢 Success Response

**Status Code:** `201 Created`
```json
{ 
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "captain": { 
    "_id": "captain_id",
    "fullname": { 
      "firstname": "John",
      "lastname": "Doe" 
    },
    "email": "john.doe@example.com",
    "vehicle": { 
      "color": "red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car" 
    } 
  } 
}
```

---

### 🔴 Error Response

**Status Code:** `400 Bad Request – Input validation errors`
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

- **Captain already exists** – handled by MongoDB's unique constraint
- **Internal server errors** – status 500 with relevant error message

---
# API Documentation

## Endpoint: `/api/v1/users/register`

### Description

This endpoint is used to register a new user. It requires the user's first name, last name, email, and password. The endpoint validates the input data, hashes the password, creates a new user in the database, and returns a JSON Web Token (JWT) for authentication.

### Method

`POST`

### Request Body

The request body should be a JSON object containing the following fields:

- `fullName`: An object containing the user's first and last name.
  - `firstName`: The user's first name (minimum 3 characters).
  - `lastName`: The user's last name (minimum 3 characters).
- `email`: The user's email address (must be a valid email).
- `password`: The user's password (minimum 6 characters).

Example:

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Response

- Success (201 Created)

If the user is successfully registered, the response will contain the JWT token and user data.

Example:

```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id_here",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

- Error (400 Bad Request)

If there are validation errors or the email is already registered, the response will contain an error message.

Example:

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

Example:

```json
{
  "success": false,
  "message": "This email is already registered.",
  "error": "This email is already registered."
}
```

Example:

```json
{
  "success": false,
  "message": "An error occurred while creating the account. Please try again later.",
  "error": "error_message_here"
}
```

## User Login API

### Endpoint: /api/v1/users/login

### Description

This endpoint allows users to log in by providing their email and password. The user details are validated, and a JSON Web Token (JWT) is generated and returned upon successful authentication.

### Method POST

### Request Body

The request body should be a JSON object containing the following fields:

- email (string, required): The user's email address. Must be a valid email format.
- password (string, required): The user's password. Must be at least 6 characters long.

# Example Request

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Responses

### Success

- Status Code: 200 OK

```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id_here",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

## Validation Errors

- Status Code: 400 Bad Request

### Response Body:

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "password must be 6 characters",
      "param": "password",
      "location": "body"
    }
  ]
}
```

## Invalid Credentials

- Status Code: 401 Unauthorized

```json
{
  "success": false,
  "message": "Invalid email or password."
}
```

## Server Error

- Status Code: 500 Internal Server Error

```json
{
  "success": false,
  "message": "An error occurred while logging in. Please try again later.",
  "error": "error_message_here"
}
```

# User Profile API

## Endpoint: /api/v1/users/profile

### Description

This endpoint allows authenticated users to retrieve their profile information.

# Method GET

## Headers

- Authorization (string, required): The JWT token of the authenticated user.

### Responses

### Success

- Status Code: 200 OK

### Response Body:

```json
{
  "_id": "user_id_here",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com"
}
```

## Unauthorized

- Status Code: 401 Unauthorized

### Response Body

```json
{
  "message": "Unauthorized"
}
```

## Server Error

- Status Code: 500 Internal Server Error

### Response Body:

```json
{
  "success": false,
  "message": "An error occurred while retrieving the profile. Please try again later.",
  "error": "error_message_here"
}
```

# User Logout API

## Endpoint: /api/v1/users/logout

### Description

This endpoint allows authenticated users to log out by invalidating their JWT token.

### Method GET

#### Headers

- Authorization (string, required): The JWT token of the authenticated user.

### Responses

### Success

- Status Code: 200 OK

### Response Body:

```json
{
  "message": "Logged out successfully"
}
```

## Unauthorized

- Status Code: 401 Unauthorized

### Response Body:

```json
{
  "message": "Unauthorized"
}
```

## Server Error

- Status Code: 500 Internal Server Error

### Response Body:

```json
{
  "success": false,
  "message": "An error occurred during logout. Please try again later.",
  "error": "error_message_here"
}
```

# Captain Registration API

## Endpoint: /api/v1/captain/register

### Description

This endpoint allows captains to register by providing their first name, last name, email, password, and vehicle details. The captain details are validated, hashed, and stored in the database. A JSON Web Token (JWT) is generated and returned upon successful registration.

### Method POST

### Request Body

The request body should be a JSON object containing the following fields:

- fullName.firstName (string, required): The captain's first name. Must be at least 3 characters long.
- fullName.lastName (string, required): The captain's last name. Must be at least 3 characters long.
- email (string, required): The captain's email address. Must be a valid email format.
- password (string, required): The captain's password. Must be at least 8 characters long.
- vehicle.color (string, required): The color of the captain's vehicle. Must be at least 3 characters long.
- vehicle.plateNumber (string, required): The plate number of the captain's vehicle. Must be between 1 and 15 characters long.
- vehicle.capacity (number, required): The capacity of the captain's vehicle. Must be a number.
- vehicle.vehicleType (string, required): The type of the captain's vehicle. Must be one of motorcycle, scooty, or car.

### Example Request

```json
{
  "fullName": {
    "firstName": "Jane",
    "lastName": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Red",
    "plateNumber": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Responses Success

- Status Code: 201 Created

### Response Body:

```json
{
  "token": "jwt_token_here",
  "captain": {
    "_id": "captain_id_here",
    "fullName": {
      "firstName": "Jane",
      "lastName": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plateNumber": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

### Validation Errors

- Status Code: 400 Bad Request

### Response Body:

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be 3 characters",
      "param": "fullName.firstName",
      "location": "body"
    },
    {
      "msg": "Last name must be 3 characters",
      "param": "fullName.lastName",
      "location": "body"
    },
    {
      "msg": "password must be 8 characters",
      "param": "password",
      "location": "body"
    },
    {
      "msg": "Color must be 3 characters",
      "param": "vehicle.color",
      "location": "body"
    },
    {
      "msg": "Plate number should not be less than 1 and greater than 15 characters",
      "param": "vehicle.plateNumber",
      "location": "body"
    },
    {
      "msg": "Capacity must be a number",
      "param": "vehicle.capacity",
      "location": "body"
    },
    {
      "msg": "Invalid vehicle type",
      "param": "vehicle.vehicleType",
      "location": "body"
    }
  ]
}
```

### Email Already Registered

- Status Code: 400 Bad Request

### Response Body:

```json
{
  "error": "Captain already registered"
}
```

### Server Error

- Status Code: 500 Internal Server Error

### Response Body:

```json
{
  "error": "error_message_here"
}
```

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

#### Success (201 Created)

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

#### Error (400 Bad Request)

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

``
```

## User Login API

### Endpoint: /api/v1/users/login

### Description

This endpoint allows users to log in by providing their email and password. The user details are validated, and a JSON Web Token (JWT) is generated and returned upon successful authentication.

### Method POST

### Request Body

The request body should be a JSON object containing the following fields:

- email (string, required): The user's email address. Must be a valid email format.
  -password (string, required): The user's password. Must be at least 6 characters long.

# Example Request

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Responses

### Success

### Status Code: 200 OK

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

### Status Code: 400 Bad Request

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

### Status Code: 401 Unauthorized

```json
{
  "success": false,
  "message": "Invalid email or password."
}
```

## Server Error

### Status Code: 500 Internal Server Error

```json
{
  "success": false,
  "message": "An error occurred while logging in. Please try again later.",
  "error": "error_message_here"
}
```

# User Registration API

## Endpoint: `/api/v1/users/register`

### Description

This endpoint allows users to register by providing their first name, last name, email, and password. The user details are validated, hashed, and stored in the database. A JSON Web Token (JWT) is generated and returned upon successful registration.

### Method

`POST`

### Request Body

The request body should be a JSON object containing the following fields:

- `fullName.firstName` (string, required): The user's first name. Must be at least 3 characters long.
- `fullName.lastName` (string, required): The user's last name. Must be at least 3 characters long.
- `email` (string, required): The user's email address. Must be a valid email format and at least 5 characters long.
- `password` (string, required): The user's password. Must be at least 6 characters long.

### RESPONSE BODY

-`user` (object);

- `fullName.firstName` (string, required): The user's first name. Must be at least 3 characters long.
  - `fullName.lastName` (string, required): The user's last name. Must be at least 3 characters long.
  - `email` (string, required): The user's email address. Must be a valid email format and at least 5 characters long.
- `password` (string, required): The user's password. Must be at least 6 characters long. -`token`(String): JWT Token

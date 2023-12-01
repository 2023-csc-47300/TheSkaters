# Rollerblade Store API
## Overview

This API serves as the backend for a Rollerblade Store application, providing endpoints to manage rollerblade products.
Getting Started

## Installation

To install the required packages, use pip and the provided requirements.txt file:

```bash
pip install -r requirements.txt
```

## Running the Application

Run the application using Python3:

```bash
python3 app.py
```

## API Routes

## Products

#### Fetching Products

Endpoint: http://127.0.0.1:8080/products/

Description: Fetches all rollerblade products available in the store.

HTTP Method: GET

Example:

```bash
curl http://127.0.0.1:8080/products/
```

Response Format: JSON

```json

[
    {
        "color": "red",
        "description": "test",
        "model": "y-4",
        "name": "Pro Speed Rollerblades",
        "price": "100",
        "product_id": 1,
        "size": "7",
        "type": "rollerblades"
    },
    ...
]
```

### Users

#### Sign Up

Endpoint: http://127.0.0.1:8080/users/signup

Description: sign up a new user

HTTP Method: POST

Example:

```bash
curl -X POST -H "Content-Type: application/json" -d '{
    "first_name": "John",
    "last_name": "Doe",
    "email": "josdfahn@asdfasexample.com",
    "password": "password123"
}' http://127.0.0.1:8080/users/signup
```

Response Format: JSON

```json

{
  "email": "josdfahnn@asdfasexample.com",
  "first_name": "John",
  "last_name": "Doe",
  "user_id": 4
}
```

#### Log In

Endpoint: http://127.0.0.1:8080/users/login

Description: login existing user

HTTP Method: POST

Example:

```bash
curl -X POST -H "Content-Type: application/json" -d '{
    "email": "josdfahn@asdfasexample.com",
    "password": "password123"
}' http://127.0.0.1:8080/users/login
```

Response Format: JSON

```json

{
  "email": "josdfahnn@asdfasexample.com",
  "first_name": "John",
  "last_name": "Doe",
  "user_id": 4
}
```

#### Log Out

Endpoint: http://127.0.0.1:8080/users/logout

Description: logout

HTTP Method: POST

Example:

```bash
curl -X POST http://127.0.0.1:8080/users/logout
```

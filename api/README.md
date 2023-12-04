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

### Products

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
    "color": "black",
    "description": "The Delta is brand new to the Roller Derby Elite inline skate line! This is designed for experienced skaters looking for an enjoyable ride with performance components. The boot features a lateral support system and adjustable straps for ultimate stability. The hybrid aluminum frame offers first-rate maneuverability and the Kemistry 110mm will have you reaching maximum speeds. This is a great choice for experienced skaters ready for an upgrade!",
    "image_url": "https://cdn11.bigcommerce.com/s-dmke2u/images/stencil/1280x1280/products/3137/27047/RD_inline_elite_main__12436.1634142585.jpg?c=2",
    "model": "Roller Derby",
    "name": "Roller Derby Elite Delta Inline Skates",
    "price": "169.99",
    "product_id": 2,
    "size": "5,6,7,10",
    "type": "inline_skates"
  },
  {
    "color": "pink",
    "description": "FILA - The Brand You Know for High Performance   For the most demanding skaters that require a skate dedicated to fitness and training, the FILA Madame Houdini is the perfect solution. This skate offers high protection thanks to the plastic structure, all-around performance and a look that will not go unnoticed! On the very first wear this skate will be comfortable and offer perfect support to the ankle, thanks to the presence of a rigid cuff, micro-adjustment locking lever and anatomic padding, thus allowing an effective transfer of force to the wheels, for immediate changes of direction and maximum dynamism.   The fit is customizable thanks to the closure system composed of laces and double lever, on the instep and cuff. On the heel a shock absorber insert is able to effectively dissipate the impact with the ground. The frame, made of aluminum, delivers lateral adjustment, plus it offers housing for two different sets of wheels: it can in fact carry 4 wheels of 80 or 84 mm, or 3 wheels of 90 or 100, to allow all skaters to customize based on their own skating style.",
    "image_url": "https://cdn11.bigcommerce.com/s-dmke2u/images/stencil/1280x1280/products/3045/24033/apindonwt__31204.1634142839.jpg?c=2",
    "model": "FILA",
    "name": "FILA Madame Houdini Ladies' Inline Skates",
    "price": "129.99",
    "product_id": 1,
    "size": "6,7,8.5,9,10",
    "type": "inline_skates"
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

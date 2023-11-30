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

### Fetching Products

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

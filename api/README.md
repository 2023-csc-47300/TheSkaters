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
        "id": 1,
        "name": "Pro Speed Rollerblades",
        "type": "Fitness",
        "price": 149.99,
        "model": "AB4G92CD",
        "size": "M",
        "color": "Red",
        "description": "Designed for maximum speed and performance."
    },
    {
        "id": 2,
        "name": "UltraGlide Inline Skates",
        "type": "Speed",
        "price": 189.5,
        "model": "XY7H34ZR",
        "size": "L",
        "color": "Blue",
        "description": "Perfect for tricks and stunts, built to last."
    },
    ...
]
```

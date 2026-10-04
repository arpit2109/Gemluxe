# Luxury Jewelry Showroom

A high-assurance, luxury e-commerce platform built with Django 5 and React 18.

## Features
- **Premium UX**: Gold/Black theme, smooth animations, and responsive design.
- **Real-time Inventory**: WebSocket integration for live stock updates.
- **Secure Auth**: OTP-based authentication with JWT.
- **Cart & Checkout**: Full shopping cart functionality.

## Tech Stack
- **Backend**: Python 3.11+, Django 5, Django Rest Framework, Channels (Redis).
- **Frontend**: React 18, Vite, Tailwind CSS, Axios.
- **Database**: PostgreSQL (configured), SQLite (default for dev).

## Setup Instructions

### Prerequisites
- Python 3.11+
- Node.js 18+
- Redis (for WebSocket support)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # Unix
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run migrations:
   ```bash
   python manage.py migrate
   ```
5. Start the server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## API Documentation
- **Auth**: `POST /api/auth/otp/request`, `POST /api/auth/otp/verify`
- **Products**: `GET /api/products/` (Supports filtering by `category`, `metal_type`)
- **Orders**: `POST /api/orders/`

## Real-time Features
- Connect to `ws://localhost:8000/ws/inventory/{product_id}/` to receive stock updates.


## Django secret key

Set DJANGO_SECRET_KEY in the environment before starting the backend. Generate a local key with python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())". The settings fallback is for local development only; configure your own key for deployments.

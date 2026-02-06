# 🎬 RMDB - React Movie Database

A full-stack movie database application built with React and Node.js, powered by The Movie Database (TMDB) API.

![RMDB](https://image.tmdb.org/t/p/original/628Dep6AxEtDxjZoGP78TsOxYbK.jpg)

## ✨ Features

- **🔐 User Authentication**
  - Email/Password registration and login
  - Google OAuth integration
  - JWT-based session management
  - Protected routes for authenticated users

- **🎥 Movie Discovery**
  - Browse popular movies
  - Search movies by title
  - View detailed movie information
  - See cast and crew details

- **📱 Responsive Design**
  - Mobile-friendly interface
  - Modern UI with styled-components

## 🏗️ Tech Stack

### Frontend
- **React** - UI framework
- **React Router** - Client-side routing
- **Styled Components** - CSS-in-JS styling
- **TMDB API** - Movie data

### Backend
- **Node.js + Express** - Server framework
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **JWT** - Authentication tokens
- **Google Auth Library** - OAuth integration

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Frontend web server

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed
- TMDB API key ([get one here](https://www.themoviedb.org/settings/api))
- Google OAuth credentials (optional, for Google sign-in)

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd reactMovieApp
```

### 2. Configure environment
Copy the example environment file and update with your values:

```env
# TMDB API
REACT_APP_API_KEY=your_tmdb_api_key

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id

# Database
POSTGRES_USER=rmdb_user
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=rmdb_database

# JWT Secrets (change these!)
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key
```

### 3. Start the application
```bash
make prod
```

Or for development with live logs:
```bash
make dev
```

### 4. Access the app
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001
- **Health Check:** http://localhost:3001/health

## 📋 Available Commands

| Command | Description |
|---------|-------------|
| `make help` | Show all available commands |
| `make build` | Build all Docker images |
| `make up` | Start all services |
| `make down` | Stop all services |
| `make dev` | Start with live logs |
| `make prod` | Start in production mode |
| `make logs` | View all logs |
| `make clean` | Remove containers and volumes |
| `make migrate` | Run database migrations |
| `make status` | Check service status |

## 📁 Project Structure

```
reactMovieApp/
├── docker-compose.yml     # Container orchestration
├── Makefile               # Development commands
├── .env                   # Environment variables
├── frontend/
│   ├── Dockerfile         # Frontend container
│   ├── nginx.conf         # Nginx configuration
│   ├── public/            # Static assets
│   └── src/
│       ├── components/    # React components
│       ├── hooks/         # Custom hooks
│       ├── images/        # Image assets
│       ├── API.js         # TMDB API calls
│       ├── config.js      # App configuration
│       └── context.js     # React context
└── backend/
    ├── Dockerfile         # Backend container
    ├── prisma/            # Database schema
    └── src/
        ├── controllers/   # Route handlers
        ├── middleware/    # Auth middleware
        ├── models/        # Data models
        ├── repositories/  # Database queries
        ├── routes/        # API routes
        └── services/      # Business logic
```

## 🔒 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/google` | Google OAuth login |
| POST | `/api/auth/refresh` | Refresh tokens |
| POST | `/api/auth/logout` | Logout user |
| POST | `/api/auth/forgot-password` | Request password reset |
| POST | `/api/auth/reset-password` | Reset password |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/me` | Get current user |
| PUT | `/api/users/me` | Update current user |

## 🎨 Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Landing page |
| `/login` | Public | Login page |
| `/signup` | Public | Registration page |
| `/movies` | Protected | Movie list |
| `/movie/:id` | Protected | Movie details |


## 🙏 Credits

- Movie data provided by [The Movie Database (TMDB)](https://www.themoviedb.org/)
- Icons and design inspiration from various open-source projects

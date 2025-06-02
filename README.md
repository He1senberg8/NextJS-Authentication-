# Next.js Auth App

A simple authentication app built with Next.js, TypeScript, and MongoDB. This project demonstrates user signup, login, email verification, profile management, and logout functionality using API routes and server components.

## Features
- User Signup with Email Verification
- User Login & Logout
- Profile Page (with dynamic route)
- JWT-based Authentication
- MongoDB Integration
- API Routes for Auth


## Folder Structure
```
src/
  app/
    api/users/        # API routes for user authentication
    login/            # Login page
    signup/           # Signup page
    profile/          # Profile page (with [id] dynamic route)
    verifyemail/      # Email verification page
    globals.css       # Global styles
    layout.tsx        # Root layout
    page.tsx          # Home page
  components/
    loader.tsx        # Loader component
  dbConfig/
    dbConfig.ts       # MongoDB connection config
  helpers/
    getDataFromToken.ts # JWT helper
    mail.ts           # Email sending helper
  models/
    userModel.js      # Mongoose user model
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB instance (local or cloud)

### Installation
```bash
npm install
```

### Environment Variables
Create a `.env.local` file in the root with the following:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Running the App
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints
- `POST /api/users/signup` — Register a new user
- `POST /api/users/login` — Login user
- `POST /api/users/logout` — Logout user
- `GET /api/users/me` — Get current user profile
- `POST /api/users/verifyemail` — Verify user email

## Technologies Used
- Next.js 14 (App Router)
- TypeScript
- MongoDB & Mongoose
- JWT (jsonwebtoken)
- Nodemailer
- Tailwind CSS (if used)

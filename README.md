# CipherStudio Backend

Node.js/Express API server with MongoDB for CipherStudio code editor.

## Quick Start

```bash
npm install
cp .env.example .env
# Edit .env with MongoDB URI and JWT secret
npm run dev
```

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs for password hashing

## API Routes

### Authentication (`/api/auth`)
- `POST /register` - Register user
- `POST /login` - Login user
- `GET /validate` - Validate token

### Projects (`/api/projects`)
- `POST /save` - Save project (protected)
- `GET /load/:id` - Load project (protected)

## Environment Variables

```env
MONGODB_URI=your-mogodb-uri
PORT=4000
JWT_SECRET=your-secret-key
NODE_ENV=development
```

## Scripts

- `npm run dev` - Development with nodemon
- `npm start` - Production server

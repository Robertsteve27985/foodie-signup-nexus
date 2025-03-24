
# FoodieNexus - MERN Stack Application

This is a food delivery application built with the MERN stack (MongoDB, Express, React, Node.js).

## Project Structure

The project is divided into two main folders:
- `frontend`: Contains the React application
- `backend`: Contains the Express.js server and MongoDB connection

## Getting Started

### Backend Setup

1. Navigate to the backend folder:
```
cd backend
```

2. Install dependencies:
```
npm install
```

3. Set up your MongoDB connection by creating a `.env` file with:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/foodieNexus
```

4. Seed the database with initial food data:
```
npm run seed
```

5. Start the backend server:
```
npm run dev
```

### Frontend Setup

1. Navigate to the frontend folder:
```
cd frontend
```

2. Install dependencies:
```
npm install
```

3. Start the frontend development server:
```
npm start
```

## Features

- Food browsing and ordering
- Cart functionality
- User authentication
- Order tracking
- Responsive design with Tailwind CSS

## API Endpoints

- `GET /api/foods`: Get all foods
- `GET /api/foods/:id`: Get a specific food by ID

## Technologies Used

- **Frontend**: React, React Router, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **State Management**: React Hooks and Context API

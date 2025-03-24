
#!/bin/bash

# Install concurrently in the root directory
npm install concurrently

# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..

# Seed the database
cd backend
node seedData.js
cd ..

# Start both servers
npx concurrently "cd backend && npm start" "cd frontend && npm start"

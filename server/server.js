import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js';


// Initialize express
const app = express()

// Connect to MongoDB
await  connectDB();

// Middleware
app.use(cors())
app.use(express.json())

// Route
app.get('/', (req, res) => {
  res.send('API Working')
})

// Port
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

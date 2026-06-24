import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())

// Routes
app.get('/api/hello', (req, res) => {
  res.json({ message: '👋 Hello from Backend!' })
})

app.get('/api/data', (req, res) => {
  res.json({
    status: 'success',
    data: [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' }
    ]
  })
})

app.post('/api/submit', (req, res) => {
  const { message } = req.body
  res.json({
    status: 'success',
    received: message,
    timestamp: new Date()
  })
})

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Server running at http://localhost:${PORT}`)
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api\n`)
})

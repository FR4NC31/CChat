import express from 'express'
import dotenv from 'dotenv'
import path from 'path'

//routes
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import { connectDB } from './lib/db.js'

dotenv.config()

const app = express()
const __dirname = path.resolve()

const PORT = process.env.PORT || 3000

app.use(express.json()) //req.body

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error('Global error handler:', err.stack)
    res.status(500).json({ message: 'Something went wrong!' })
})

//make ready fot development
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../frontend/dist')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend','dist','index.html'))
    })
}

app.listen(PORT, () => {
    console.log('Server started on port:', + PORT)
    connectDB()
})

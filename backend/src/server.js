import express from 'express'
import dotenv from 'dotenv'
import path from 'path'

//routes
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'

dotenv.config()

const app = express()
const __dirname = path.resolve()

const PORT = process.env.PORT || 3000

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

//make ready fot development
if (process.env.NODE_env === "production") {
    app.use(express.static(path.join(__dirname, '../frontend/dist')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend','dist','index.html'))
    })
}

app.listen(PORT, () => console.log('Server started on port:', + PORT))

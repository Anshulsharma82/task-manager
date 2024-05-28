const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const unmatchedRoutes = require('./middleware/unmatchedRoutes')
const errorHandler = require('./middleware/error-handler')

app.use(express.static('./public'));
app.use(express.json()) // Parse JSON req


app.use('task-manager', tasks) // Routes
app.use(unmatchedRoutes) // Middleware: To Handle routes which we have not specified
app.use(errorHandler) // To handle unknown errors(default errors)
const PORT = process.env.PORT

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, () => {
            console.log(`Server is running on port number ${PORT}.....`)
        })
    } catch (err) {
        console.log("Error while connecting to DB...",err)
    }
}

start()

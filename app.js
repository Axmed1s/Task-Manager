const express = require('express');
const app = express();
const tasks = require('./routes/tasks')
const auth = require('./routes/auth')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/notfound')
const errorHandlerMiddleware = require('./middleware/error-handler')
const helmet = require('helmet');  // Added for security headers
const morgan = require('morgan');  // Added for logging requests (optional)

// Middleware
app.use(express.json());   


app.use(morgan('dev'));


app.use(helmet());   

app.use(express.json())

app.use('/api/v1/auth', auth)
app.use('/api/v1/tasks',tasks)

app.use(notFound)
app.use(errorHandlerMiddleware)

const port=process.env.PORT || 3000;

const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => console.log('server is listening'))
    } catch (error) {
        console.log(error)
    }
}

start()
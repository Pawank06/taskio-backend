import express from 'express';
import globalErrorHandler from './middlewares/globalErrorHandler';
import userRoutes from './routes/userRoutes';



const app = express()
app.use(express.json());


app.get("/", (req, res, next) => {
    res.json({
        message: "Welcome"
    })
})

app.use("/api/users", userRoutes)

// global error handler

app.use(globalErrorHandler)

export default app
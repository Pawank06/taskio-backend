import express from 'express';
import globalErrorHandler from './middlewares/globalErrorHandler';
import userRoutes from './routes/userRoutes';
import boardRoutes from './routes/boardRouter';



const app = express()
app.use(express.json());


app.get("/", (req, res, next) => {
    res.json({
        message: "Welcome"
    })
})

app.use("/api/users", userRoutes)
app.use("/api/boards", boardRoutes)

// global error handler

app.use(globalErrorHandler)

export default app
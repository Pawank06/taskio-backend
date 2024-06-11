import express from 'express';
import globalErrorHandler from './middlewares/globalErrorHandler';
import userRoutes from './routes/userRoutes';
import boardRoutes from './routes/boardRouter';
import taskRoutes from './routes/taskRoutes';
import cookieParser from 'cookie-parser';



const app = express()
app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res, next) => {
    res.json({
        message: "Welcome"
    })
})

app.use("/api/users", userRoutes)
app.use("/api/boards", boardRoutes)
app.use("/api/tasks", taskRoutes)

// global error handler

app.use(globalErrorHandler)

export default app
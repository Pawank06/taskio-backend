
import express from 'express';
import {config} from './src/config/config';
import connectDB from './src/config/dbConfig';
import app from './src/app';


const startServer = async () => {
    await connectDB()
    const port = config.port || 3000

    app.listen(port, () => {
        console.log(`Starting server on port ${port}`)
    })
}

startServer()
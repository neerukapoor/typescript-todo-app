import express from 'express';
const app = express();
import mongoose from 'mongoose';
import cors from 'cors';
const PORT = 3000;
import * as dotenv from 'dotenv';
import indexRouter from './routes/index';
import authRouter from './routes/auth';
dotenv.config();

app.use(express.json());
app.use(cors());



app.use("/", indexRouter);
app.use("/auth", authRouter);

if(process.env.MONGO_DATABASE)
{
    mongoose.connect(process.env.MONGO_DATABASE)
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB: " + error);
    });
}
else {
    console.log("Error Connecting to MongoDb, connection string is not present")
}


app.listen(3000, () => {
    console.log(`Server listning on port ${PORT}`)
})
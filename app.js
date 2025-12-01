import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./route/user.js";


const app = express()
app.use(express.json());
  
dotenv.config();

// Routes
app.use("/api/users", userRouter);

app.listen(3000, () => {
console.log(`backend is running in port${process.env.PORT}`)
})

console.log(`My Name Dee`)


app.get('/',(req,res)=>{
    res.send('Hello Queen')
})

mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log("connected to my database dike");
}).catch((err) =>{
    console.log('Error connecting to Database', err);
});
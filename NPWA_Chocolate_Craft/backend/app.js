import express from "express";
import mongoose from "mongoose";
import chocolateRouter from "./routes/chocolateRoute.js";
import producerRouter from "./routes/producerRoute.js";
import userRouter from "./routes/userRoute.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express()
const db = mongoose.connect('mongodb://localhost/chocolatesDD')
const port = process.env.PORT || 3000


app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.use(bodyParser.urlencoded({extended: true}));
 
app.use(bodyParser.json({type: 'application/json'}));
 
app.use(express.json())
 
app.use(cors({origin: "*", credentials: true}));
 

app.use('/api', chocolateRouter)
app.use('/api', producerRouter)
app.use('/api', userRouter)

app.listen(port, () => {
    console.log("Running on port" + port);
})
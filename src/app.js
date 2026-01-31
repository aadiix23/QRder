import express from "express";
import morgan from "morgan";
import cors from "cors";

const app=express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


//health check
app.get("/health",(req,res)=>{
    res.json({status:"OK",time:new Date()});
});

export default app;
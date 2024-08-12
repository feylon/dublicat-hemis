import express from "express";
import http from "http";
import dotenv from "dotenv";

dotenv.config();
// import files
import pool  from "./functions/datatabase.js"
import { release } from "os";

global.pool = pool;

const app = express();

// Middlewares
app.use(express.static("./static"))
 




// database connect
   
try {
    await pool.connect();
    console.log("Connect database")
} catch (error) {
    console.log("Database error ", error);
}

const server = http.createServer(app);

let PORT = process.env.PORT;



server.listen(PORT, ()=>{
    console.log(`${PORT}da tizim ishga tushdi`)
})
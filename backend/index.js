import express from "express";
import http from "http";
import dotenv from "dotenv";
import cors from "cors"

dotenv.config();
// import files
import pool  from "./functions/datatabase.js"
import Dean from "./Routers/Dean/index.js";
import region from "./functions/another/get_regions.js"


global.pool = pool;

const app = express();

// Middlewares
app.use(express.static("./static"))
app.use(express.json())
app.use(cors());



// database connect
   
try {
    await pool.connect();
    console.log("Connect database")
} catch (error) {
    console.log("Database error ", error);
}

// Routers
 Dean.forEach(element =>{
 app.use(`/dean${element.path}`, element.route);   
 });
 app.use("/viloyat",region)



const server = http.createServer(app);
let PORT = process.env.PORT;
server.listen(PORT, ()=>{
    console.log(`${PORT}da tizim ishga tushdi`)
})
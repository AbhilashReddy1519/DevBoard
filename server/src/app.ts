// External Modules
import express, { Express } from "express";
// Local Modules
import router from "./routes/index";


const app: Express = express(); 

// --- Middleware ---
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// --- Local Routes ---
app.use("/api", router);


export default app;
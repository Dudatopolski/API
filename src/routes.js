import express from "express";
import usercontroller from "./controllers/usercontroller.js"

const routes = express();
routes.use("/user", usercontroller);

export default routes;
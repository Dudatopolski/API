import express from "express";
import usercontroller from "./controllers/usercontroller.js"
import atorcontroller from "./controllers/atorcontroller.js"
import premiacaocontroller from "./controllers/premiacaocontroller.js"
import generocontroller from "./controllers/generocontroller.js"
import diretorcontroller from "./controllers/diretorcontroller.js"

const routes = express();

routes.use("/user", usercontroller);
routes.use("/ator", atorcontroller);
routes.use("/diretor", diretorcontroller);
routes.use("/genero", generocontroller);
routes.use("/premiacao", premiacaocontroller);

export default routes;



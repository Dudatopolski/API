import express from "express";
import usercontroller from "./controllers/usercontroller.js"
import atorcontroller from "./controllers/atorcontroller.js"
import login from './controller/logincontroller.js'
import premiacaocontroller from "./controllers/premiacaocontroller.js"
import generocontroller from "./controllers/generocontroller.js"
import diretorcontroller from "./controllers/diretorcontroller.js"
import {authenticate} from "./utils/jwt.js"


const routes = express();

routes.use("/login", login);
routes.use("/user", usercontroller);
routes.use("/ator", authenticate, atorcontroller);
routes.use("/diretor", authenticate, diretorcontroller);
routes.use("/genero", authenticate, generocontroller);
routes.use("/premiacao", authenticate, premiacaocontroller);

export default routes;



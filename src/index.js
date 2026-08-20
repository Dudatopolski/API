import express from "express";
import { AppDataSource } from "./database/config.js";
import routes from "./routes.js";

const server = express();
server.use(express.json());
server.use("/", routes);

AppDataSource.initialize().then(async() => {
    console.log("Conectado no banco de dados");

    server.listen(3333, () => { 
        console.log("Server is running, Hello World 🚀");
    });
}).catch((err) => {
    console.log("Falha ao conecta no banco de dados: Motivo" + err);
});
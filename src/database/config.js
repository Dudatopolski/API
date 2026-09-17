import "reflect-metadata";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({  
    type: "mysql",
    host: "localhost",
    username: "root",
    port: 3306,
    password: "",
    database: "atividade_api",
    entities: ["src/model/*.js"],
    migrations: ["src/database/migrations/*.cjs"],
});

export {AppDataSource
}  ;
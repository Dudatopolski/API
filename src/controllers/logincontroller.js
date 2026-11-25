import express from "express";
import { AppDataSource } from "../database/config.js";
import user from "../model/user.js";
import { IsNull } from "typeorm";
import { generateNewPassword } from "../utils/login.js"


const route = express.Router();
const userTable = AppDataSource.getRepository(user);

route.post("/" async (request, response) => {
    const {email, password} = request.body;
    
    const userLogin = await userTable.findOneby({email, password, deletedAt: IsNull ()});

    if(userLogin) {
        return response.status(200).send({message: "Login efetuado com sucesso"});

    } else {
        return response.status(401).send({message: "Login inválido"});
    }
});

route.put("/reset", async (request, response) => {
    const {email} = request.body;

    const user = await userTable.findOneby({email, deletedAt: IsNull ()});

    if(!user) {
        return response.status(400).send({message: "Email inválido"});

    } 
    const newPassword = generateNewPassword();

    await userTable.update({email}, {password: newPassword});

    return response.status(200).send({message: "Senha enviada para o email cadastrado."})


});

export default route;
import express, { response } from 'express';
import { AppDataSource }from "../database/config.js" ;
import user from "../model/user.js"
import { IsNull } from 'typeorm';
 
const route = express.Router();
const userTable =  AppDataSource.getRepository(user);

route.get("/",async (request,response) => {
    const users = await userTable.find();
    return response.status(200).send({response:users});

});

route.post ("/", async (request,response) => {

const{name,email,password,typeUser} = request.body;

if(name.lenght <2 ){
    return response.status(400).send ({response: "O nome deve conter mais de 1 caracter"});
}

if(!email.includes("@")){
   return response.status(400).send ({response: "O email informado está invalido"});
}
if(password.length< 6) {
    return response.status(400).send ({response: "A senha deve conter no minimo 6 caracteres"});
}

if(typeUser != "admin" && typeUser != "comum") {
    return response.status(400).send ({response: "O tipo de usuário precisa ser 'admin' ou 'comum'"});
}

try{
const userData = userTable.create ({name,email,password,typeUser});
await userTable.save(userData);

return response.status (201).send({response: "Usuario cadastrado com sucesso"});
}
catch(err){
    return response.status(500).send({response :err});
}
});

export default route;





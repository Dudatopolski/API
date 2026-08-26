import express from "express";

const routes = express.Router();

routes.get("/", (request, response) =>{
    return response.send("Deu certo!!!");
});

routes.post("/",(request, response) => {
    //name, email, password, typeuser
    const {name, email, password, typeuser} = request.body;


    console.log(`O name cadastrado foi ${name}`);
    console.log(`O email cadastrado foi ${email}`);
    console.log(`O password cadastrado foi ${password}`);
    console.log(`O typeuser cadastrado foi ${typeuser}`);
});
export default routes;



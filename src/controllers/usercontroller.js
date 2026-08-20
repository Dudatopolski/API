import express from "express";

const route = express.Router();

route.get("/", (request, response) =>{
    return response.send("Deu certo!!!");
});

export default route;
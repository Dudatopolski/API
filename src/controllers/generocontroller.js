import express from "express";
import { AppDataSource } from "../database/config.js";
import genero from "../model/genero.js";
import { IsNull } from "typeorm";

const route = express.Router();
const generoTable = AppDataSource.getRepository(genero);

route.get("/", async (request, response) => {
    try {
        const generos = await generoTable.findBy({
            deletedAt: IsNull()
        });

        return response.status(200).send(generos);

    } catch (error) {
        return response.status(500).send({response: "Erro ao buscar gêneros.", erro: error.message});
    }
});

route.get("/:termo", async (request, response) => {
    const { termo } = request.params;
    const generos = await generoTable.findBy({
        nome_genero: Like(`%${termo}%`),
        deletedAt: IsNull()
    });

    if (generos.length < 1) {
        return response.status(200).send({ response: "Nenhum gênero encontrado." });
    }
    return response.status(200).send(generos);
});

route.post("/", async (request, response) => {
    const { nome_genero } = request.body;

    if (nome_genero.length < 2) {
        return response.status(400).send({ response: "O nome do gênero deve ter pelo menos 2 caracteres." });
    }

    try {
        const novo_genero = generoTable.create({ nome_genero });
        await generoTable.save(novo_genero);
        return response.status(201).send({
            response: "Gênero cadastrado com sucesso",
        });

    } catch (error) {
        return response.status(500).send({ response: error.message });
    }
});

route.put("/:id", async (request, response) => {
    const id = Number(request.params.id);
    const { nome_genero } = request.body;

    if (nome_genero.length < 2) {
        return response.status(400).send({ response: "O nome do gênero deve ter pelo menos 2 caracteres." });
    }

    await generoTable.update({ id }, { nome_genero });
    return response.status(200).send({ response: "Gênero atualizado com sucesso" });
});

route.delete("/:id", async (request, response) => {
    const { id } = request.params;
    await generoTable.update({ id }, { deletedAt: () => "CURRENT_TIMESTAMP" });
    return response.status(200).send({ response: "Gênero excluído com sucesso!" });
});

export default route;

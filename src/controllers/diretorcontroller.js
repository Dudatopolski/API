import express from "express";
import { AppDataSource } from "../database/config.js";
import diretor from "../model/diretor.js";
import { IsNull } from "typeorm";

const route = express.Router();
const diretorTable = AppDataSource.getRepository(diretor);

// listar 
route.get("/", async (request, response) => {
    try {
        const diretores = await diretorTable.findBy({ deletedAt: IsNull() });
        return response.status(200).json(diretores);

    } catch (error) {
        return response.status(500).json({response: "Erro ao buscar diretores.", erro: error.message });
    }
});

route.get("/buscar/:termo", async (request, response) => {
        const { termo } = request.params;
        const diretores = await diretorTable.findBy({
            nome_diretor: Like(`%${termo}%`),
            deletedAt: IsNull()
        });

        if (diretores.length < 1) {
            return response.status(404).send({response: "Nenhum diretor encontrado."});
        }

        return response.status(200).send(diretores);
});

route.post("/", async (request, response) => {
    const {nome_diretor, sexo, data_nascimento, nacionalidade, foto_diretor} = request.body;

    if (nome_diretor.length < 2) {
        return response.status(400).json({response: "O nome do diretor deve ter pelo menos 2 caracteres."});
    }

    if (sexo.toLowerCase() !== "f" && sexo.toLowerCase() !== "m") {
        return response.status(400).send({ response: "O campo sexo deve ser 'f' ou 'm'" });
    }

    if (!data_nascimento) {
        return response.status(400).send({ response: "A data de nascimento é obrigatória" });
    }

    if (!nacionalidade) {
        return response.status(400).send({ response: "A nacionalidade é obrigatória" });
    }

    try {
        const novoDiretor = diretorTable.create({nome_diretor, sexo: sexo.toLowerCase(), data_nascimento, nacionalidade, foto_diretor});
        await diretorTable.save(novoDiretor);
        return response.status(201).json({mensagem: "Novo diretor cadastrado com sucesso!",});

    }catch (error) {
        return response.status(500).json({mensagem: "Erro ao cadastrar diretor.", erro: error.message});
    }
});

route.put("/:id", async (request, response) => {
    const { id } = request.params;
    const {nome_diretor, sexo, data_nascimento, nacionalidade, foto_diretor} = request.body;

    if (nome_diretor.length < 2) {
        return response.status(400).json({response: "O nome do diretor deve ter pelo menos 2 caracteres."});
    }

    if (sexo.toLowerCase() !== "f" && sexo.toLowerCase() !== "m") {
        return response.status(400).send({ response: "O campo sexo deve ser 'f' ou 'm'" });
    }

    if (!data_nascimento) {
        return response.status(400).send({ response: "A data de nascimento é obrigatória" });
    }

    if (!nacionalidade) {
        return response.status(400).send({ response: "A nacionalidade é obrigatória" });
    }

    await diretorTable.update({ id }, { nome_diretor, sexo, data_nascimento, nacionalidade, foto_diretor });
    return response.status(200).send({ response: "Diretor atualizado com sucesso!" });
});

route.delete("/:id", async (request, response) => {
    const { id } = request.params;
    await diretorTable.update({ id }, { deletedAt: () => "CURRENT_TIMESTAMP" });
    return response.status(200).send({ response: "Diretor excluído com sucesso!" });
});

export default route;

import express from "express";
import { AppDataSource } from "../database/config.js";
import premiacao from "../model/premiacao.js";
import { IsNull } from "typeorm";

const route = express.Router();
const premiacaoTable = AppDataSource.getRepository(premiacao);

route.get("/", async (request, response) => {
    try {
        const nome_premiacao = await premiacaoTable.findBy({
            deletedAt: IsNull()
        });

        return response.status(200).send(nome_premiacao);

    } catch (error) {
        return response.status(500).send({ response: "Erro ao buscar premiações.", erro: error.message });
    }
});

route.get("/buscar/:termo", async (request, response) => {
    const { termo } = request.params;
    const nome_premiacao = await premiacaoTable.findBy({
        nome_premiacao: Like(`%${termo}%`),
        deletedAt: IsNull()
    });

    if (nome_premiacao.length > 1) {
        return response.status(404).send({ response: "Nenhuma premiação encontrada." });
    }
    return response.status(200).send(premiacao);
});

route.post("/", async (request, response) => {
    const { nome_premiacao, valor_premiacao } = request.body;

    if (nome_premiacao.length < 2) {
        return response.status(400).send({ response: "O nome da premiação deve ter pelo menos 2 caracteres." });
    }

    if (valor_premiacao !== undefined && valor_premiacao !== null && !Number.isFinite(Number(valor_premiacao))) {
        return response.status(400).send({ response: "O valor da premiação deve ser numérico." });
    }
    try {
        const nova_premiacao = premiacaoTable.create({ nome_premiacao, valor_premiacao });
        await premiacaoTable.save(nova_premiacao);
        return response.status(201).send({ response: "Premiação cadastrada com sucesso", premiacao: nova_premiacao });

    } catch (error) {
        return response.status(500).send({ response: "Erro ao cadastrar premiação.", erro: error.message });
    }
});

route.put("/:id", async (request, response) => {
    const id = Number(request.params.id);
    const { nome_premiacao, valor_premiacao } = request.body;

    if (nome_premiacao.length < 2) {
        return response.status(400).send({ response: "O nome da premiação deve ter pelo menos 2 caracteres." });
    }

    if (valor_premiacao !== undefined && valor_premiacao !== null && !Number.isFinite(Number(valor_premiacao))) {
        return response.status(400).send({ response: "O valor da premiação deve ser numérico." });
    }

    await premiacaoTable.update({ id }, { nome_premiacao, valor_premiacao });
    return response.status(200).send({ response: "premiacao atualizada com sucesso" });
});

route.delete("/:id", async (request, response) => {
    const { id } = request.params;
    await premiacaoTable.update({ id }, { deletedAt: () => "CURRENT_TIMESTAMP" });
    return response.status(200).send({ response: "Premiação excluída com sucesso" });
});

export default route;
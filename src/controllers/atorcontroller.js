import express from "express";
import { AppDataSource } from "../database/config.js";
import ator from "../model/ator.js";
import { IsNull } from "typeorm";

const route = express.Router();
const atorTable = AppDataSource.getRepository(ator);

route.get("/", async (request, response) => {
  try {
    const atores = await atorTable.findBy({
      deletedAt: IsNull()
    });
    return response.status(200).send(atores);
  } catch (error) {
    return response.status(500).send({ response: error.message });
  }
});

route.get("/:termo", async (request, response) => {
  const { termo } = request.params;
  const atores = await atorTable.findBy({
    nome_ator: Like(`%${termo}%`),
    deletedAt: IsNull()
  });

  if (atores.length < 1) {
    return response.status(200).send({ response: "Nenhum dado encontrado." });
  }
  return response.status(200).send(atores);
});

route.post("/", async (request, response) => {
  const { nome_ator, sexo, data_nascimento, naciolidade, foto_autor } = request.body;

  if (nome_ator.length < 2) {
    return response.status(400).send({ response: "O nome deve conter mais de 1 caractere" });
  }

  if (sexo.toLowerCase() !== "f" && sexo.toLowerCase() !== "m") {
    return response.status(400).send({ response: "O campo sexo deve ser 'f' ou 'm'" });
  }

  if (!data_nascimento) {
    return response.status(400).send({ response: "A data de nascimento é obrigatória" });
  }

  if (!naciolidade) {
    return response.status(400).send({ response: "A naciolidade é obrigatória" });
  }

  try {
    const novoAtor = atorTable.create({ nome_ator, sexo: sexo.toLowerCase(), data_nascimento, naciolidade, foto_autor });
    await atorTable.save(novoAtor);
    return response.status(201).send({ response: "Ator cadastrado com sucesso" });
  }
  catch (error) {
    return response.status(500).send({ response: error.message });
  }
});

route.put("/:id", async (request, response) => {
  const { nome_ator, sexo, data_nascimento, naciolidade, foto_autor } = request.body;
  const { id } = request.params;

  if (nome_ator.length < 2) {
    return response.status(400).send({ response: "O nome deve conter mais de 1 caractere" });
  }

  if (sexo.toLowerCase() !== "f" && sexo.toLowerCase() !== "m") {
    return response.status(400).send({ response: "O campo sexo deve ser 'f' ou 'm'" });
  }

  if (!data_nascimento) {
    return response.status(400).send({ response: "A data de nascimento é obrigatória" });
  }

  if (!naciolidade) {
    return response.status(400).send({ response: "A nacionadade é obrigatória" });
  }

  await atorTable.update({ id }, { nome_ator, sexo, data_nascimento, naciolidade, foto_autor });
  return response.status(200).send({ response: "Ator atualizado com sucesso!" });
});

route.delete("/:id", async (request, response) => {
  const { id } = request.params;
  await atorTable.update({ id }, { deletedAt: () => "CURRENT_TIMESTAMP" });
  return response.status(200).send({ response: "Ator excluído com sucesso!" });
});

export default route;

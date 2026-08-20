import { EntitySchema } from "typeorm";

const premiacao = new EntitySchema({
    name: "Premiacao",
    tableName: "Premiacao",
    columns: {
        id: {primary: true, type: "int"},
        nome_premiacao: {type: "varchar", length: 30, nullable: false},
        valor_premiacao: {type: "decimal", nullable: false},
        createdAt: {type: "datetime", nullable: false, default: () => "CURRENT_TIMESTAMP"},
        deletedAt: {type: "datetime", nullable: true}
    }
})

export default premiacao;
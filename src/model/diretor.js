import { EntitySchema } from "typeorm";

const diretor = new EntitySchema({
    name: "Diretor",
    tableName: "Diretor",
    columns: {
        id: {primary: true, type: "int", generated: "increment"},
        nome_diretor: {type: "varchar", length: 60, nullable: false},
        sexo: {type: "enum", enum: ["M", "F"], nullable: false},
        data_nascimento: {type: "datetime", nullable: false},
        nacionalidade: {type: "varchar", length: 50, nullable: false},
        foto_diretor: {type: "varchar", length: 80, nullable: false},
        createdAt: {type: "datetime", nullable: false, default: () => "CURRENT_TIMESTAMP"},
        deletedAt: {type: "datetime", nullable: true}
    }
});

export default diretor;
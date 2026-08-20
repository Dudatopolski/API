import { EntitySchema } from "typeorm";

const ator = new EntitySchema({
    name: "Ator",
    tableName: "Ator",
    columns: {  
        id: {primary: true, type: "int", generated: "increment"},
        nome_ator: {type: "varchar", length: 60, nullable: false},
        sexo: {type: "enum", enum: ["M", "F"], nullable: false},
        data_nascimento: {type: "datetime", nullable: false},
        naciolidade: {type: "varchar", length: 50, nullable: false},
        foto_autor: {type: "varchar", length: 100, nullable: false},
        createdAt: {type: "datetime", nullable: false, default: () => "CURRENT_TIMESTAMP"},
        deletedAt: {type: "datetime", nullable: true}
    }
});

export default ator;
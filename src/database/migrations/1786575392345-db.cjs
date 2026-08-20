/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1786575392345 {
    name = 'Db1786575392345'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`Ator\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome_ator\` varchar(60) NOT NULL, \`sexo\` enum ('M', 'F') NOT NULL, \`data_nascimento\` datetime NOT NULL, \`naciolidade\` varchar(50) NOT NULL, \`foto_autor\` varchar(100) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deletedAt\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Diretor\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome_diretor\` varchar(60) NOT NULL, \`sexo\` enum ('M', 'F') NOT NULL, \`data_nascimento\` datetime NOT NULL, \`nacionalidade\` varchar(50) NOT NULL, \`foto_diretor\` varchar(80) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deletedAt\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Genero\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome_genero\` varchar(60) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deletedAt\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Premiacao\` (\`id\` int NOT NULL, \`nome_premiacao\` varchar(30) NOT NULL, \`valor_premiacao\` decimal NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deletedAt\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`User\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`password\` varchar(50) NOT NULL, \`email\` varchar(50) NOT NULL, \`typeUser\` enum ('admin', 'comum') NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deletedAt\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`User\``);
        await queryRunner.query(`DROP TABLE \`Premiacao\``);
        await queryRunner.query(`DROP TABLE \`Genero\``);
        await queryRunner.query(`DROP TABLE \`Diretor\``);
        await queryRunner.query(`DROP TABLE \`Ator\``);
    }
}

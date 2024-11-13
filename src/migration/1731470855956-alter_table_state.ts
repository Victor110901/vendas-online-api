import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableState1731470855956 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            ALTER TABLE STATE
                ADD uf varchar(2) NOT NULL;
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            ALTER TABLE STATE
                drop uf;
        `)
    }
}

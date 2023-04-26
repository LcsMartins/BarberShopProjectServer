import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1681919535287 implements MigrationInterface {
    name = 'Default1681919535287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" ADD "email" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "password" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "email"`);
    }

}

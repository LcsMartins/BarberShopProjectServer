import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1681821662951 implements MigrationInterface {
    name = 'Default1681821662951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "barbers" ADD "email" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "barbers" ADD "password" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_40ba2a25066184a434d47cdd5c2"`);
        await queryRunner.query(`ALTER TABLE "barbers" DROP CONSTRAINT "PK_3602c05627856e4cd6d91585d65"`);
        await queryRunner.query(`ALTER TABLE "barbers" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "barbers" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "barbers" ADD CONSTRAINT "PK_3602c05627856e4cd6d91585d65" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "barberId"`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "barberId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_40ba2a25066184a434d47cdd5c2" FOREIGN KEY ("barberId") REFERENCES "barbers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_40ba2a25066184a434d47cdd5c2"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "barberId"`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "barberId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "barbers" DROP CONSTRAINT "PK_3602c05627856e4cd6d91585d65"`);
        await queryRunner.query(`ALTER TABLE "barbers" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "barbers" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "barbers" ADD CONSTRAINT "PK_3602c05627856e4cd6d91585d65" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_40ba2a25066184a434d47cdd5c2" FOREIGN KEY ("barberId") REFERENCES "barbers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "barbers" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "barbers" DROP COLUMN "email"`);
    }

}

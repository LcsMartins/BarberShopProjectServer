import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1681409606544 implements MigrationInterface {
    name = 'Default1681409606544'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "barbers" ("id" SERIAL NOT NULL, "name" text NOT NULL, "contactNumber" text NOT NULL, CONSTRAINT "PK_3602c05627856e4cd6d91585d65" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "contactNumber" text NOT NULL, CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "appointments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "dateTime" date NOT NULL DEFAULT now(), "customerId" uuid NOT NULL, "barberId" integer NOT NULL, CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_40ba2a25066184a434d47cdd5c2" FOREIGN KEY ("barberId") REFERENCES "barbers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_60dbcf20669c096d319e20fca8a" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_60dbcf20669c096d319e20fca8a"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_40ba2a25066184a434d47cdd5c2"`);
        await queryRunner.query(`DROP TABLE "appointments"`);
        await queryRunner.query(`DROP TABLE "customers"`);
        await queryRunner.query(`DROP TABLE "barbers"`);
    }

}

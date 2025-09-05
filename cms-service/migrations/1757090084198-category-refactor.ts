import { MigrationInterface, QueryRunner } from "typeorm";

export class CategoryRefactor1757090084198 implements MigrationInterface {
    name = 'CategoryRefactor1757090084198'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "programs" RENAME COLUMN "category" TO "categoryId"`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "programs" ADD "categoryId" uuid`);
        await queryRunner.query(`ALTER TABLE "programs" ADD CONSTRAINT "FK_a20853fe73e393a2ea0f10809b2" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "programs" DROP CONSTRAINT "FK_a20853fe73e393a2ea0f10809b2"`);
        await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "programs" ADD "categoryId" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`ALTER TABLE "programs" RENAME COLUMN "categoryId" TO "category"`);
    }

}

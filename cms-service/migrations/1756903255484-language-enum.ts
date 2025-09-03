import { MigrationInterface, QueryRunner } from "typeorm";

export class LanguageEnum1756903255484 implements MigrationInterface {
    name = 'LanguageEnum1756903255484'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "language"`);
        await queryRunner.query(`CREATE TYPE "public"."programs_language_enum" AS ENUM('en', 'ar')`);
        await queryRunner.query(`ALTER TABLE "programs" ADD "language" "public"."programs_language_enum" NOT NULL DEFAULT 'ar'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "language"`);
        await queryRunner.query(`DROP TYPE "public"."programs_language_enum"`);
        await queryRunner.query(`ALTER TABLE "programs" ADD "language" character varying NOT NULL DEFAULT 'en'`);
    }

}

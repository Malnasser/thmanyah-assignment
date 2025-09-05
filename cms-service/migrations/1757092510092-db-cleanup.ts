import { MigrationInterface, QueryRunner } from "typeorm";

export class DbCleanup1757092510092 implements MigrationInterface {
    name = 'DbCleanup1757092510092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_episodes_search_vector"`);
        await queryRunner.query(`DROP INDEX "public"."idx_programs_search_vector"`);
        await queryRunner.query(`ALTER TABLE "episodes" RENAME COLUMN "search_vector" TO "status"`);
        await queryRunner.query(`ALTER TABLE "programs" RENAME COLUMN "search_vector" TO "status"`);
        await queryRunner.query(`ALTER TABLE "episodes" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."episodes_status_enum" AS ENUM('draft', 'scheduled', 'published')`);
        await queryRunner.query(`ALTER TABLE "episodes" ADD "status" "public"."episodes_status_enum" NOT NULL DEFAULT 'draft'`);
        await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."programs_status_enum" AS ENUM('draft', 'scheduled', 'published')`);
        await queryRunner.query(`ALTER TABLE "programs" ADD "status" "public"."programs_status_enum" NOT NULL DEFAULT 'draft'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."programs_status_enum"`);
        await queryRunner.query(`ALTER TABLE "programs" ADD "status" tsvector`);
        await queryRunner.query(`ALTER TABLE "episodes" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."episodes_status_enum"`);
        await queryRunner.query(`ALTER TABLE "episodes" ADD "status" tsvector`);
        await queryRunner.query(`ALTER TABLE "programs" RENAME COLUMN "status" TO "search_vector"`);
        await queryRunner.query(`ALTER TABLE "episodes" RENAME COLUMN "status" TO "search_vector"`);
        await queryRunner.query(`CREATE INDEX "idx_programs_search_vector" ON "programs" ("search_vector") `);
        await queryRunner.query(`CREATE INDEX "idx_episodes_search_vector" ON "episodes" ("search_vector") `);
    }

}

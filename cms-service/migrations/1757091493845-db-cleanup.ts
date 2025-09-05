import { MigrationInterface, QueryRunner } from "typeorm";

export class DbCleanup1757091493845 implements MigrationInterface {
    name = 'DbCleanup1757091493845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "episodes" DROP COLUMN "fileUrl"`);
        await queryRunner.query(`ALTER TABLE "episodes" DROP COLUMN "thumbnailUrl"`);
        await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "fileUrl"`);
        await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "thumbnailUrl"`);
        await queryRunner.query(`ALTER TABLE "episodes" ADD "searchVector" tsvector`);
        await queryRunner.query(`ALTER TABLE "episodes" ADD "metadata" jsonb NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "programs" ADD "searchVector" tsvector`);
        await queryRunner.query(`ALTER TABLE "programs" ADD "metadata" jsonb NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`CREATE INDEX "idx_episode_publishDate" ON "episodes" ("publishDate") `);
        await queryRunner.query(`CREATE INDEX "idx_episode_title" ON "episodes" ("title") `);
        await queryRunner.query(`CREATE INDEX "idx_program_categoryId" ON "programs" ("categoryId") `);
        await queryRunner.query(`CREATE INDEX "idx_program_publishDate" ON "programs" ("publishDate") `);
        await queryRunner.query(`CREATE INDEX "idx_program_title" ON "programs" ("title") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_program_title"`);
        await queryRunner.query(`DROP INDEX "public"."idx_program_publishDate"`);
        await queryRunner.query(`DROP INDEX "public"."idx_program_categoryId"`);
        await queryRunner.query(`DROP INDEX "public"."idx_episode_title"`);
        await queryRunner.query(`DROP INDEX "public"."idx_episode_publishDate"`);
        await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "metadata"`);
        await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "searchVector"`);
        await queryRunner.query(`ALTER TABLE "episodes" DROP COLUMN "metadata"`);
        await queryRunner.query(`ALTER TABLE "episodes" DROP COLUMN "searchVector"`);
        await queryRunner.query(`ALTER TABLE "programs" ADD "thumbnailUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "programs" ADD "fileUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "episodes" ADD "thumbnailUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "episodes" ADD "fileUrl" character varying`);
    }

}

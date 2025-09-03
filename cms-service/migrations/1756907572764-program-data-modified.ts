import { MigrationInterface, QueryRunner } from "typeorm";

export class ProgramDataModified1756907572764 implements MigrationInterface {
    name = 'ProgramDataModified1756907572764'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "programs" RENAME COLUMN "duration" TO "mediaType"`);
        await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "mediaType"`);
        await queryRunner.query(`CREATE TYPE "public"."programs_mediatype_enum" AS ENUM('podcast', 'movie', 'series')`);
        await queryRunner.query(`ALTER TABLE "programs" ADD "mediaType" "public"."programs_mediatype_enum" NOT NULL DEFAULT 'podcast'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "mediaType"`);
        await queryRunner.query(`DROP TYPE "public"."programs_mediatype_enum"`);
        await queryRunner.query(`ALTER TABLE "programs" ADD "mediaType" integer`);
        await queryRunner.query(`ALTER TABLE "programs" RENAME COLUMN "mediaType" TO "duration"`);
    }

}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropEpisodesTable1757529099875 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "episodes"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "episodes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text, "language" character varying NOT NULL DEFAULT 'en', "duration" integer, "publishDate" TIMESTAMP, "fileUrl" character varying, "thumbnailUrl" character varying, "programId" uuid, CONSTRAINT "PK_6a003fda8b0473fffc39cb831c7" PRIMARY KEY ("id"))`,
    );
  }
}

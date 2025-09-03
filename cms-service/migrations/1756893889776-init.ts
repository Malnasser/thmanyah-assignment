import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1756893889776 implements MigrationInterface {
  name = 'Init1756893889776';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "episodes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text, "language" character varying NOT NULL DEFAULT 'en', "duration" integer, "publishDate" TIMESTAMP, "fileUrl" character varying, "thumbnailUrl" character varying, "programId" uuid, CONSTRAINT "PK_6a003fda8b0473fffc39cb831c7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "programs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text, "category" character varying NOT NULL, "language" character varying NOT NULL DEFAULT 'en', "duration" integer, "publishDate" TIMESTAMP, "fileUrl" character varying, "thumbnailUrl" character varying, CONSTRAINT "PK_d43c664bcaafc0e8a06dfd34e05" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "episodes" ADD CONSTRAINT "FK_468360eb762a4d90d97e885d594" FOREIGN KEY ("programId") REFERENCES "programs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "episodes" DROP CONSTRAINT "FK_468360eb762a4d90d97e885d594"`,
    );
    await queryRunner.query(`DROP TABLE "programs"`);
    await queryRunner.query(`DROP TABLE "episodes"`);
  }
}

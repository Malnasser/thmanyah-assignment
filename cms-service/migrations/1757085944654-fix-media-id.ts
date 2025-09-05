import { MigrationInterface, QueryRunner } from "typeorm";

export class FixMediaId1757085944654 implements MigrationInterface {
    name = 'FixMediaId1757085944654'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "episodes" DROP CONSTRAINT "FK_f2846c32ecefaa11c775f132dd5"`);
        await queryRunner.query(`ALTER TABLE "programs" DROP CONSTRAINT "FK_28d318248ee0dffd8ac010ef112"`);
        await queryRunner.query(`ALTER TABLE "media_uploads" DROP CONSTRAINT "PK_af36cb16c5cc7d6bab1f6d4d289"`);
        await queryRunner.query(`ALTER TABLE "media_uploads" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "media_uploads" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "media_uploads" ADD CONSTRAINT "PK_af36cb16c5cc7d6bab1f6d4d289" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "episodes" DROP COLUMN "media_id"`);
        await queryRunner.query(`ALTER TABLE "episodes" ADD "media_id" uuid`);
        await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "poster_id"`);
        await queryRunner.query(`ALTER TABLE "programs" ADD "poster_id" uuid`);
        await queryRunner.query(`ALTER TABLE "episodes" ADD CONSTRAINT "FK_f2846c32ecefaa11c775f132dd5" FOREIGN KEY ("media_id") REFERENCES "media_uploads"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "programs" ADD CONSTRAINT "FK_28d318248ee0dffd8ac010ef112" FOREIGN KEY ("poster_id") REFERENCES "media_uploads"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "programs" DROP CONSTRAINT "FK_28d318248ee0dffd8ac010ef112"`);
        await queryRunner.query(`ALTER TABLE "episodes" DROP CONSTRAINT "FK_f2846c32ecefaa11c775f132dd5"`);
        await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "poster_id"`);
        await queryRunner.query(`ALTER TABLE "programs" ADD "poster_id" integer`);
        await queryRunner.query(`ALTER TABLE "episodes" DROP COLUMN "media_id"`);
        await queryRunner.query(`ALTER TABLE "episodes" ADD "media_id" integer`);
        await queryRunner.query(`ALTER TABLE "media_uploads" DROP CONSTRAINT "PK_af36cb16c5cc7d6bab1f6d4d289"`);
        await queryRunner.query(`ALTER TABLE "media_uploads" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "media_uploads" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "media_uploads" ADD CONSTRAINT "PK_af36cb16c5cc7d6bab1f6d4d289" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "programs" ADD CONSTRAINT "FK_28d318248ee0dffd8ac010ef112" FOREIGN KEY ("poster_id") REFERENCES "media_uploads"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "episodes" ADD CONSTRAINT "FK_f2846c32ecefaa11c775f132dd5" FOREIGN KEY ("media_id") REFERENCES "media_uploads"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}

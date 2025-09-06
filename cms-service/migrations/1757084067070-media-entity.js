"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaEntity1757084067070 = void 0;
class MediaEntity1757084067070 {
    constructor() {
        this.name = 'MediaEntity1757084067070';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "media_uploads" ("id" SERIAL NOT NULL, "fileUrl" text NOT NULL, "type" character varying(50) NOT NULL, "mimeType" character varying(100), "size" bigint, "duration" integer, "metadata" jsonb NOT NULL DEFAULT '{}', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_af36cb16c5cc7d6bab1f6d4d289" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "episodes" ADD "media_id" integer`);
        await queryRunner.query(`ALTER TABLE "programs" ADD "poster_id" integer`);
        await queryRunner.query(`ALTER TABLE "episodes" ADD CONSTRAINT "FK_f2846c32ecefaa11c775f132dd5" FOREIGN KEY ("media_id") REFERENCES "media_uploads"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "programs" ADD CONSTRAINT "FK_28d318248ee0dffd8ac010ef112" FOREIGN KEY ("poster_id") REFERENCES "media_uploads"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "programs" DROP CONSTRAINT "FK_28d318248ee0dffd8ac010ef112"`);
        await queryRunner.query(`ALTER TABLE "episodes" DROP CONSTRAINT "FK_f2846c32ecefaa11c775f132dd5"`);
        await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "poster_id"`);
        await queryRunner.query(`ALTER TABLE "episodes" DROP COLUMN "media_id"`);
        await queryRunner.query(`DROP TABLE "media_uploads"`);
    }
}
exports.MediaEntity1757084067070 = MediaEntity1757084067070;
//# sourceMappingURL=1757084067070-media-entity.js.map
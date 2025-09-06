"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramDataModified1756907572764 = void 0;
class ProgramDataModified1756907572764 {
    constructor() {
        this.name = 'ProgramDataModified1756907572764';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "programs" RENAME COLUMN "duration" TO "mediaType"`);
        await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "mediaType"`);
        await queryRunner.query(`CREATE TYPE "public"."programs_mediatype_enum" AS ENUM('podcast', 'movie', 'series')`);
        await queryRunner.query(`ALTER TABLE "programs" ADD "mediaType" "public"."programs_mediatype_enum" NOT NULL DEFAULT 'podcast'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "mediaType"`);
        await queryRunner.query(`DROP TYPE "public"."programs_mediatype_enum"`);
        await queryRunner.query(`ALTER TABLE "programs" ADD "mediaType" integer`);
        await queryRunner.query(`ALTER TABLE "programs" RENAME COLUMN "mediaType" TO "duration"`);
    }
}
exports.ProgramDataModified1756907572764 = ProgramDataModified1756907572764;
//# sourceMappingURL=1756907572764-program-data-modified.js.map
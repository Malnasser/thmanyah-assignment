"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageEnum1756903255484 = void 0;
class LanguageEnum1756903255484 {
    constructor() {
        this.name = 'LanguageEnum1756903255484';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "language"`);
        await queryRunner.query(`CREATE TYPE "public"."programs_language_enum" AS ENUM('en', 'ar')`);
        await queryRunner.query(`ALTER TABLE "programs" ADD "language" "public"."programs_language_enum" NOT NULL DEFAULT 'ar'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "language"`);
        await queryRunner.query(`DROP TYPE "public"."programs_language_enum"`);
        await queryRunner.query(`ALTER TABLE "programs" ADD "language" character varying NOT NULL DEFAULT 'en'`);
    }
}
exports.LanguageEnum1756903255484 = LanguageEnum1756903255484;
//# sourceMappingURL=1756903255484-language-enum.js.map
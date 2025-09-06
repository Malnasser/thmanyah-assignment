"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbCleanup1757092510092 = void 0;
class DbCleanup1757092510092 {
    constructor() {
        this.name = 'DbCleanup1757092510092';
    }
    async up(queryRunner) {
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
    async down(queryRunner) {
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
exports.DbCleanup1757092510092 = DbCleanup1757092510092;
//# sourceMappingURL=1757092510092-db-cleanup.js.map
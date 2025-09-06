"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbCleanup1757099384795 = void 0;
class DbCleanup1757099384795 {
    constructor() {
        this.name = 'DbCleanup1757099384795';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "programs" DROP CONSTRAINT "fk_program_category"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "programs" ADD CONSTRAINT "fk_program_category" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }
}
exports.DbCleanup1757099384795 = DbCleanup1757099384795;
//# sourceMappingURL=1757099384795-db-cleanup.js.map
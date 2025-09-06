"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddProgramCategoryFK1693918000000 = void 0;
class AddProgramCategoryFK1693918000000 {
    constructor() {
        this.name = 'AddProgramCategoryFK1693918000000';
    }
    async up(queryRunner) {
        await queryRunner.query(`
      DELETE FROM programs
      WHERE "categoryId" IS NOT NULL
      AND "categoryId" NOT IN (SELECT "id" FROM categories);
    `);
        await queryRunner.query(`
      ALTER TABLE programs
      ADD CONSTRAINT fk_program_category
      FOREIGN KEY ("categoryId") REFERENCES categories("id")
      ON DELETE SET NULL
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE programs
      DROP CONSTRAINT IF EXISTS fk_program_category
    `);
    }
}
exports.AddProgramCategoryFK1693918000000 = AddProgramCategoryFK1693918000000;
//# sourceMappingURL=1693918000000-AddProgramCategoryFK.js.map
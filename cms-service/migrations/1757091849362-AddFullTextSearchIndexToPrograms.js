"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddFullTextSearchIndexToPrograms1757091849362 = void 0;
class AddFullTextSearchIndexToPrograms1757091849362 {
    async up(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE programs
      ADD COLUMN search_vector tsvector;
    `);
        await queryRunner.query(`
      UPDATE programs
      SET search_vector = to_tsvector('english', coalesce(title,'') || ' ' || coalesce(description,''));
    `);
        await queryRunner.query(`
      CREATE INDEX idx_programs_search_vector
      ON programs
      USING GIN (search_vector);
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX idx_programs_search_vector`);
        await queryRunner.query(`ALTER TABLE programs DROP COLUMN search_vector`);
    }
}
exports.AddFullTextSearchIndexToPrograms1757091849362 = AddFullTextSearchIndexToPrograms1757091849362;
//# sourceMappingURL=1757091849362-AddFullTextSearchIndexToPrograms.js.map
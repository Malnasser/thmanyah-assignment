"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddFullTextSearchIndexToEpisodes1757091922670 = void 0;
class AddFullTextSearchIndexToEpisodes1757091922670 {
    async up(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE episodes
      ADD COLUMN search_vector TSVECTOR;
    `);
        await queryRunner.query(`
      UPDATE episodes
      SET search_vector = to_tsvector('english', coalesce(title,'') || ' ' || coalesce(description,''));
    `);
        await queryRunner.query(`
      CREATE INDEX idx_episodes_search_vector
      ON episodes
      USING GIN (search_vector);
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX idx_episodes_search_vector`);
        await queryRunner.query(`ALTER TABLE episodes DROP COLUMN search_vector;`);
    }
}
exports.AddFullTextSearchIndexToEpisodes1757091922670 = AddFullTextSearchIndexToEpisodes1757091922670;
//# sourceMappingURL=1757091922670-AddFullTextSearchIndexToEpisodes.js.map
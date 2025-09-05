import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFullTextSearchIndexToEpisodes1757091922670
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
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

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX idx_episodes_search_vector`);
    await queryRunner.query(`ALTER TABLE episodes DROP COLUMN search_vector;`);
  }
}


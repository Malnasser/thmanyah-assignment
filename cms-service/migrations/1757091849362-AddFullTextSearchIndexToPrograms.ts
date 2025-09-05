import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFullTextSearchIndexToPrograms1757091849362 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add the tsvector column
    await queryRunner.query(`
      ALTER TABLE programs
      ADD COLUMN search_vector tsvector;
    `);

    // Populate existing rows
    await queryRunner.query(`
      UPDATE programs
      SET search_vector = to_tsvector('english', coalesce(title,'') || ' ' || coalesce(description,''));
    `);

    // Create GIN index for fast full-text search
    await queryRunner.query(`
      CREATE INDEX idx_programs_search_vector
      ON programs
      USING GIN (search_vector);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX idx_programs_search_vector`);
    await queryRunner.query(`ALTER TABLE programs DROP COLUMN search_vector`);
  }
}
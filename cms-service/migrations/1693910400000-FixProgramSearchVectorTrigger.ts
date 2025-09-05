import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixProgramSearchVectorTrigger1693910400000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1️⃣ Drop the old trigger if it exists
    await queryRunner.query(`
      DROP TRIGGER IF EXISTS programs_search_vector_trigger ON programs;
    `);

    // 2️⃣ Drop the old function if it exists
    await queryRunner.query(`
      DROP FUNCTION IF EXISTS programs_search_vector_update;
    `);

    // 3️⃣ Recreate the function with correct casing
    await queryRunner.query(`
      CREATE FUNCTION programs_search_vector_update() RETURNS trigger AS $$
      BEGIN
        NEW."searchVector" :=
          to_tsvector('english', coalesce(NEW.title,'') || ' ' || coalesce(NEW.description,''));
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    // 4️⃣ Recreate the trigger
    await queryRunner.query(`
      CREATE TRIGGER programs_search_vector_trigger
      BEFORE INSERT OR UPDATE ON programs
      FOR EACH ROW
      EXECUTE FUNCTION programs_search_vector_update();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop trigger first
    await queryRunner.query(`
      DROP TRIGGER IF EXISTS programs_search_vector_trigger ON programs;
    `);

    // Then drop the function
    await queryRunner.query(`
      DROP FUNCTION IF EXISTS programs_search_vector_update;
    `);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProgramFullTextTrigger1688888888889
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1️⃣ Create a function to update search_vector
    await queryRunner.query(`
      CREATE FUNCTION programs_search_vector_update() RETURNS trigger AS $
      BEGIN
        NEW.search_vector :=
          to_tsvector('english', coalesce(NEW.title,'') || ' ' || coalesce(NEW.description,''));
        RETURN NEW;
      END;
      $ LANGUAGE plpgsql;
    `);

    // 2️⃣ Create the trigger to run before INSERT or UPDATE
    await queryRunner.query(`
      CREATE TRIGGER programs_search_vector_trigger
      BEFORE INSERT OR UPDATE ON programs
      FOR EACH ROW
      EXECUTE FUNCTION programs_search_vector_update();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the trigger first
    await queryRunner.query(
      `DROP TRIGGER IF EXISTS programs_search_vector_trigger ON programs`,
    );
    // Then drop the function
    await queryRunner.query(
      `DROP FUNCTION IF EXISTS programs_search_vector_update`,
    );
  }
}


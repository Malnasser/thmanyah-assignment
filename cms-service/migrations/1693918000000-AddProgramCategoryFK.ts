import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProgramCategoryFK1693918000000 implements MigrationInterface {
  name = 'AddProgramCategoryFK1693918000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1️⃣ Ensure there are no invalid categoryIds
    await queryRunner.query(`
      DELETE FROM programs
      WHERE "categoryId" IS NOT NULL
      AND "categoryId" NOT IN (SELECT "id" FROM categories);
    `);

    // 2️⃣ Add foreign key constraint
    await queryRunner.query(`
      ALTER TABLE programs
      ADD CONSTRAINT fk_program_category
      FOREIGN KEY ("categoryId") REFERENCES categories("id")
      ON DELETE SET NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the foreign key constraint
    await queryRunner.query(`
      ALTER TABLE programs
      DROP CONSTRAINT IF EXISTS fk_program_category
    `);
  }
}
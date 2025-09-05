import { MigrationInterface, QueryRunner } from "typeorm";

export class DbCleanup1757099384795 implements MigrationInterface {
    name = 'DbCleanup1757099384795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "programs" DROP CONSTRAINT "fk_program_category"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "programs" ADD CONSTRAINT "fk_program_category" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}

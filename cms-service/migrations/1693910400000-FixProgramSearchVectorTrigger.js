"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixProgramSearchVectorTrigger1693910400000 = void 0;
class FixProgramSearchVectorTrigger1693910400000 {
    async up(queryRunner) {
        await queryRunner.query(`
      DROP TRIGGER IF EXISTS programs_search_vector_trigger ON programs;
    `);
        await queryRunner.query(`
      DROP FUNCTION IF EXISTS programs_search_vector_update;
    `);
        await queryRunner.query(`
      CREATE FUNCTION programs_search_vector_update() RETURNS trigger AS $$
      BEGIN
        NEW."searchVector" :=
          to_tsvector('english', coalesce(NEW.title,'') || ' ' || coalesce(NEW.description,''));
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);
        await queryRunner.query(`
      CREATE TRIGGER programs_search_vector_trigger
      BEFORE INSERT OR UPDATE ON programs
      FOR EACH ROW
      EXECUTE FUNCTION programs_search_vector_update();
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      DROP TRIGGER IF EXISTS programs_search_vector_trigger ON programs;
    `);
        await queryRunner.query(`
      DROP FUNCTION IF EXISTS programs_search_vector_update;
    `);
    }
}
exports.FixProgramSearchVectorTrigger1693910400000 = FixProgramSearchVectorTrigger1693910400000;
//# sourceMappingURL=1693910400000-FixProgramSearchVectorTrigger.js.map
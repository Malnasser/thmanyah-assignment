"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTableModifications1756997080761 = void 0;
class UserTableModifications1756997080761 {
    constructor() {
        this.name = 'UserTableModifications1756997080761';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roles"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refreshToken"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "refreshToken" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "roles" text NOT NULL DEFAULT 'user'`);
    }
}
exports.UserTableModifications1756997080761 = UserTableModifications1756997080761;
//# sourceMappingURL=1756997080761-user-table-modifications.js.map
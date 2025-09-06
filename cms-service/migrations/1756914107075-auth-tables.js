"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthTables1756914107075 = void 0;
class AuthTables1756914107075 {
    constructor() {
        this.name = 'AuthTables1756914107075';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying, "lastName" character varying, "roles" text NOT NULL DEFAULT 'user', "refreshToken" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
exports.AuthTables1756914107075 = AuthTables1756914107075;
//# sourceMappingURL=1756914107075-auth-tables.js.map
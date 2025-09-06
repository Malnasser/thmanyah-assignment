"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddBaseEntityFields1757124822774 = void 0;
class AddBaseEntityFields1757124822774 {
    constructor() {
        this.name = 'Name=AddBaseEntityFields1757124822774';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "media_uploads" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "media_uploads" ADD "createdBy" character varying`);
        await queryRunner.query(`ALTER TABLE "media_uploads" ADD "updatedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "episodes" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "episodes" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "episodes" ADD "createdBy" character varying`);
        await queryRunner.query(`ALTER TABLE "episodes" ADD "updatedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "createdBy" character varying`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "updatedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "programs" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "programs" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "programs" ADD "createdBy" character varying`);
        await queryRunner.query(`ALTER TABLE "programs" ADD "updatedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdBy" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updatedBy" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "episodes" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "episodes" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "episodes" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "episodes" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "media_uploads" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "media_uploads" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "media_uploads" DROP COLUMN "updatedAt"`);
    }
}
exports.AddBaseEntityFields1757124822774 = AddBaseEntityFields1757124822774;
//# sourceMappingURL=1757124822774-name=AddBaseEntityFields.js.map
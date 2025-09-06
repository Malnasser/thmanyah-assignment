import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class DbCleanup1757091493845 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}

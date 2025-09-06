import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddFullTextSearchIndexToPrograms1757091849362 implements MigrationInterface {
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}

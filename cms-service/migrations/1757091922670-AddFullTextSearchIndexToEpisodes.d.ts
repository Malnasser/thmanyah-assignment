import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddFullTextSearchIndexToEpisodes1757091922670 implements MigrationInterface {
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}

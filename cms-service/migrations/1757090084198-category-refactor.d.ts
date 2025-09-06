import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CategoryRefactor1757090084198 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}

import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class FixMediaId1757085944654 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}

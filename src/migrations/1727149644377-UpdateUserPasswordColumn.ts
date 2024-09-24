import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserPasswordColumn1727149644377 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "password" TYPE VARCHAR(60)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "password" TYPE VARCHAR(255)`,
    );
  }
}

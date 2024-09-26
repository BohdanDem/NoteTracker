import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1727343437889 implements MigrationInterface {
  name = ' $npmConfigName1727343437889';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "board" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."card_state_enum" AS ENUM('to do', 'in progress', 'done')`,
    );
    await queryRunner.query(
      `CREATE TABLE "card" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "state" "public"."card_state_enum" NOT NULL, "boardId" uuid, CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD CONSTRAINT "FK_7afd0d9e219e91a0bd7c746146f" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "card" DROP CONSTRAINT "FK_7afd0d9e219e91a0bd7c746146f"`,
    );
    await queryRunner.query(`DROP TABLE "card"`);
    await queryRunner.query(`DROP TYPE "public"."card_state_enum"`);
    await queryRunner.query(`DROP TABLE "board"`);
  }
}

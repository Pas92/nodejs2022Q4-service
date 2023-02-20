import { MigrationInterface, QueryRunner } from "typeorm";

export class homelibTables1676902667195 implements MigrationInterface {
    name = 'homelibTables1676902667195'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "album_entity" DROP CONSTRAINT "FK_319a74c2085b42849b15412a3bf"`);
        await queryRunner.query(`ALTER TABLE "album_entity" ADD "artistId" uuid`);
        await queryRunner.query(`ALTER TABLE "album_entity" ADD CONSTRAINT "FK_4aea5943406bd89eced202b012b" FOREIGN KEY ("artistId") REFERENCES "artist_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "album_entity" DROP CONSTRAINT "FK_4aea5943406bd89eced202b012b"`);
        await queryRunner.query(`ALTER TABLE "album_entity" DROP COLUMN "artistId"`);
        await queryRunner.query(`ALTER TABLE "album_entity" ADD CONSTRAINT "FK_319a74c2085b42849b15412a3bf" FOREIGN KEY ("id") REFERENCES "artist_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

-- AlterTable
CREATE SEQUENCE moviedata_id_seq;
ALTER TABLE "MovieData" ALTER COLUMN "id" SET DEFAULT nextval('moviedata_id_seq');
ALTER SEQUENCE moviedata_id_seq OWNED BY "MovieData"."id";

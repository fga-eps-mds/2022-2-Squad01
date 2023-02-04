/*
  Warnings:

  - The `destination` column on the `routes` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `origin` column on the `routes` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "routes" DROP COLUMN "destination",
ADD COLUMN     "destination" DOUBLE PRECISION[],
DROP COLUMN "origin",
ADD COLUMN     "origin" DOUBLE PRECISION[];

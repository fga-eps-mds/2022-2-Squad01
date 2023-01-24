/*
  Warnings:

  - Added the required column `cellphone` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "cellphone" TEXT NOT NULL,
ADD COLUMN     "instagram" TEXT;

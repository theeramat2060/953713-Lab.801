/*
  Warnings:

  - You are about to drop the column `Author_name` on the `book` table. All the data in the column will be lost.
  - Added the required column `author_name` to the `book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "book" DROP COLUMN "Author_name",
ADD COLUMN     "author_name" TEXT NOT NULL;

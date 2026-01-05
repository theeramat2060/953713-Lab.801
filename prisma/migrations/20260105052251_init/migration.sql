/*
  Warnings:

  - You are about to drop the `authors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `books` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `borrow_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `borrows` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `members` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_authorId_fkey";

-- DropForeignKey
ALTER TABLE "borrow_items" DROP CONSTRAINT "borrow_items_bookId_fkey";

-- DropForeignKey
ALTER TABLE "borrow_items" DROP CONSTRAINT "borrow_items_borrowId_fkey";

-- DropForeignKey
ALTER TABLE "borrows" DROP CONSTRAINT "borrows_memberId_fkey";

-- DropTable
DROP TABLE "authors";

-- DropTable
DROP TABLE "books";

-- DropTable
DROP TABLE "borrow_items";

-- DropTable
DROP TABLE "borrows";

-- DropTable
DROP TABLE "members";

-- CreateTable
CREATE TABLE "author" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "affiliation" TEXT,

    CONSTRAINT "author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "book" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "isbn" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "member" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,

    CONSTRAINT "member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "borrow" (
    "id" SERIAL NOT NULL,
    "memberId" INTEGER NOT NULL,
    "borrowDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "borrow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "borrow_item" (
    "id" SERIAL NOT NULL,
    "bookId" INTEGER NOT NULL,
    "borrowId" INTEGER NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "returnedAt" TIMESTAMP(3),

    CONSTRAINT "borrow_item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "book_isbn_key" ON "book"("isbn");

-- AddForeignKey
ALTER TABLE "book" ADD CONSTRAINT "book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "borrow" ADD CONSTRAINT "borrow_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "borrow_item" ADD CONSTRAINT "borrow_item_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "borrow_item" ADD CONSTRAINT "borrow_item_borrowId_fkey" FOREIGN KEY ("borrowId") REFERENCES "borrow"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "book" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "Author_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "groups" TEXT NOT NULL,

    CONSTRAINT "book_pkey" PRIMARY KEY ("id")
);

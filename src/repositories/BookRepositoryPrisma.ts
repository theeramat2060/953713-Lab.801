import { PrismaClient } from "@prisma/client";
import { Book } from "../models/Book";

export class BookRepository {
    constructor(private prisma: PrismaClient) {}

    async findAll() {
        return this.prisma.book.findMany({
            include: { author: true },
        });
    }

    async findByTitle(title: string) {
        return this.prisma.book.findMany({
            where: {
                title: {
                    contains: title,
                    mode: "insensitive",
                },
            },
            include: { author: true },
        });
    }

    async findById(id: number) {
        return this.prisma.book.findUnique({
            where: { id },
            include: { author: true },
        });
    }

    // ✅ addBook function
    async addBook(book: Book) {
        return this.prisma.book.create({
            data: {
                title: book.title,
                isbn: book.isbn,
                category: book.category,
                authorId: book.authorId,
            },
        });
    }
}

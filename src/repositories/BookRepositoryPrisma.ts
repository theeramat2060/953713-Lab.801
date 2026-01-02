import {prisma} from '../lib/prisma';
import type {bookModel as Book} from "../generated/prisma/models/book";

    export function getBookByTitle(title: string) {
      return prisma.book.findMany({
            where: { title },
      });
    }

    export function getAllBooks() {
      return prisma.book.findMany();
    }

    export function getBookById(id: number) {
      return prisma.book.findUnique({
            where: { id },
      });
    }

export function addBook(newBook: Book): Promise<Book> {
    return prisma.book.create({
            data: {
                    title: newBook.title,
                    description: newBook.description,
                    author_name: newBook.author_name,
                    groups: newBook.groups
            }
        });
}



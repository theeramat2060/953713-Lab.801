import { getBooks, getBookById as getBook, getBookByTitle as findByTitle, addBook as createBook } from '../lib/prisma';
import type { Book } from '../models/Book';

export async function getBookByTitle(title: string): Promise<Book[]> {
    return findByTitle(title);
}

export async function getAllBooks(): Promise<Book[]> {
    return getBooks();
}

export async function getBookById(id: number): Promise<Book | null> {
    return getBook(id);
}

export async function addBook(newBook: Omit<Book, 'id'>): Promise<Book> {
    return createBook(newBook);
}

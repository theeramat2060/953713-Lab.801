import type { Book } from "../models/Book";
import * as repo from "../repositories/BookRepositoryPrisma";

export function getBookByTitle(title: string): Promise<Book[]> {
    return repo.getBookByTitle(title);
}

export function getAllBooks(): Promise<Book[]> {
    return repo.getAllBooks();
}

export function getBookById(id: number): Promise<Book | null> {
    return repo.getBookById(id);
}

export function addBook(newBook: Omit<Book, 'id'>): Promise<Book> {
    return repo.addBook(newBook);
}


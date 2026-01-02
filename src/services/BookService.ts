import type {Book } from "../models/Book";
import * as repo from "../repositories/BookRepository";


export async function getBookByTitle(title:string): Promise<Book[]> {
    return repo.getBookByTitle(title)
}

export async function getAllBooks():Promise<Book[]> {
    return repo.getAllBooks()
}

export async function getBookById(id: number): Promise<Book | undefined> {
    return repo.getBookById(id)
}

export async function addBook(newBook: Book): Promise<Book> {
    return repo.addBook(newBook);
}


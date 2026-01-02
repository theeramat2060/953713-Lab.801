import type {Book } from "../models/Book";
import {
    getAllBooks as allBooks , getBookByTitle as bookByTitle
    ,getBookById as bookById, addBook as addNewEvent } from "../repositories/BookRepository";


export async function getBookByTitle(title:string): Promise<Book[]> {
    return bookByTitle(title)
}

export async function getAllBooks():Promise<Book[]> {
    return allBooks()
}

export async function getBookById(id: number): Promise<Book | undefined> {
    return bookById(id)
}

export async function addBook(newBook: Book): Promise<Book> {
    return addNewEvent(newBook);
}


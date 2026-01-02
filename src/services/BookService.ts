import type {bookModel as Book} from "../generated/prisma/models/book";
import * as repo from "../repositories/BookRepositoryPrisma";


export async function getBookByTitle(title:string) {
    return repo.getBookByTitle(title);
}

export async function getAllBooks() {
    return repo.getAllBooks()
}

export async function getBookById(id: number) {
    return repo.getBookById(id)
}

export async function addBook(newBook: Book) {
    return repo.addBook(newBook);
}


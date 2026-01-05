import { prisma } from "../prisma";
import { Book } from "../models/Book";
import {BookRepository} from "../repositories/BookRepositoryPrisma";

const repo = new BookRepository(prisma);


export async function getBookByTitle(title:string) {
    return repo.findByTitle(title);
}

export async function getAllBooks() {
    return repo.findAll()
}

export async function getBookById(id: number) {
    return repo.findById(id)
}

export async function addBook(newBook: Book) {
    return repo.addBook(newBook);
}


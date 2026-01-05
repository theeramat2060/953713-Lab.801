import { prisma } from "../prisma";
import {AuthorRepository} from "../repositories/AuthorRepository";

const repo = new AuthorRepository(prisma);
export async function getAllAuthors() {
    return repo.findAll();
}
export async function getAuthorById(id: number) {
    return repo.findById(id);
}
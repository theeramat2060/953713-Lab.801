import { prisma } from "../prisma";
import { BorrowRepository } from "../repositories/BorrowRepository";

const repo = new BorrowRepository(prisma);

export async function getUnreturnedItems() {
    return repo.findUnreturnedItems();
}


export async function getOverdueItems() {
    return repo.findOverdueItems();
}

export async function getItemsDueOnDate(targetDate: Date) {
    return repo.findItemsDueOnDate(targetDate);
}

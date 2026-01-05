import { prisma } from "../prisma";
import {MemberRepository} from "../repositories/MemberRepository";

const repo = new MemberRepository(prisma);
export async function getAllMembers() {
    return repo.findAll();
}

export async function getMemberById(id: string) {
    return repo.findById(id);
}

export async function getMembersByName(name: string) {
    return repo.findByName(name);
}

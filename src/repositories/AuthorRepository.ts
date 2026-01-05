import { PrismaClient } from '@prisma/client';
export class AuthorRepository {
    constructor(private prisma: PrismaClient) {}

    async findAll() {
        return this.prisma.author.findMany({
            include: {
                books: true,
            },
        });
    }

    async findById(id: number) {
        return this.prisma.author.findUnique({
            where: { id },
            include: {
                books: true,
            },
        });
    }
}
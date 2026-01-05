import { PrismaClient } from '@prisma/client';
export class MemberRepository {
    constructor(private prisma: PrismaClient) {}

    async findAll() {
        return this.prisma.member.findMany();
    }

    async findById(id: string) {
        // Convert string to number using Number() or parseInt()
        const memberId = Number(id);

        // Safety check: ensure it's a valid number before querying
        if (isNaN(memberId)) {
            throw new Error(`Invalid ID: ${id}`);
        }

        return this.prisma.member.findUnique({
            where: { id: memberId }, // Pass the number, not the string
            include: {
                borrows: {
                    include: {
                        borrowItems: {
                            include: {
                                book: {
                                    include: {
                                        author: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
    }

    async findByName(name: string) {
        return this.prisma.member.findMany({
            where: {
                OR: [
                    {
                        firstName: {
                            contains: name,
                            mode: 'insensitive',
                        },
                    },
                    {
                        lastName: {
                            contains: name,
                            mode: 'insensitive',
                        },
                    },
                ],
            },
        });
    }
}
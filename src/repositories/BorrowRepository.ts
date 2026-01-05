import {PrismaClient} from "@prisma/client";

export class BorrowRepository {
    constructor(private prisma: PrismaClient) {}

    async findUnreturnedItems() {
        return this.prisma.borrowItem.findMany({
            where: {
                returnedAt: null,
            },
            include: {
                book: {
                    include: {
                        author: true,
                    },
                },
                borrow: {
                    include: {
                        member: true,
                    },
                },
            },
        });
    }

    async findOverdueItems() {
        const now = new Date();
        return this.prisma.borrowItem.findMany({
            where: {
                returnedAt: null,
                dueDate: {
                    lt: now,
                },
            },
            include: {
                book: {
                    include: {
                        author: true,
                    },
                },
                borrow: {
                    include: {
                        member: true,
                    },
                },
            },
        });
    }

    async findItemsDueOnDate(targetDate: Date) {
        const nextDay = new Date(targetDate);
        nextDay.setDate(nextDay.getDate() + 1);

        return this.prisma.borrowItem.findMany({
            where: {
                dueDate: {
                    gte: targetDate,
                    lt: nextDay,
                },
                returnedAt: null,
            },
            include: {
                book: {
                    include: {
                        author: true,
                    },
                },
                borrow: {
                    include: {
                        member: true,
                    },
                },
            },
        });
    }
}
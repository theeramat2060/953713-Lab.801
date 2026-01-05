import { Book } from './Book'; // Assuming you have book.ts

export interface Author {
    id: number;
    firstName: string;
    lastName: string;
    affiliation: string | null; // Nullable because of 'String?' in Prisma

    // Relation
    books?: Book[]; // Optional to avoid circular dependency issues when fetching
}
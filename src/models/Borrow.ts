// Imports - Adjust paths based on your folder structure
import { Member } from './Member';
import { BorrowItem } from './BorrowItem'; // or './borrowItem' depending on your file naming

export interface Borrow {
    id: number;
    memberId: number;
    borrowDate: Date; // Prisma returns a JavaScript Date object here

    // Relations are usually optional in interfaces because
    // they depend on whether you used 'include' in your query.
    member?: Member;
    borrowItems?: BorrowItem[];
}
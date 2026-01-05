// Imports
import { Book } from './Book';
import { Borrow } from './Borrow';

export interface BorrowItem {
    id: number;
    bookId: number;
    borrowId: number;

    dueDate: Date;
    returnedAt: Date | null; // Nullable because it might not be returned yet

    // Relations (Optional)
    book?: Book;
    borrow?: Borrow;
}
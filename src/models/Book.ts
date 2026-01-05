import { BorrowItem } from './BorrowItem';
import { Author } from './Author'; // Assuming you have an Author interface

export interface Book {
    id: number;
    title: string;
    isbn: string;
    category: string;
    description: string; // Ensure your DB has this field now, or make it optional (string?)

    // Relation IDs
    authorId: number;

    // Flattened Data (Optional - useful for tables)
    author_name: string;

    // Full Relation Objects (Optional - useful for details pages)
    // If you explicitly want the object, use the Type, not 'String'
    author?: Author;

    borrowItems: BorrowItem[];
}
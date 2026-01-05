import { Borrow } from './Borrow'; // Adjust import path as needed

export interface Member {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;

    // Relations
    borrows?: Borrow[];
}
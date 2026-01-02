// import type { Book } from "../models/Book";
// // import type {eventModel as Event} from "../generated/prisma/models/event";
// // import * as db from '../db';
//
//
// function getBookByTitle(title:string): Book[] {
//     const filteredBook = books.filter((book) => book.title === title);
//     return filteredBook;
// }
//
// function getAllBooks(): Book[] {
//     return books;
// }
//
// function getBookById(id: number): Book | undefined {
//     return  books.find((book) => book.id === id);
// }
//
// function addBook(newBook: Book): Book {
//     newBook.id = books.length + 1;
//     books.push(newBook);
//     return newBook;
// }
//
// export async function getEventByCategory(category: string): Promise<Event[]> {
//     const result = await db.query('SELECT * FROM events WHERE category = $1', [category]);
//     return result.rows as Event[];
// }
// export async function getAllEvents(): Promise<Event[]> {
//     const result = await db.query('SELECT * FROM events');
//     return result.rows as Event[];
// }
//
//
// export async function getEventById(id: number): Promise<Event | undefined> {
//     const result = await db.query('SELECT * FROM events WHERE id = $1', [id]);
//     const events = result.rows as Event[];
//     return events.length > 0 ? events[0] : undefined;
// }
//
//
// export async function addEvent(newEvent: Event): Promise<Event> {
//     const { category, title, description, location, date, time, petsAllowed, organizer } = newEvent;
//     const result = await db.query(
//         'INSERT INTO events (category, title, description, location, date, time, petsallowed, organizer) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
//         [category, title, description, location, date, time, petsAllowed, organizer]
//     );
//     return result.rows[0] as Event;
// }

// import type { Book } from "../models/Book";
// import pg from 'pg';
// const { Pool  } = pg;
// import * as db  from '../db';
//
//
// export async function getBookByTitle(title:string): Promise<Book[]> {
//     const result = await db.query('SELECT * FROM books WHERE title = $1', [title]);
//     return result.rows as Book[];
// }
//
// export async function getAllBooks():Promise<Book[]> {
//     const result = await db.query('SELECT * FROM books');
//     return result.rows as Book[];
// }
//
// export async function getBookById(id: number): Promise<Book | undefined> {
//     const result = await db.query('SELECT * FROM events WHERE id = $1', [id]);
//     const books = result.rows as Book[];
//     return books.length > 0 ? books[0] : undefined;
// }
//
// export async function addBook(newBook: Book): Promise<Book> {
//     const {  title, description, author_name, groups } = newBook;
//     const result = await db.query(
//         'INSERT INTO books (title, description, author_name, groups) VALUES ($1, $2, $3, $4) RETURNING *',
//         [title, description, author_name, groups]
//     );
//     return result.rows[0] as Book;
// }
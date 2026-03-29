import express, { Request, Response } from 'express'
import {getAllBooks, getBookById, addBook, getBookByTitle} from './services/BookService';
import type { Book } from './models/Book';
const app = express()
const port = 4000

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.json('Hello World!')
})

app.get('/books', async (req: Request, res: Response) => {
    if (req.query.title) {
        const title = req.query.title as string;
        const filteredBook = await getBookByTitle(title);
        res.json(filteredBook);
    } else {
        const books = await getAllBooks();
        res.json(books);
    }
});

app.get('/books/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const book = await getBookById(id);
    if (book) {
        res.json(book);
    } else {
        res.status(404).send("Book not found");
    }
});


app.post("/books", async (req: Request, res: Response) => {
    const newBook: Book = req.body;
    if (newBook.id !== undefined) {
        const existingBook = await getBookById(newBook.id);
        if (existingBook) {
            return res.json({
                message: `Book with id ${newBook.id} already exists`,
                data: existingBook,
            });
        }
    }
    const createdBook = await addBook(newBook);
    return res.json({
        message: "Book added",
        data: createdBook,
    });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
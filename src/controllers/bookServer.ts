import express, { Request, Response } from 'express'
import {getAllBooks, getBookById, addBook, getBookByTitle} from '../services/BookService';
import type { Book } from '../models/Book';
const app = express()
const port = 4000

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.json('Hello World!')
})

app.get('/books', (req: Request, res: Response) => {
    if (req.query.title) {
        const title = req.query.title as string;
        const filteredBook=getBookByTitle(title);
        res.json(filteredBook);
    }else {
        res.json(getAllBooks());
    }
});

app.get('/books/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const book = getBookById(id);
    if (book) {
        res.json(book);
    } else {
        res.status(404).send("Book not found");
    }
});


app.post("/books", (req: Request, res: Response) => {
    const newBook: Book = req.body;
    if (newBook.id !== undefined) {
        const allBooks = getAllBooks();
        const index = allBooks.findIndex((b: Book) => b.id === newBook.id);
        if (index !== -1) {
            allBooks[index] = newBook;
            return res.json({
                message: `Book updated (id: ${newBook.id})`,
                data: allBooks[index],
            });
        }
    }
    addBook(newBook);
    return res.json({
        message: "Book added",
        data: newBook,
    });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})



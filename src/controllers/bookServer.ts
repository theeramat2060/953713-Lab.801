import "dotenv/config";
import express, { Request, Response } from 'express'
import {getAllBooks, getBookById, addBook, getBookByTitle} from '../services/BookService';
import type { Book } from '../models/Book';
import {getAllAuthors, getAuthorById} from "../services/AuthorService";
import {getMemberById, getMembersByName} from "../services/MemberService";
import {getItemsDueOnDate, getOverdueItems, getUnreturnedItems} from "../services/BorrowService";
const app = express()
const port = 4000

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.json('Hello World!')
})

app.get('/books',async (req: Request, res: Response) => {
    if (req.query.title) {
        const title = req.query.title as string;
        const filteredBook = await getBookByTitle(title)
            res.json(filteredBook);
    }else {
        res.json( await getAllBooks());
    }
});

app.get('/books/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const book = await getBookById(id)
        if (book) {
            res.json(book);
        } else {
            res.status(404).send("Book not found");
        }
});


app.post("/books", async (req: Request, res: Response) => {
    try {
        const newBook: Book = req.body;
        const createdBook = await addBook(newBook);

        res.status(201).json({
            message: "Book added",
            data: createdBook,
        });
    } catch (error: any) {
        if (error.code === "P2002") {
            return res.status(400).json({
                message: "ISBN already exists",
            });
        }
        res.status(500).json({ message: "Server error" });
    }
});


app.get('/authors/:id',async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (id) {
        const authors = await getAuthorById(id)
        res.json(authors);
    }else {
        res.json( await getAllAuthors());
    }
});

app.get('/members/search', async (req: Request, res: Response) => {
    const name = req.query.name as string;
    if (name) {
        const members = await getMembersByName(name)
        res.json(members);
    }else {
        res.status(400).json({ message: "Name query parameter is required" });
    }
});

app.get('/members/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const member = await getMemberById(id)
        if (member) {
            res.json(member);
        } else {
            res.status(404).send("Member not found");
        }
});
app.get("/borrows/unreturned", async (req: Request, res: Response) => {
    const items = await getUnreturnedItems();
    res.json(items);
});

app.get("/borrows/overdue", async (req: Request, res: Response) => {
    const items = await getOverdueItems();
    res.json(items);
});

app.get("/borrows/due", async (req: Request, res: Response) => {
    try {
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({
                message: "date query parameter is required",
            });
        }

        const targetDate = new Date(date as string);

        if (isNaN(targetDate.getTime())) {
            return res.status(400).json({
                message: "Invalid date format (use YYYY-MM-DD)",
            });
        }

        const items = await getItemsDueOnDate(targetDate);
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})



// import * as repo from "../repositories/BookRepositoryDb";
// import type {eventModel as Event} from "../generated/prisma/models/event";
// import * as repo from "../repositories/BookRepositoryPrisma";
import type {Book } from "../models/Book";

const books: Book[] = [
    {
        id: 1,
        title: "The Silent Forest",
        Author_name: "Elena Thorne",
        description: "A thrilling mystery set in the deep woods of Scandinavia.",
        groups: "Mystery"
    },
    {
        id: 2,
        title: "Digital Horizon",
        Author_name: "Marcus Vane",
        description: "Exploring the future of Artificial Intelligence and humanity.",
        groups: "Technology"
    },
    {
        id: 3,
        title: "Cooking with Fire",
        Author_name: "Chef Julian",
        description: "A comprehensive guide to traditional open-flame cooking techniques.",
        groups: "Lifestyle"
    },
    {
        id: 4,
        title: "Empire of Sands",
        Author_name: "Sarah J. Miller",
        description: "An epic fantasy novel about lost kingdoms and ancient magic.",
        groups: "Fantasy"
    },
    {
        id: 5,
        title: "Modern Economics",
        Author_name: "Dr. Robert Chen",
        description: "An insightful look into global market trends in the 21st century.",
        groups: "Finance"
    },
    {
        id: 6,
        title: "The Art of Mindfulness",
        Author_name: "Lao Tzu Jr.",
        description: "Daily practices for finding peace in a chaotic world.",
        groups: "Self-Help"
    },
    {
        id: 7,
        title: "Beyond the Stars",
        Author_name: "Neil Armstrong II",
        description: "A scientific journey through the latest discoveries in deep space.",
        groups: "Science"
    },
    {
        id: 8,
        title: "Shadow of the City",
        Author_name: "Detective Hardins",
        description: "A gritty noir story following a private investigator in 1950s New York.",
        groups: "Crime"
    },
    {
        id: 9,
        title: "Wellness Revolution",
        Author_name: "Dr. Anna Smith",
        description: "Breaking down the myths of modern nutrition and exercise.",
        groups: "Health"
    },
    {
        id: 10,
        title: "The Last Lighthouse",
        Author_name: "Captain Thomas",
        description: "A heartwarming historical fiction about a family living on the coast.",
        groups: "History"
    }
];
export function getBookByTitle(title:string): Book[] {
    const filteredBook = books.filter((book) => book.title === title);
    return filteredBook;
}

export function getAllBooks(): Book[] {
    return books;
}

export function getBookById(id: number): Book | undefined {
    return  books.find((book) => book.id === id);
}

export function addBook(newBook: Book): Book {
    newBook.id = books.length + 1;
    books.push(newBook);
    return newBook;
}


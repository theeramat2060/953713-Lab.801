import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
    adapter,
    log: ['query', 'info', 'warn', 'error'],
});
async function main() {
    console.log('🌱 Starting seed...');

    // 1. Clear existing data
    // Order matters to avoid foreign key constraints
    await prisma.borrowItem.deleteMany();
    await prisma.borrow.deleteMany();
    await prisma.book.deleteMany();
    await prisma.author.deleteMany();
    await prisma.member.deleteMany();

    console.log('🗑️  Cleared existing data');

    // 2. Create Authors (15 records)
    const authors = await prisma.author.createMany({
        data: [
            { firstName: 'J.K.', lastName: 'Rowling', affiliation: 'Bloomsbury Publishing' },
            { firstName: 'George', lastName: 'Orwell', affiliation: 'Penguin Books' },
            { firstName: 'Haruki', lastName: 'Murakami', affiliation: 'Kodansha' },
            { firstName: 'Gabriel', lastName: 'García Márquez', affiliation: 'Editorial Sudamericana' },
            { firstName: 'Agatha', lastName: 'Christie', affiliation: 'Collins Crime Club' },
            { firstName: 'Stephen', lastName: 'King', affiliation: 'Scribner' },
            { firstName: 'Jane', lastName: 'Austen', affiliation: 'Thomas Egerton' },
            { firstName: 'Ernest', lastName: 'Hemingway', affiliation: 'Charles Scribner\'s Sons' },
            { firstName: 'Virginia', lastName: 'Woolf', affiliation: 'Hogarth Press' },
            { firstName: 'Leo', lastName: 'Tolstoy', affiliation: 'The Russian Messenger' },
            { firstName: 'J.R.R.', lastName: 'Tolkien', affiliation: 'Allen & Unwin' },
            { firstName: 'Isaac', lastName: 'Asimov', affiliation: 'Gnome Press' },
            { firstName: 'Walter', lastName: 'Isaacson', affiliation: 'Simon & Schuster' },
            { firstName: 'Yuval Noah', lastName: 'Harari', affiliation: 'Harvill Secker' },
            { firstName: 'Frank', lastName: 'Herbert', affiliation: 'Chilton Books' },
        ],
    });

    const authorList = await prisma.author.findMany();
    console.log(`✅ Created ${authors.count} authors`);

    // 3. Create Books (25 records)
    // Note: authorId maps to index of authorList. Ensure authorList is sorted by ID or creation order if unsure.
    const books = await prisma.book.createMany({
        data: [
            { title: 'Harry Potter and the Philosopher\'s Stone', isbn: '978-0-7475-3269-9', category: 'Fantasy', authorId: authorList[0].id },
            { title: 'Harry Potter and the Chamber of Secrets', isbn: '978-0-7475-3849-3', category: 'Fantasy', authorId: authorList[0].id },
            { title: '1984', isbn: '978-0-452-28423-4', category: 'Dystopian Fiction', authorId: authorList[1].id },
            { title: 'Animal Farm', isbn: '978-0-452-28424-1', category: 'Political Satire', authorId: authorList[1].id },
            { title: 'Norwegian Wood', isbn: '978-0-375-70461-8', category: 'Literary Fiction', authorId: authorList[2].id },
            { title: 'Kafka on the Shore', isbn: '978-1-4000-7927-6', category: 'Magical Realism', authorId: authorList[2].id },
            { title: 'One Hundred Years of Solitude', isbn: '978-0-06-088328-7', category: 'Magical Realism', authorId: authorList[3].id },
            { title: 'Murder on the Orient Express', isbn: '978-0-00-711931-8', category: 'Mystery', authorId: authorList[4].id },
            { title: 'And Then There Were None', isbn: '978-0-00-712279-0', category: 'Mystery', authorId: authorList[4].id },
            { title: 'The Shining', isbn: '978-0-385-12167-5', category: 'Horror', authorId: authorList[5].id },
            { title: 'It', isbn: '978-0-450-41143-8', category: 'Horror', authorId: authorList[5].id },
            { title: 'Pride and Prejudice', isbn: '978-0-14-143951-8', category: 'Romance', authorId: authorList[6].id },
            { title: 'The Old Man and the Sea', isbn: '978-0-684-80122-3', category: 'Literary Fiction', authorId: authorList[7].id },
            { title: 'Mrs Dalloway', isbn: '978-0-15-662870-9', category: 'Modernist Literature', authorId: authorList[8].id },
            { title: 'War and Peace', isbn: '978-0-19-953272-2', category: 'Historical Fiction', authorId: authorList[9].id },
            { title: 'The Fellowship of the Ring', isbn: '978-0-395-48931-4', category: 'Fantasy', authorId: authorList[10].id },
            { title: 'The Two Towers', isbn: '978-0-395-48933-8', category: 'Fantasy', authorId: authorList[10].id },
            { title: 'The Return of the King', isbn: '978-0-395-48930-7', category: 'Fantasy', authorId: authorList[10].id },
            { title: 'Foundation', isbn: '978-0-553-29335-7', category: 'Science Fiction', authorId: authorList[11].id },
            { title: 'I, Robot', isbn: '978-0-553-29438-5', category: 'Science Fiction', authorId: authorList[11].id },
            { title: 'Steve Jobs', isbn: '978-1-451-64853-9', category: 'Biography', authorId: authorList[12].id },
            { title: 'Elon Musk', isbn: '978-1-982-18128-4', category: 'Biography', authorId: authorList[12].id },
            { title: 'Sapiens: A Brief History of Humankind', isbn: '978-0-06-231609-7', category: 'History', authorId: authorList[13].id },
            { title: 'Homo Deus: A Brief History of Tomorrow', isbn: '978-0-06-246431-6', category: 'Philosophy', authorId: authorList[13].id },
            { title: 'Dune', isbn: '978-0-441-17271-9', category: 'Science Fiction', authorId: authorList[14].id },
        ],
    });

    const bookList = await prisma.book.findMany();
    console.log(`✅ Created ${books.count} books`);

    // 4. Create Members (20 records)
    const members = await prisma.member.createMany({
        data: [
            { firstName: 'Somchai', lastName: 'Jaidee', phoneNumber: '081-234-5678' },
            { firstName: 'Siriwan', lastName: 'Thongchai', phoneNumber: '082-345-6789' },
            { firstName: 'Nattapong', lastName: 'Suksakul', phoneNumber: '083-456-7890' },
            { firstName: 'Pimchanok', lastName: 'Wongsakorn', phoneNumber: '084-567-8901' },
            { firstName: 'Ananya', lastName: 'Pattanakul', phoneNumber: '085-678-9012' },
            { firstName: 'Kittipong', lastName: 'Srisuwan', phoneNumber: '086-789-0123' },
            { firstName: 'Waranya', lastName: 'Chansiri', phoneNumber: '087-890-1234' },
            { firstName: 'Thanaporn', lastName: 'Rattanachai', phoneNumber: '088-901-2345' },
            { firstName: 'Somsak', lastName: 'Pongpanich', phoneNumber: '089-012-3456' },
            { firstName: 'Kulthida', lastName: 'Somboon', phoneNumber: '090-123-4567' },
            { firstName: 'Arthit', lastName: 'Ratanaporn', phoneNumber: '081-111-2222' },
            { firstName: 'Nipa', lastName: 'Kaewmanee', phoneNumber: '089-999-8888' },
            { firstName: 'Wichai', lastName: 'Prasert', phoneNumber: '086-555-4444' },
            { firstName: 'Malee', lastName: 'Srisai', phoneNumber: '084-333-7777' },
            { firstName: 'Chaiyo', lastName: 'Boonmee', phoneNumber: '082-222-6666' },
            { firstName: 'Ratana', lastName: 'Khampee', phoneNumber: '091-444-9999' },
            { firstName: 'Pricha', lastName: 'Jitsomboon', phoneNumber: '083-777-1111' },
            { firstName: 'Kamoltip', lastName: 'Wattanapong', phoneNumber: '085-888-2222' },
            { firstName: 'Suchart', lastName: 'Trairat', phoneNumber: '087-666-3333' },
            { firstName: 'Darika', lastName: 'Pongsawat', phoneNumber: '090-555-0000' },
        ],
    });

    const memberList = await prisma.member.findMany();
    console.log(`✅ Created ${members.count} members`);

    // 5. Generate Random Borrows
    // Helper: Calculate date offsets
    const now = new Date();
    const daysAgo = (days: number) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    console.log('🎲 Generating random borrow history...');

    let borrowCount = 0;

    for (const member of memberList) {
        // 80% chance a member has borrow history
        if (Math.random() > 0.2) {

            // Random number of transactions (1 to 4 per member)
            const transactionCount = Math.floor(Math.random() * 4) + 1;

            for (let i = 0; i < transactionCount; i++) {
                // Randomly borrowed between 1 and 60 days ago
                const daysAgoBorrowed = Math.floor(Math.random() * 60) + 1;

                // Random books (1 to 3 books per transaction)
                const bookCount = Math.floor(Math.random() * 3) + 1;
                const selectedBooks = [];

                // Pick unique random books to avoid duplicate keys in one transaction
                const availableBooks = [...bookList];
                for(let j=0; j<bookCount; j++) {
                    const randomIndex = Math.floor(Math.random() * availableBooks.length);
                    selectedBooks.push(availableBooks[randomIndex]);
                    availableBooks.splice(randomIndex, 1);
                }

                await prisma.borrow.create({
                    data: {
                        memberId: member.id,
                        borrowDate: daysAgo(daysAgoBorrowed),
                        borrowItems: {
                            create: selectedBooks.map(book => {
                                // 60% chance the book is already returned
                                const isReturned = Math.random() > 0.4;
                                const dueDays = 7; // Books are due in 7 days

                                // If returned, assume it was returned randomly 0-5 days after due date (some late, some early)
                                // If not returned, returnedAt is null
                                const returnedDate = isReturned
                                    ? daysAgo(daysAgoBorrowed - (dueDays + Math.floor(Math.random() * 5) - 2))
                                    : null;

                                return {
                                    bookId: book.id,
                                    dueDate: daysAgo(daysAgoBorrowed - dueDays),
                                    returnedAt: returnedDate
                                };
                            })
                        }
                    }
                });
                borrowCount++;
            }
        }
    }
    console.log(`✅ Generated ${borrowCount} borrow transactions`);

    // 6. Summary
    const summary = {
        authors: await prisma.author.count(),
        books: await prisma.book.count(),
        members: await prisma.member.count(),
        borrows: await prisma.borrow.count(),
        borrowItems: await prisma.borrowItem.count(),
    };

    console.log('\n📊 Database Summary:', summary);
    console.log('🎉 Seed completed successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
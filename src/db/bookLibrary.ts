
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
// @ts-ignore
const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting seed...');

    // Clear existing data (ใช้ชื่อตาม @@map ใน schema)
    await prisma.borrowItem.deleteMany();
    await prisma.borrow.deleteMany();
    await prisma.book.deleteMany();
    await prisma.author.deleteMany();
    await prisma.member.deleteMany();

    console.log('🗑️  Cleared existing data');

    // Create Authors (10 records)
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
        ],
    });

    const authorList = await prisma.author.findMany();
    console.log(`✅ Created ${authors.count} authors`);

    // Create Books (15 records)
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
        ],
    });

    const bookList = await prisma.book.findMany();
    console.log(`✅ Created ${books.count} books`);

    // Create Members (10 records)
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
        ],
    });

    const memberList = await prisma.member.findMany();
    console.log(`✅ Created ${members.count} members`);

    // Helper functions
    const now = new Date();
    const daysAgo = (days: number) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    const daysFromNow = (days: number) => new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

    // Create Borrows with BorrowItems (10 records)
    await prisma.borrow.create({
        data: {
            memberId: memberList[0].id,
            borrowDate: daysAgo(10),
            borrowItems: {
                create: [
                    { bookId: bookList[0].id, dueDate: daysFromNow(4), returnedAt: daysAgo(3) },
                    { bookId: bookList[1].id, dueDate: daysFromNow(4), returnedAt: null },
                ],
            },
        },
    });

    await prisma.borrow.create({
        data: {
            memberId: memberList[1].id,
            borrowDate: daysAgo(5),
            borrowItems: {
                create: [
                    { bookId: bookList[2].id, dueDate: daysFromNow(9), returnedAt: null },
                    { bookId: bookList[3].id, dueDate: daysFromNow(9), returnedAt: null },
                    { bookId: bookList[4].id, dueDate: daysFromNow(9), returnedAt: null },
                ],
            },
        },
    });

    await prisma.borrow.create({
        data: {
            memberId: memberList[2].id,
            borrowDate: daysAgo(15),
            borrowItems: {
                create: [
                    { bookId: bookList[5].id, dueDate: daysAgo(1), returnedAt: daysAgo(2) },
                ],
            },
        },
    });

    await prisma.borrow.create({
        data: {
            memberId: memberList[3].id,
            borrowDate: daysAgo(20),
            borrowItems: {
                create: [
                    { bookId: bookList[6].id, dueDate: daysAgo(6), returnedAt: null },
                    { bookId: bookList[7].id, dueDate: daysAgo(6), returnedAt: null },
                ],
            },
        },
    });

    await prisma.borrow.create({
        data: {
            memberId: memberList[4].id,
            borrowDate: daysAgo(7),
            borrowItems: {
                create: [
                    { bookId: bookList[8].id, dueDate: daysFromNow(7), returnedAt: null },
                ],
            },
        },
    });

    await prisma.borrow.create({
        data: {
            memberId: memberList[5].id,
            borrowDate: daysAgo(30),
            borrowItems: {
                create: [
                    { bookId: bookList[9].id, dueDate: daysAgo(16), returnedAt: daysAgo(17) },
                    { bookId: bookList[10].id, dueDate: daysAgo(16), returnedAt: daysAgo(16) },
                    { bookId: bookList[11].id, dueDate: daysAgo(16), returnedAt: daysAgo(15) },
                ],
            },
        },
    });

    await prisma.borrow.create({
        data: {
            memberId: memberList[6].id,
            borrowDate: daysAgo(12),
            borrowItems: {
                create: [
                    { bookId: bookList[12].id, dueDate: daysAgo(5), returnedAt: daysAgo(3) },
                    { bookId: bookList[13].id, dueDate: daysFromNow(2), returnedAt: null },
                ],
            },
        },
    });

    await prisma.borrow.create({
        data: {
            memberId: memberList[7].id,
            borrowDate: daysAgo(25),
            borrowItems: {
                create: [
                    { bookId: bookList[14].id, dueDate: daysAgo(11), returnedAt: null },
                ],
            },
        },
    });

    await prisma.borrow.create({
        data: {
            memberId: memberList[8].id,
            borrowDate: daysAgo(14),
            borrowItems: {
                create: [
                    { bookId: bookList[0].id, dueDate: now, returnedAt: null },
                ],
            },
        },
    });

    await prisma.borrow.create({
        data: {
            memberId: memberList[9].id,
            borrowDate: daysAgo(13),
            borrowItems: {
                create: [
                    { bookId: bookList[5].id, dueDate: daysFromNow(1), returnedAt: null },
                ],
            },
        },
    });

    console.log('✅ Created 10 borrow records');

    const summary = {
        authors: await prisma.author.count(),
        books: await prisma.book.count(),
        members: await prisma.member.count(),
        borrows: await prisma.borrow.count(),
        borrowItems: await prisma.borrowItem.count(),
    };

    console.log('\n📊 Summary:', summary);
    console.log('🎉 Seed completed!');
}

main()
    .catch((e) => {
        console.error('❌ Error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
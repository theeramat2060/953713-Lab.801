import { createBooks } from '../src/db/createBooks.js';

async function main() {
    prisma.book.deleteMany().then(() => {
        createBooks()
            .catch((e) => {
                console.error(e);
                process.exit(1);
            })
            .finally(async () => {
                await prisma.$disconnect();
            });
    })
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
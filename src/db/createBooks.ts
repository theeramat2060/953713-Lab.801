// import { prisma } from '../lib/prisma';
//
// export const createBooks = async () => {
//     const books = [
//         { title: 'The Silent Forest', author_name: 'Elena Thorne', description: 'A thrilling mystery set in the deep woods of Scandinavia.', groups: 'Mystery' },
//         { title: 'Digital Horizon', author_name: 'Marcus Vane', description: 'Exploring the future of Artificial Intelligence and humanity.', groups: 'Technology' },
//         { title: 'Cooking with Fire', author_name: 'Chef Julian', description: 'A comprehensive guide to traditional open-flame cooking techniques.', groups: 'Lifestyle' },
//         { title: 'Empire of Sands', author_name: 'Sarah J. Miller', description: 'An epic fantasy novel about lost kingdoms and ancient magic.', groups: 'Fantasy' },
//         { title: 'Modern Economics', author_name: 'Dr. Robert Chen', description: 'An insightful look into global market trends in the 21st century.', groups: 'Finance' },
//         { title: 'The Art of Mindfulness', author_name: 'Lao Tzu Jr.', description: 'Daily practices for finding peace in a chaotic world.', groups: 'Self-Help' },
//         { title: 'Beyond the Stars', author_name: 'Neil Armstrong II', description: 'A scientific journey through the latest discoveries in deep space.', groups: 'Science' },
//         { title: 'Shadow of the City', author_name: 'Detective Hardins', description: 'A gritty noir story following a private investigator in 1950s New York.', groups: 'Crime' },
//         { title: 'Wellness Revolution', author_name: 'Dr. Anna Smith', description: 'Breaking down the myths of modern nutrition and exercise.', groups: 'Health' },
//         { title: 'The Last Lighthouse', author_name: 'Captain Thomas', description: 'A heartwarming historical fiction about a family living on the coast.', groups: 'History' },
//     ];
//
//     try {
//         await prisma.book.createMany({
//             data: books,
//             skipDuplicates: true
//         });
//         console.log("✅ Database has been initialized with 10 books.");
//     } catch (error) {
//         console.error("❌ Error seeding books:", error);
//     } finally {
//         await prisma.$disconnect();
//     }
// }
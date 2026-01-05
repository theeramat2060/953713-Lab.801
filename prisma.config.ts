import "dotenv/config";
import { defineConfig } from "prisma/config";

// @ts-ignore
export default defineConfig({
    schema: "prisma/schema.prisma",
// @ts-ignore
    migrate: {
        datasource: "db",
    },

    datasources: {
        db: {
            url: process.env.DATABASE_URL!,
        },
    },
});

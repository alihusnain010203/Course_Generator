import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './src/config/db/schemas/CourseSchema.ts',
    out: './drizzle',
    dialect: 'postgresql', // 'postgresql' | 'mysql' | 'sqlite'
    dbCredentials: {
        host: process.env.DB_HOST || 'ep-damp-bird-a5hylc7i.us-east-2.aws.neon.tech',
        user: process.env.DB_USER || 'postgress_owner',
        password: process.env.DB_PASSWORD || '7OzJ6YsRkISA',
        database: process.env.DB_NAME || 'Course_Gen',
    },
    verbose: true,
    strict: true,
});

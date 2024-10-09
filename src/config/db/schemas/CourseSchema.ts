
import { serial, varchar, text, pgTable, pgSchema } from "drizzle-orm/pg-core";
export const mySchema = pgSchema("CourseSchema");
export const CourseSchema = pgTable('CourseSchema', {
    id: serial('id').primaryKey(),
    courseId: varchar('courseId').notNull(),
    name: varchar('name').notNull(),
    category: varchar('category').notNull(),
    level: varchar('level').notNull(), 
    courseOutput: text('courseOutput').notNull(),
    description: text('description').notNull(),
    referencedVideo: varchar('referencedVideo').notNull().default('Yes'),
    noOfChapters: varchar('noOfChapters').notNull(),
    duration: varchar('duration').notNull(),
    createdBy: varchar('createdBy').notNull(),
    userName: varchar('userName').notNull(),
    userEmail: varchar('userEmail').notNull(),
    courseImage: varchar('CoureImage').notNull().default(""),
});
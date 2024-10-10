
import { serial, varchar, text, pgTable, pgSchema } from "drizzle-orm/pg-core";
export const mySchema = pgSchema("TransactionSchema");
export const TransactionSchema = pgTable('TransactionSchema', {
    id: serial('id').primaryKey(),
    email: varchar('email').notNull(),
    supscription_date: varchar('supscription_date').notNull(),
    expiry_date: varchar('expiry_date').notNull(),
    amount: varchar('amount').notNull(),
});
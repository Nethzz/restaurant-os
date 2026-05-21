import {
    pgTable,
    serial,
    text,
    numeric,
} from 'drizzle-orm/pg-core';

export const menuItems = pgTable('menu_items', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    price: numeric('price').notNull(),
});
import {
    pgTable,
    serial,
    text,
    numeric,
    integer,
    boolean,
    timestamp,
} from 'drizzle-orm/pg-core';

export const menuCategories = pgTable('menu_categories', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
});

export const menuItems = pgTable('menu_items', {
    id: serial('id').primaryKey(),
    categoryId: integer('category_id').references(() => menuCategories.id),
    name: text('name').notNull(),
    price: numeric('price').notNull(),
    available: boolean('available').default(true),
});

export const customers = pgTable('customers', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email'),
});

export const orders = pgTable('orders', {
    id: serial('id').primaryKey(),
    customerId: integer('customer_id').references(() => customers.id),
    status: text('status').notNull(),
    total: numeric('total').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});

export const orderItems = pgTable('order_items', {
    id: serial('id').primaryKey(),
    orderId: integer('order_id').references(() => orders.id),
    menuItemId: integer('menu_item_id').references(() => menuItems.id),
    quantity: integer('quantity').notNull(),
});

export const settings = pgTable('settings', {
    id: serial('id').primaryKey(),
    prepTimeMinutes: integer('prep_time_minutes').default(15),
    autoAcceptOrders: boolean('auto_accept_orders').default(false),
});
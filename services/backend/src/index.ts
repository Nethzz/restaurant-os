// services/backend/src/index.ts
// This file sets up the Hono server and defines the API routes for the RestaurantOS backend. It imports the `db` object from the `db` module to interact with the database and defines two routes: a root route that returns a welcome message and a `/menu-items` route that retrieves all menu items from the database and returns them as JSON.

import { OpenAPIHono } from '@hono/zod-openapi';
import { getDb } from './db';
import {
    menuItems,
    menuCategories,
    customers,
    orders,
    settings,
} from './db/schema';
import { getMenuItemsRoute } from './routes/menu-items';
import {
    getMenuCategoriesRoute,
    getCustomersRoute,
    getOrdersRoute,
    getSettingsRoute,
} from './routes/routes';
import { cors } from 'hono/cors';
const app = new OpenAPIHono();

app.use(
    '*',
    cors({
        origin: '*',
    })
);

app.get('/', (c) => {
    return c.json({
        message: 'RestaurantOS API',
    });
});

app.openapi(getMenuItemsRoute, async (c) => {
    const db = getDb();
    return c.json(await db.select().from(menuItems));
});

app.openapi(getMenuCategoriesRoute, async (c) => {
    const db = getDb();
    return c.json(await db.select().from(menuCategories));
});

app.openapi(getCustomersRoute, async (c) => {
    const db = getDb();
    return c.json(await db.select().from(customers));
});

app.openapi(getOrdersRoute, async (c) => {
    const db = getDb();
    return c.json(await db.select().from(orders));
});

app.openapi(getSettingsRoute, async (c) => {
    const db = getDb();
    return c.json(await db.select().from(settings));
});

app.doc('/openapi.json', {
    openapi: '3.0.0',
    info: {
        title: 'RestaurantOS API',
        version: '1.0.0',
    },
});

export default app;
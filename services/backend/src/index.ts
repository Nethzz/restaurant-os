// services/backend/src/index.ts
// This file sets up the Hono server and defines the API routes for the RestaurantOS backend. It imports the `db` object from the `db` module to interact with the database and defines two routes: a root route that returns a welcome message and a `/menu-items` route that retrieves all menu items from the database and returns them as JSON.

import { Hono } from 'hono';
import { db } from './db';
import { menuItems } from './db/schema';

const app = new Hono();

app.get('/', (c) => {
    return c.json({
        message: 'RestaurantOS API',
    });
});

app.get('/menu-items', async (c) => {
    const items = await db.select().from(menuItems);

    return c.json(items);
});

export default app;
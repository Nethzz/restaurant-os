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
import {
    createOrderRoute,
} from './routes/create-order';
import { eq } from 'drizzle-orm';
import {
    updateOrderStatusRoute,
} from './routes/update-order-status';

import {
    createMenuItemRoute,
} from './routes/create-menu-item';
import { updateSettingsRoute } from './routes/update-settings';

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

app.openapi(createOrderRoute, async (c) => {
    const db = getDb();

    const body = c.req.valid('json');

    const result = await db
        .insert(orders)
        .values({
            customerId: body.customerId,
            status: body.status,
            total: body.total,
        })
        .returning();

    return c.json(result[0], 201);
});

app.openapi(
    updateOrderStatusRoute,
    async (c) => {
        const db = getDb();

        const { id } = c.req.valid('param');
        const body = c.req.valid('json');

        const result = await db
            .update(orders)
            .set({
                status: body.status,
            })
            .where(eq(orders.id, Number(id)))
            .returning();

        return c.json(result[0]);
    }
);

app.openapi(
    createMenuItemRoute,
    async (c) => {
        const db = getDb();

        const body = c.req.valid('json');

        const result = await db
            .insert(menuItems)
            .values({
                categoryId: body.categoryId,
                name: body.name,
                price: body.price,
                available: body.available,
            })
            .returning();

        return c.json(result[0], 201);
    }
);

app.openapi(updateSettingsRoute, async (c) => {
    const db = getDb();

    const body = await c.req.json();

    await db
        .update(settings)
        .set({
            prepTimeMinutes:
                body.prepTimeMinutes,
            autoAcceptOrders:
                body.autoAcceptOrders,
        })
        .where(eq(settings.id, 1));

    return c.json({
        success: true,
    });
});

app.doc('/openapi.json', {
    openapi: '3.0.0',
    info: {
        title: 'RestaurantOS API',
        version: '1.0.0',
    },
});

export default app;
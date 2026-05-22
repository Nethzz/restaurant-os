import { createRoute, z } from '@hono/zod-openapi';

export const createMenuItemSchema = z.object({
    categoryId: z.number().nullable(),
    name: z.string(),
    price: z.string(),
    available: z.boolean(),
});

export const createMenuItemRoute = createRoute({
    method: 'post',
    path: '/menu-items',
    tags: ['Menu'],
    request: {
        body: {
            content: {
                'application/json': {
                    schema: createMenuItemSchema,
                },
            },
        },
    },
    responses: {
        201: {
            description: 'Menu item created',
        },
    },
});
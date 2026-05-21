import { createRoute, z } from '@hono/zod-openapi';

export const getMenuItemsRoute = createRoute({
    method: 'get',
    path: '/menu-items',
    tags: ['Menu'],
    responses: {
        200: {
            description: 'List of menu items',
            content: {
                'application/json': {
                    schema: z.array(
                        z.object({
                            id: z.number(),
                            categoryId: z.number().nullable(),
                            name: z.string(),
                            price: z.string(),
                            available: z.boolean().nullable(),
                        })
                    ),
                },
            },
        },
    },
});
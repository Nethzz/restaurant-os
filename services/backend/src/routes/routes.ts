import { createRoute, z } from '@hono/zod-openapi';

export const getMenuCategoriesRoute = createRoute({
    method: 'get',
    path: '/menu-categories',
    tags: ['Menu'],
    responses: {
        200: {
            description: 'Menu categories',
            content: {
                'application/json': {
                    schema: z.array(
                        z.object({
                            id: z.number(),
                            name: z.string(),
                        })
                    ),
                },
            },
        },
    },
});

export const getCustomersRoute = createRoute({
    method: 'get',
    path: '/customers',
    tags: ['Customers'],
    responses: {
        200: {
            description: 'Customers',
            content: {
                'application/json': {
                    schema: z.array(
                        z.object({
                            id: z.number(),
                            name: z.string(),
                            email: z.string().nullable(),
                        })
                    ),
                },
            },
        },
    },
});

export const getOrdersRoute = createRoute({
    method: 'get',
    path: '/orders',
    tags: ['Orders'],
    responses: {
        200: {
            description: 'Orders',
            content: {
                'application/json': {
                    schema: z.array(
                        z.object({
                            id: z.number(),
                            customerId: z.number().nullable(),
                            status: z.string(),
                            total: z.string(),
                            createdAt: z.string().nullable(),
                        })
                    ),
                },
            },
        },
    },
});

export const getSettingsRoute = createRoute({
    method: 'get',
    path: '/settings',
    tags: ['Settings'],
    responses: {
        200: {
            description: 'Settings',
            content: {
                'application/json': {
                    schema: z.array(
                        z.object({
                            id: z.number(),
                            prepTimeMinutes: z.number().nullable(),
                            autoAcceptOrders: z.boolean().nullable(),
                        })
                    ),
                },
            },
        },
    },
});
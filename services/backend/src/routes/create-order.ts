import { createRoute, z } from '@hono/zod-openapi';

export const createOrderSchema = z.object({
    customerId: z.number().nullable(),
    status: z.string(),
    total: z.string(),
});

export const createOrderRoute = createRoute({
    method: 'post',
    path: '/orders',
    tags: ['Orders'],
    request: {
        body: {
            content: {
                'application/json': {
                    schema: createOrderSchema,
                },
            },
        },
    },
    responses: {
        201: {
            description: 'Order created',
        },
    },
});
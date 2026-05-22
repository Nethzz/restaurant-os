import { createRoute, z } from '@hono/zod-openapi';

export const updateOrderStatusSchema = z.object({
    status: z.enum([
        'PENDING',
        'COMPLETED',
        'CANCELLED',
    ]),
});

export const updateOrderStatusRoute = createRoute({
    method: 'patch',
    path: '/orders/{id}/status',
    tags: ['Orders'],
    request: {
        params: z.object({
            id: z.string(),
        }),
        body: {
            content: {
                'application/json': {
                    schema: updateOrderStatusSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: 'Order updated',
        },
    },
});
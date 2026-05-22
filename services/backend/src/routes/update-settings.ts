import { createRoute, z } from '@hono/zod-openapi';

export const updateSettingsRoute = createRoute({
    method: 'patch',
    path: '/settings',
    tags: ['Settings'],

    request: {
        body: {
            content: {
                'application/json': {
                    schema: z.object({
                        prepTimeMinutes: z.number(),
                        autoAcceptOrders: z.boolean(),
                    }),
                },
            },
        },
    },

    responses: {
        200: {
            description: 'Settings updated',
        },
    },
});
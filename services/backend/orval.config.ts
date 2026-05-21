export default {
    restaurantApi: {
        input: {
            target: 'http://localhost:8787/openapi.json',
        },
        output: {
            target: '../../packages/api-client/src/client.ts',
            client: 'fetch',
        },
    },
};
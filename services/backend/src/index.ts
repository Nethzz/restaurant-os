// services/backend/src/index.ts
// This is a simple backend API for the RestaurantOS application. It uses the Hono framework to create a RESTful API that can be deployed on Cloudflare Workers.
// The API has two endpoints:
// 1. GET / - Returns a welcome message.
// 2. GET /menu-items - Returns a list of menu items with their id, name, and price.

import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
    return c.json({
        message: 'RestaurantOS API',
    })
})

app.get('/menu-items', (c) => {
    return c.json([
        {
            id: 1,
            name: 'Margherita Pizza',
            price: 12.99,
        },
        {
            id: 2,
            name: 'Burger',
            price: 10.5,
        },
    ])
})

export default app
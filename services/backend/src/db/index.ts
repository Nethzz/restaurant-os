// services/backend/src/db/index.ts
// This file sets up the database connection using the Drizzle ORM and the Postgres client. It exports a `db` object that can be used to interact with the database in other parts of the application.
// The database connection is configured to connect to a PostgreSQL database running on localhost with the name `restaurant_os` and the user `neethu
// The `db` object is created using the `drizzle` function from the Drizzle ORM, which takes the Postgres client as an argument.

import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

export function getDb() {
    const client = postgres(
        'postgresql://neethu@localhost:5432/restaurant_os'
    );

    return drizzle(client);
}
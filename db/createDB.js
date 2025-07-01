#! /user/bin/env node

if (process.env.NODE_ENV !== "PROD") {
    require("dotenv").config();
}

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR( 255 ) NOT NULL,
    first_name VARCHAR( 255 ) NOT NULL,
    last_name VARCHAR( 255 ) NOT NULL,
    password VARCHAR( 255 ) NOT NULL,
    mem_status BOOLEAN DEFAULT FALSE,
    admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    msg VARCHAR( 255 ) NOT NULL,
    created TIMESTAMP DEFAULT NOW()
);
`;

async function main() {
    console.log("Creating users and messages table...");
    const client = new Client ({
        connectionString: process.env.DATABASE_URL
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("Done.");
}

main();
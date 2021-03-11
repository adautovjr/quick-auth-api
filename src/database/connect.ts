import { createConnection } from 'typeorm';

createConnection()
    .then(() => console.log("📦  Connected to database!"))
    .catch((error) => console.error(error));
import { createMongo } from "./createMongo";

const db = createMongo({uri: process.env.URI, dbName: 'launchers'})

export default db
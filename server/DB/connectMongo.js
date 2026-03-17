import { createMongo } from "./createMongo.js";
import 'dotenv/config'

const db = createMongo({uri: process.env.URI, dbName: 'army'})

export default db
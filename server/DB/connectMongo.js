import { createMongo } from "./createMongo.js";
import 'dotenv/config'

const db = createMongo({uri: process.env.URI, dbName: 'army'})
await db.collection('users').insertOne({username: 'idan', password: 'idan123', email:'jdkjj', user_type: 'admin', last_login: null})
export default db
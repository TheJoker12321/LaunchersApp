import { MongoClient } from 'mongodb'


let db;
let client;

export function createMongo({uri, dbName}) {

    if (db) return db;

    client = new MongoClient(uri)
    client.connect()
    db = client.db(dbName)
    console.log('connected to mongodb');
    return db
    
}
import path from 'path'
import sqlite3 from 'sqlite3'

const dbPath = path.resolve(process.cwd(), 'app/database/local.database.db')

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) throw err
    console.log('connect database sucess!')
})

export default db;
import {db} from "../database/database.connection.js"

export async function postUrlDB(session, url, shortUrlResponse) { 
    return await db.query(`INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3);`, [session, url, shortUrlResponse])
}

export async function showPostUrlDB(url) {
    return await db.query(`SELECT * FROM urls WHERE url=$1`, [url])
}
  
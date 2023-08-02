// import {db} from "../database/database.connection.js"

// export async function postUrlDB(session, url, shortUrlResponse) {
      
//     return await db.query(`INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3);`, [session, url, shortUrlResponse])
// }


// export async function showPostUrlDB(url) {
//     return await db.query(`SELECT * FROM urls WHERE url=$1`, [url])
// }


// export async function getUrlByIdDB(id) {
//     return await db.query(`SELECT urls.id, urls."shortUrl", urls.url FROM urls WHERE id=$1`, [id]);
//   }

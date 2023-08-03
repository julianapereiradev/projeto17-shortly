import {db} from "../database/database.connection.js"

export async function findUserByEmailDB(email) {
  return db.query(`SELECT * FROM users WHERE email=$1`, [email]);
}


export async function signupDB(name, email, encryptedPassword) {
    return await db.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`,
      [name, email, encryptedPassword]
    );
}

export async function signinDB(user, token) {
    return await db.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2)`, [user, token]);
}

export async function getUserMeDB(token) {
   return await db.query(`
      SELECT urls."userId", 
        users.name AS "name", 
        urls."id", 
        urls."shortUrl", 
        urls."url",
        SUM(urls."visitCount") as "totalVisitCount"
      FROM urls
      JOIN users ON users.id = urls."userId"
      JOIN sessions ON sessions."userId" = urls."userId"
      WHERE token=$1
      GROUP BY urls."userId", users.name, urls."id", urls."shortUrl", urls."url"
      ORDER BY urls."id" ASC;
    `, [token]);
}


export async function getRankingDB() {
    return db.query(`SELECT 
      users.id AS "id",
      users.name AS "name",
      COUNT(urls.id) AS "linksCount",
      COALESCE(SUM(urls."visitCount"), 0) AS "visitCount"
      FROM 
        users
      LEFT JOIN urls ON users.id = urls."userId"
      GROUP BY 
        users.id,
        users.name
      ORDER BY
      COALESCE(SUM(urls."visitCount"), 0) DESC
      LIMIT 10;
  `);
}
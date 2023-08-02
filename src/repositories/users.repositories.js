import {db} from "../database/database.connection.js"

export async function findUserByEmailDB(email) {
  return db.query(`SELECT * FROM users WHERE email=$1`, [email]);
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
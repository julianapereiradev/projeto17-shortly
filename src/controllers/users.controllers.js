import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { getRankingDB } from "../repositories/users.repositories.js";


//To render ROUTE /users/me
function mapGetUserMe(user_me) {
  return {
    id: user_me.id,
    shortUrl: user_me.shortUrl,
    url: user_me.url,
    visitCount: user_me.visitCount,
  };
}

//To render ROUTE /ranking
function mapRanking(ranking) {
  return {
    id: ranking.id,
    name: ranking.name,
    linksCount: ranking.linksCount,
    visitCount: ranking.visitCount,
  };
}

//Functions:

export async function signup(req, res) {
  const { name, email, password } = req.body;

  try {
    const newEmailExistsInSignUpEmails = await db.query(
      `SELECT * FROM users WHERE email=$1`,
      [email]
    );

    if (newEmailExistsInSignUpEmails.rowCount > 0) {
      return res
        .status(409)
        .send({ messsage: "Este email já existe no banco" });
    }

    const encryptedPassword = bcrypt.hashSync(password, 10);

    await db.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`,
      [name, email, encryptedPassword]
    );

    res.status(201).send({ message: "Usuário Cadastrado" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function signin(req, res) {
  const { email, password } = req.body;

  try {
       const userExist = await db.query(`SELECT * FROM users WHERE email=$1`, [
      email,
    ]);

    if (userExist.rowCount === 0) {
      return res
        .status(401)
        .send({ message: "Este email não existe, crie uma conta" });
    }

    const hashedPassword = userExist.rows[0].password;

    if (bcrypt.compareSync(password, hashedPassword)) {
      const token = uuid();

      await db.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2)`, [
        userExist.rows[0].id,
        token,
      ]);

      res.status(200).send({ token: token });
    } else {
      res.status(401).send({ message: "Senha incorreta!" });
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function getUserMe(req, res) {

  const token = res.locals.rows[0].token;

  try {

    const result = await db.query(`
    SELECT urls."userId", 
      users.name AS "name", 
      urls."id", 
      urls."shortUrl", 
      urls."url",
      urls."visitCount"
    FROM urls
    JOIN users ON users.id = urls."userId"
    JOIN sessions ON sessions."userId" = urls."userId"
    WHERE token=$1
    GROUP BY urls."userId", 
      users.name, 
      urls."id", 
      urls."shortUrl", 
      urls."url"
    ORDER BY urls."id" ASC;`,
      [token]
    );

    const total = await db.query(
      `
    SELECT SUM(urls."visitCount") as "totalVisitCount" 
    FROM urls
    JOIN sessions ON sessions."userId" = urls."userId"
    WHERE token=$1;`,
      [token]
    );
    const totalVisitCount = parseInt(total.rows[0].totalVisitCount, 10);

    res.status(200).send({
      id: result.rows[0].userId,
      name: result.rows[0].name,
      visitCount: totalVisitCount,
      shortenedUrls: result.rows.map(mapGetUserMe),
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function getRanking(req, res) {
  const rankings = await getRankingDB()

  const formattedRanking = rankings.rows.map(mapRanking);
  res.status(200).send(formattedRanking);
}

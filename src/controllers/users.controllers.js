import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

function mapRentalData(user_me) {
  return {
    id: user_me.id,
    shortUrl: user_me.shortUrl,
    url: user_me.url,
    visitCount: user_me.visitCount,
  };
}

function formatResults(results) {
  return results.map((row) => ({
    id: row.id,
    name: row.name,
    linksCount: row.linksCount,
    visitCount: row.visitCount,
  }));
}

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
  const { authorization } = req.headers;

  const token = authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).send("Para acessar precisa de um token");

  try {
    const session = await db.query(`SELECT * FROM sessions WHERE token=$1`, [
      token,
    ]);
    if (session.rowCount === 0) {
      return res.status(401).send("Não foi encontrado o token no banco");
    }

    const result = await db.query(
      `
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
      shortenedUrls: result.rows.map(mapRentalData),
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function getRanking(req, res) {
  const ranking = await db.query(`SELECT 
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

  const formattedResults = formatResults(ranking.rows);
  res.status(200).send(formattedResults);
}

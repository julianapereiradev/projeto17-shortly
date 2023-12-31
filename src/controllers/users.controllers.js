import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { findUserByEmailDB, getRankingDB, getUserMeDB, signinDB, signupDB } from "../repositories/users.repositories.js";


//To render ROUTE /users/me
function mapGetUserMe(user_me) {
  return {
    id: user_me.id,
    shortUrl: user_me.shortUrl,
    url: user_me.url,
    visitCount: parseInt(user_me.totalVisitCount, 10) || 0,
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
  const { name, email, password, confirmPassword } = req.body;

  try {

    if(password !== confirmPassword) {
      return res.status(422).send("As senhas estão diferentes!")
    }

    const existingUser = await findUserByEmailDB(email);
    if (existingUser.rowCount > 0) {
      return res.status(409).send({ message: "Este email já existe no banco" });
    }

    const encryptedPassword = bcrypt.hashSync(password, 10);

    signupDB(name, email, encryptedPassword)

    res.status(201).send({ message: "Usuário Cadastrado" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function signin(req, res) {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmailDB(email);
    if (user.rowCount === 0) {
      return res.status(401).send({ message: "Este email não existe, crie uma conta" });
    }

    const hashedPassword = user.rows[0].password;

    if (bcrypt.compareSync(password, hashedPassword)) {
      const token = uuid();

      await signinDB(user.rows[0].id, token)

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
    const result = await getUserMeDB(token);

    if (result.rows.length === 0) {
      // Usuário não tem nenhuma URL registrada
      return res.status(200).send({
        id: null,
        name: null,
        visitCount: 0,
        shortenedUrls: [],
      });
    }

    let totalSum = 0;
    for (let i = 0; i < result.rows.length; i++) {
      const totalVisits = parseInt(result.rows[i].totalVisitCount, 10) || 0;
      totalSum += totalVisits;
    }

    res.status(200).send({
      id: result.rows[0].userId,
      name: result.rows[0].name,
      visitCount: totalSum,
      shortenedUrls: result.rows.map(mapGetUserMe),
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
}


export async function getRanking(req, res) {

  try {
    const rankings = await getRankingDB()

    const formattedRanking = rankings.rows.map(mapRanking);
    res.status(200).send(formattedRanking);

  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function logout(req, res) {
  const token = res.locals.rows[0].token;

  try {
    await db.query(`DELETE FROM sessions WHERE token =$1`, [token]);
    res.status(204).send("Token removido!")

  } catch (err) {
    res.status(500).send(err.message)
  }
}
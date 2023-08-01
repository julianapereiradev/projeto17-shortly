import {db} from "../database/database.connection.js"
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signup(req, res) {
  const { name, email, password } = req.body;
  
  try {
    const newEmailExistsInSignUpEmails = await db.query(`SELECT * FROM users WHERE email=$1`, [email])

    if (newEmailExistsInSignUpEmails.rowCount > 0) {
      return res.status(409).send("Este email já existe no banco");
    }
    
    const encryptedPassword = bcrypt.hashSync(password, 10);

    await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [name, email, encryptedPassword])

    res.status(201).send("Usuário Cadastrado")

  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function signin(req, res) {
  //
}

export async function getUserMe(req, res) {
  //
}

export async function getRanking(req, res) {
  const teste = await db.query(`SELECT * FROM users`)
  res.send(teste.rows)
}

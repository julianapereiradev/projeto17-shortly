import {db} from "../database/database.connection.js"

export async function signup(req, res) {
  res.send("SignUp funcionando")
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

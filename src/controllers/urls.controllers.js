import { nanoid } from "nanoid";
import {db} from "../database/database.connection.js"

export async function postUrl(req, res) {
  const { authorization } = req.headers;

  const { url } = req.body; 
  
  const token = authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).send("Para acessar precisa de um token");

  try {

    const session = await db.query(`SELECT * FROM sessions WHERE token=$1`, [token])
    if (session.rowCount === 0) {
      return res.status(401).send("Não foi encontrado o token no banco");
    }
    
    const shortUrlResponse = nanoid()
    
    await db.query(`INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3);`, [session.rows[0].userId, url, shortUrlResponse])
    
    const shortUrlExist = await db.query(`SELECT * FROM urls WHERE url=$1`, [url])

     res.status(201).send({
      id: shortUrlExist.rows[0].id,
      shortUrl: shortUrlExist.rows[0].shortUrl
    })
    
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function getUrlById(req, res) {
  const { id } = req.params;

  try {
    const urlIdQuery = await db.query(`SELECT urls.id, urls."shortUrl", urls.url FROM urls WHERE id=$1`, [id]);

    if (urlIdQuery.rows.length === 0) {
      return res.status(404).send("Este id não existe no banco de urls");
    }

    const formattedUrlId = urlIdQuery.rows[0];
    res.send(formattedUrlId);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function redirectUrl(req, res) {
  const { shortUrl } = req.params;

  const shortUrlQuery = await db.query(`SELECT urls.id, urls."shortUrl", urls.url, urls."visitCount" FROM urls WHERE "shortUrl"=$1`, [shortUrl]);

  if (shortUrlQuery.rows.length === 0) {
    return res.status(404).send("Esta url encurtada não existe no banco de urls");
  }

  const currentVisitCount = shortUrlQuery.rows[0].visitCount;
  const newVisitCount = currentVisitCount + 1;

  await db.query(`UPDATE urls SET "visitCount"=$1 WHERE "shortUrl"=$2`, [newVisitCount, shortUrl]);

  res.redirect(shortUrlQuery.rows[0].url);
}


export async function deleteUrlById(req, res) {
    //
  }
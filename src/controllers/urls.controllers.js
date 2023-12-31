import { nanoid } from "nanoid";
import {db} from "../database/database.connection.js"
import { selectUrlByIdDB, getUrlByIdDB, postUrlDB, showPostUrlDB, deleteUrlByIdDB } from "../repositories/urls.repositories.js";

export async function postUrl(req, res) {

  const { url } = req.body; 
  const session = res.locals;

  try {

    if(url === "") {
      return res.status(401).send("Envie alguma url para ser encurtada!")
    }

    const shortUrlResponse = nanoid()

    await postUrlDB(session.rows[0].userId, url, shortUrlResponse)

    const shortUrlExist = await showPostUrlDB(url)

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

    const urlIdQuery = await getUrlByIdDB(id)

    if (urlIdQuery.rows.length === 0) {
      return res.status(404).send("Esta url encurtada não existe no banco de urls");
    }

    const formattedUrlId = urlIdQuery.rows[0];
    res.send(formattedUrlId);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function redirectUrl(req, res) {
  const { shortUrl } = req.params;

  try {
    const shortUrlQuery = await db.query(`SELECT urls.id, urls."shortUrl", urls.url, urls."visitCount" FROM urls WHERE "shortUrl"=$1`, [shortUrl]);

    if (shortUrlQuery.rows.length === 0) {
      return res.status(404).send("Esta url encurtada não existe no banco de urls");
    }
  
    const currentVisitCount = shortUrlQuery.rows[0].visitCount;
    const newVisitCount = currentVisitCount + 1;
  
    await db.query(`UPDATE urls SET "visitCount"=$1 WHERE "shortUrl"=$2`, [newVisitCount, shortUrl]);
  
    res.redirect(shortUrlQuery.rows[0].url);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}


export async function deleteUrlById(req, res) {

  const { id } = req.params; 
  const session = res.locals;

  try {
    const idUrlQuery = await selectUrlByIdDB(id)
    if (idUrlQuery.rows.length === 0) {
      return res.status(404).send("Este url Encurtada (id) não existe no banco de urls");
    }
    
    const userIdFromToken = session.rows[0].userId;
    const userIdFromUrl = idUrlQuery.rows[0].userId;
    
    if (userIdFromToken !== userIdFromUrl) {
      return res.status(401).send("Você não tem permissão para excluir esta URL.");
    }
    
    await deleteUrlByIdDB(id)
    res.sendStatus(204);

  } catch (err) {
    return res.status(500).send(err.message);
  }
}

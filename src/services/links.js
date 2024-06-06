import { v4 as uuidv4 } from 'uuid';

export const getLinksByUser = async (connection, userId) => {
  const [rows] = await connection.query(
    `SELECT * FROM links WHERE usuario_id = ?`, [userId]
  )
  return rows;
}

export const createLinkForUser = async (connection, link, host, userId) => {
  const hash = uuidv4();
  const shortUrl = `${host}/${hash.substring(0, 7)}`;
  await connection.query(
    `INSERT INTO links (url_original, url_acortada, usuario_id) VALUES (?, ?, ?)`, [link, shortUrl, userId ]
  )
  return shortUrl;
}


export const redirectLink = async (connection, url) => {
  const [rows] = await connection.query(
    `SELECT url_original FROM links WHERE url_acortada = ?`, [url]
  )
  return rows[0];
}

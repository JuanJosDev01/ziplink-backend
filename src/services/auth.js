export const getUserByEmail = async (dbConnection, email) => {
  const [rows] = await dbConnection.query(
    'SELECT * FROM usuarios WHERE email = ?', [email]
  )
  return rows
}
export const createUser = async (dbConnection, { email, nombre, apellido }) => {
  const [rows] = await dbConnection.query(
    'INSERT INTO usuarios (nombre, apellido, email) VALUES (?, ?, ?)', [nombre, apellido, email]
  )
  return { id: rows.insertId, nombre, apellido, email }
}

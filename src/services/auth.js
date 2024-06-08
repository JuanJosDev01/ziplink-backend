export const getUserByEmail = async (dbConnection, email, password) => {
  try {
    const [rows] = await dbConnection.query(
      'SELECT * FROM usuarios WHERE email = ? and password = SHA2(?, 256);', [email, password]
    )
    if (rows.length === 0) return []
    return [{
      id: rows[0].id,
      nombre: rows[0].nombre,
      apellido: rows[0].apellido,
      email: rows[0].email
    }]
  } catch (error) {
    console.log(error)
  }
}

export const verifyUser = async (dbConnection, email) => {
  const [rows] = await dbConnection.query(
    'SELECT * FROM usuarios WHERE email = ?;', [email]
  )
  if (rows.length === 0) return []
  return [{
    id: rows[0].id,
    nombre: rows[0].nombre,
    apellido: rows[0].apellido,
    email: rows[0].email
  }]
}


export const createUser = async (dbConnection, { email, nombre, apellido, password }) => {
  const [rows] = await dbConnection.query(
    'INSERT INTO usuarios (nombre, apellido, email, password) VALUES (?, ?, ?, SHA2(?, 256))', [nombre, apellido, email, password]
  )
  return { id: rows.insertId, nombre, apellido, email }
}

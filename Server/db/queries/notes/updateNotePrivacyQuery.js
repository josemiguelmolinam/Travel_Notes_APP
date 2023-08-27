const getDB = require('../../getDB');

const updateNotePrivacyQuery = async (noteId, isPublic) => {
  let connection;

  try {
    connection = await getDB();

    // Ejecutar una consulta para actualizar el campo "isPublic" de una nota en la base de datos
    await connection.query('UPDATE notes SET isPublic = ? WHERE id = ?', [
      isPublic,
      noteId,
    ]);

    //Si se realizó la actualización correctamente, no es necesario retornar nada.
  } finally {
    if (connection) connection.release();
  }
};

module.exports = updateNotePrivacyQuery;

const getDB = require('../../getDB');

const getAllCategoriesQuery = async (keyword = '', userId = 0) => {
  let connection;

  try {
    connection = await getDB();
    // Ejecutar una consulta para obtener todas las categorías
    const [categories] = await connection.query('SELECT * FROM categories');
    [userId, `%${keyword}%`];
    return categories;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getAllCategoriesQuery;

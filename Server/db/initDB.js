require('dotenv').config();

const getDB = require('./getDB');

const main = async () => {
  let connection;

  try {
    connection = await getDB();

    console.log('Borrando tablas...');

    await connection.query('DROP DATABASE IF EXISTS notes');
    console.log('creando base datos');
    await connection.query('CREATE DATABASE notes');
    await connection.query('USE notes');
    console.log('Creando tablas...');

    // Tablas de usuarios
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        createdAt DATETIME NOT NULL               
        )
    `);
    // Tablas de notas.
    await connection.query(`
      CREATE TABLE IF NOT EXISTS notes (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(100) NOT NULL,
        text TEXT NOT NULL,
        categoryId INT UNSIGNED NOT NULL,
        isPublic BOOLEAN DEFAULT false,
        userId INT UNSIGNED,
        image VARCHAR(100),
        createdAt DATETIME NOT NULL,
        modifiedAt DATETIME ,
        FOREIGN KEY (userId) REFERENCES users(id)
        )  
    `);

    // Tablas de categorías.
    await connection.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(50) NOT NULL,
        createdAt DATETIME NOT NULL
      )
    `);

    console.log('Tablas creadas con exito');

    // Agregar categorias predeterminadas.
    await connection.query(
      `INSERT INTO categories (name, createdAt) VALUES ('Cultura y Patrimonio', ?)`,
      [new Date()]
    );

    await connection.query(
      `INSERT INTO categories (name, createdAt) VALUES ('Naturaleza y Paisajes', ?)`,
      [new Date()]

      
    );

    await connection.query(
      `INSERT INTO categories (name, createdAt) VALUES ('Aventuras y Exploración', ?)`,
      [new Date()]

      
    );

    await connection.query(
      `INSERT INTO categories (name, createdAt) VALUES ('Gastronomia y Experiencias Culinarias', ?)`,
      [new Date()]

      
    );

    await connection.query(
      `INSERT INTO categories (name, createdAt) VALUES ('Negocios y Viajes de Trabajo', ?)`,
      [new Date()]

      
    );

    await connection.query(
      `INSERT INTO categories (name, createdAt) VALUES ('Historia y Tradiciones', ?)`,
      [new Date()]

      
    );

    await connection.query(
      `INSERT INTO categories (name, createdAt) VALUES ('Consejos y Recomendaciones de Viaje', ?)`,
      [new Date()]

      
    );

    await connection.query(
      `INSERT INTO categories (name, createdAt) VALUES ('Alojamiento y Hospedaje', ?)`,
      [new Date()]

      
    );
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
};

main();

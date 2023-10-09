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
        const categories = [
            { name: 'Cultura y Patrimonio', createdAt: new Date() },
            { name: 'Naturaleza y Paisajes', createdAt: new Date() },
            { name: 'Aventuras y exploración', createdAt: new Date() },
            {
                name: 'Gastronomía y Experiencias Culinarias',
                createdAt: new Date(),
            },
            { name: 'Negocios y Viajes de Trabajo', createdAt: new Date() },
            { name: 'Historia y Tradiciones', createdAt: new Date() },
            {
                name: 'Consejos y Recomendaciones de Viaje',
                createdAt: new Date(),
            },
            { name: 'Alojamiento y Hospedaje', createdAt: new Date() },
        ];

        for (const category of categories) {
            const result = await connection.query(
                `INSERT INTO categories (name, createdAt) VALUES (?, ?)`,
                [category.name, category.createdAt]
            );

            console.log(
                `Category inserted with ID: ${result.insertId}, Name: ${category.name}`
            );
        }
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) connection.release();
        process.exit();
    }
};

main();

const path = require('path');
const fs = require('fs/promises');
const sharp = require('sharp');
const { v4: uuid } = require('uuid');

/**
 * ####################
 * ## Generate Error ##
 * ####################
 */

// Función para generar un error con un mensaje y código HTTP personalizados.
const generateError = (msg, code) => {
    const err = new Error(msg);
    err.httpStatus = code;
    throw err;
};

/**
 * ################
 * ## Save Photo ##
 * ################
 */

// Función para guardar una foto en el servidor y redimensionarla.
const savePhoto = async (img, width) => {
    try {
        // Ruta absoluta al directorio de subida de archivos.
        const uploadsPath = path.join(__dirname, process.env.UPLOADS_DIR);

        try {
            await fs.access(uploadsPath);
        } catch {
            // Si el método access lanza un error significa que la directorio no existe.
            // Lo creamos.
            await fs.mkdir(uploadsPath);
        }

        // Generamos un nombre único para la imagen.
        const imgName = `${uuid()}.jpg`;

        // Ruta absoluta a la imagen.
        const imgPath = path.join(uploadsPath, imgName);

        const sharpImg = sharp(img.data);

        await sharpImg.resize(width);

        await sharpImg.toFile(imgPath);

        // Retornamos el nombre de la imagen.
        return imgName;
    } catch (err) {
        console.error(err);
        generateError('Error al guardar la imagen en el servidor', 500);
    }
};

module.exports = {
    generateError,
    savePhoto,
};

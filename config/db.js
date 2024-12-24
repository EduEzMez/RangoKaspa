const mongoose = require('mongoose');

const conectarDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://ezmezgo:pili4ever@basedatoseeg.jx9h9.mongodb.net/?retryWrites=true&w=majority&appName=BaseDatosEEG', {});
        console.log('✅ Conexión a MongoDB exitosa.');
    } catch (error) {
        console.error('❌ Error al conectar a MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = conectarDB;

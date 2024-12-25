const express = require('express');
const mongoose = require('mongoose');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const Rango = require('./models/Rango');  
const { consultarPrecio } = require('./config/monKas');


// Ejecutar la función de consultarPrecio para que se active el ciclo de verificación
// Importar el modelo Rango

const app = express();

// Configuración de Handlebars como motor de plantillas
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');


// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


// Conectar a MongoDB
const conectarDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://ezmezgo:pili4ever@basedatoseeg.jx9h9.mongodb.net/?retryWrites=true&w=majority&appName=BaseDatosEEG', {});
        console.log('✅ Conexión a MongoDB exitosa.');
    } catch (error) {
        console.error('❌ Error al conectar a MongoDB:', error.message);
        process.exit(1);
    }
};

conectarDB();

// Ruta para mostrar el formulario
app.get('/', async (req, res) => {
    try {
        const rango = await Rango.findOne();  // Obtener los valores de mínimo y máximo
        if (!rango) {
            return res.status(404).json({ error: 'No se encontraron valores de rango.' });
        }
        // Renderizar la vista 'home' con los valores actuales de rango
        res.render('home', {
            minimo: rango.minimo,
            maximo: rango.maximo
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para actualizar el rango
app.post('/rango/actualizar', async (req, res) => {
    const { minimo, maximo, email } = req.body;

    if (minimo >= maximo) {
        return res.status(400).json({ error: 'El valor mínimo debe ser menor al máximo.' });
    }

    try {
        let rango = await Rango.findOne();
        if (!rango) {
            rango = new Rango({ minimo, maximo, email });
        } else {
            rango.minimo = minimo;
            rango.maximo = maximo;
        }
        await rango.save();
        // Redirigir de nuevo al home para ver los valores actualizados
        res.redirect('/');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});





app.post('/configuracion/actualizar', async (req, res) => {
    const { minimo, maximo, email } = req.body;

    if (minimo >= maximo) {
        return res.status(400).json({ error: 'El valor mínimo debe ser menor al máximo.' });
    }

    try {
        let rango = await Rango.findOne();
        if (!rango) {
            // Si no hay un rango existente, crea uno nuevo con los valores enviados
            rango = new Rango({ minimo, maximo, email });
        } else {
            // Si ya existe un rango, actualiza los valores
            rango.minimo = minimo;
            rango.maximo = maximo;
            rango.email = email; // Asegúrate de actualizar también el email
        }
        await rango.save();
        // Redirige al home para mostrar los valores actualizados
        res.redirect('/');
    } catch (error) {
        console.error('Error al actualizar rango:', error.message);
        res.status(500).json({ error: 'Error al actualizar la configuración.' });
    }
});


// Iniciar el servidor
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

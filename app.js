const express = require('express');
const mongoose = require('mongoose');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const Rango = require('./models/Rango');  
const { consultarPrecio } = require('./config/monKas');






//Instalar un generador de HTML a partir de Handlebars
const fs = require('fs');
const handlebars = require('handlebars');

// Lee el archivo main.handlebars
fs.readFile('views/layouts/main.handlebars', 'utf-8', (err, data) => {
    if (err) {
      console.log('Error al leer el archivo:', err);
      return;
    }
  
    // Compila la plantilla Handlebars
    const template = handlebars.compile(data);
    const result = template({ name: 'Ezequiel' });  // Aquí puedes pasar los datos dinámicos que necesites
  
    // Guarda el archivo HTML generado
    fs.writeFile('public/index.html', result, 'utf-8', (err) => {
      if (err) {
        console.log('Error al guardar el archivo HTML:', err);
      } else {
        console.log('Archivo HTML generado exitosamente.');
      }
    });
  });

// Ejecutar la función de consultarPrecio para que se active el ciclo de verificación
// Importar el modelo Rango

const app = express();

// Configuración de Handlebars como motor de plantillas
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
    const { minimo, maximo } = req.body;

    if (minimo >= maximo) {
        return res.status(400).json({ error: 'El valor mínimo debe ser menor al máximo.' });
    }

    try {
        let rango = await Rango.findOne();
        if (!rango) {
            rango = new Rango({ minimo, maximo });
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

// Iniciar el servidor
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

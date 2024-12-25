// const axios = require('axios');
// const nodemailer = require('nodemailer');

// // Configuración del rango
// const rangoMinimo = 0.1200; // Cambiar según tu necesidad
// const rangoMaximo = 0.1210; // Cambiar según tu necesidad

// // Intervalo de consulta en milisegundos
// const intervaloConsulta = 30000; // 4 segundos

// // Configuración del transporte para enviar correos
// const transporter = nodemailer.createTransport({
//     service: 'gmail', // Podés usar Gmail, Outlook, etc.
//     auth: {
//         user: 'ezmezgo@gmail.com', // Reemplazar con tu email
//         pass: 'zrrk rvff mjrj bckt' // Reemplazar con tu contraseña o contraseña de aplicación
//     }
// });

// // Función para enviar un correo
// const enviarCorreo = async (precio) => {
//     const mailOptions = {
//         from: 'ezmezgo@gmail.com', // Tu email
//         to: 'ezmezcoin@gmail.com', // Email del destinatario
//         subject: `📈 Notificación KASPA ${precio} en rango`,
//         text: `El precio actual de Kaspa es ${precio}, y está dentro del rango especificado (${rangoMinimo} - ${rangoMaximo}).`
//     };

//     try {
//         await transporter.sendMail(mailOptions);
//         console.log('Correo enviado con éxito.');
//     } catch (error) {
//         console.error('Error al enviar el correo:', error.message);
//     }
// };

// // Función para consultar la API
// const consultarPrecio = async () => {
//     try {
//         const respuesta = await axios.get('https://api.kaspa.org/info/price?stringOnly=true');
//         const precio = parseFloat(respuesta.data);

//         console.log(`Precio actual: ${precio}`);

//                 //rango para que envie mail mientras este dentro del rango
//         //if (precio >= rangoMinimo && precio <= rangoMaximo) {

//                 //rango para que envie mail mientras este fuera del rango
//         if (precio < rangoMinimo || precio > rangoMaximo) {
//             console.log('✅ El precio está dentro del rango!');
//             await enviarCorreo(precio); // Llamamos a la función para enviar el correo
//         } else {
//             console.log('❌ El precio está fuera del rango.');
//         }
//     } catch (error) {
//         console.error('Error al consultar la API:', error.message);
//     }
// };

// // Configurar el intervalo para consultas periódicas
// setInterval(consultarPrecio, intervaloConsulta);




                                            // ESTO ES SIN MONGOOSE

// const axios = require('axios');
// const nodemailer = require('nodemailer');

// // Configuración del rango
// const rangoMinimo = 0.1200; // Cambiar según tu necesidad
// const rangoMaximo = 0.1210; // Cambiar según tu necesidad

// // Configuración del transporte para enviar correos
// const transporter = nodemailer.createTransport({
//     service: 'gmail', // Podés usar Gmail, Outlook, etc.
//     auth: {
//         user: 'ezmezgo@gmail.com', // Reemplazar con tu email
//         pass: 'zrrk rvff mjrj bckt' // Reemplazar con tu contraseña o contraseña de aplicación
//     }
// });

// // Bandera para evitar correos repetidos
// let correoEnviado = false;

// // Función para enviar un correo
// const enviarCorreo = async (precio) => {
//     const mailOptions = {
//         from: 'ezmezgo@gmail.com', // Tu email
//         to: 'ezmezcoin@gmail.com', // Email del destinatario
//         subject: `⚠️ Precio Kaspa fuera del rango: ${precio}`,
//         text: `El precio actual de Kaspa es ${precio}, y está fuera del rango permitido (${rangoMinimo} - ${rangoMaximo}).`
//     };

//     try {
//         await transporter.sendMail(mailOptions);
//         console.log('Correo enviado con éxito.');
//     } catch (error) {
//         console.error('Error al enviar el correo:', error.message);
//     }
// };

// // Función para consultar la API
// const consultarPrecio = async () => {
//     try {
//         const respuesta = await axios.get('https://api.kaspa.org/info/price?stringOnly=true');
//         const precio = parseFloat(respuesta.data);

//         console.log(`Precio actual: ${precio}`);
        
//         // Verificamos si el precio está fuera del rango
//         if (precio < rangoMinimo || precio > rangoMaximo) {
//             console.log('❌ El precio está fuera del rango.');
//             if (!correoEnviado) {
//                 await enviarCorreo(precio); // Enviar correo si aún no se envió
//                 correoEnviado = true; // Marcar que ya se envió el correo
//             }
//         } else {
//             console.log('✅ El precio está dentro del rango.');
//             correoEnviado = false; // Resetear la bandera si el precio vuelve al rango
//         }
//     } catch (error) {
//         console.error('Error al consultar la API:', error.message);
//     }
// };

// // Configurar el intervalo para consultas periódicas
// setInterval(consultarPrecio, 4000); // Consulta cada 4 segundos



// const axios = require('axios');
// const nodemailer = require('nodemailer');
// const conectarDB = require('./db');
// const Rango = require('../models/Rango');

// // Configurar conexión a MongoDB
// conectarDB();

// // Función para consultar el rango desde MongoDB
// const obtenerRango = async () => {
//     const rango = await Rango.findOne();
//     if (!rango) {
//         throw new Error('No se encontró un rango en la base de datos.');
//     }
//     return rango;
// };

// // Función para enviar un correo
// const enviarCorreo = async (precio) => {
//     const mailOptions = {
//         from: 'ezmezgo@gmail.com',
//         to: 'ezmezcoin@gmail.com',
//         subject: `⚠️ Precio Kaspa fuera del rango: ${precio}`,
//         text: `El precio actual de Kaspa es ${precio}, y está fuera del rango permitido.`
//     };

//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'ezmezgo@gmail.com',
//             pass: 'zrrk rvff mjrj bckt'
//         }
//     });

//     try {
//         await transporter.sendMail(mailOptions);
//         console.log('Correo enviado con éxito.');
//     } catch (error) {
//         console.error('Error al enviar el correo:', error.message);
//     }
// };

// // Función para consultar la API y verificar el rango
// const consultarPrecio = async () => {
//     try {
//         const rango = await obtenerRango(); // Leer rango desde MongoDB
//         const { minimo, maximo } = rango;
//         const respuesta = await axios.get('https://api.kaspa.org/info/price?stringOnly=true');
//         const precio = parseFloat(respuesta.data);
//         console.log(`Precio actual recibido: ${precio}`);
//         if (precio < minimo || precio > maximo) {
//             console.log('❌ El precio está fuera del rango.');
//             await enviarCorreo(precio);
//         } else {
//             console.log('✅ El precio está dentro del rango.');
//         }
//     } catch (error) {
//         console.error('Error:', error.message);
//     }
// };


// // Configurar el intervalo para consultas periódicas
// setInterval(consultarPrecio, 30000); // Consulta cada 4 segundos


//NUEVO CODIGO PARA AGREGAR EL MAIL

const axios = require('axios');
const nodemailer = require('nodemailer');
const conectarDB = require('./db');
const Rango = require('../models/Rango');

// Configurar conexión a MongoDB
conectarDB();

// Configuración del transporte para enviar correos
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'polkonaut@gmail.com', // Reemplazar con tu email
        pass: 'wkqt ziwm gkyo zusc' // Contraseña de aplicación
    }
});

// Función para obtener la configuración de MongoDB
const obtenerConfiguracion = async () => {
    const configuracion = await Rango.findOne();
    if (!configuracion) {
        throw new Error('No se encontró configuración en la base de datos.');
    }
    return configuracion;
};

// Función para enviar un correo
const enviarCorreo = async (precio, correo) => {
    const mailOptions = {
        from: 'ezmezgo@gmail.com',
        to: correo, // Correo configurado en MongoDB
        subject: `⚠️ ${precio} Precio Kaspa fuera del rango`,
        text: `El precio actual de Kaspa es ${precio}, y está fuera del rango permitido.`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Correo enviado con éxito.');
    } catch (error) {
        console.error('Error al enviar el correo:', error.message);
    }
};

// Función para consultar la API y verificar el rango
const consultarPrecio = async () => {
    try {
        const configuracion = await obtenerConfiguracion(); // Leer configuración desde MongoDB
        const { minimo, maximo, email } = configuracion;

        const respuesta = await axios.get('https://api.kaspa.org/info/price?stringOnly=true');
        const precio = parseFloat(respuesta.data);

        console.log(`Precio actual recibido: ${precio}`); // Verifica el precio que se obtiene de la API

        if (precio < minimo || precio > maximo) {
            console.log('❌ El precio está fuera del rango.');
            await enviarCorreo(precio, email); // Enviar correo al email configurado
        } else {
            console.log('✅ El precio está dentro del rango.');
        }

        return precio; // Devuelve el precio para usarlo en otras partes
    } catch (error) {
        console.error('Error:', error.message);
        return 'Error al obtener precio';
    }
};

module.exports = { consultarPrecio };


// Configurar el intervalo para consultas periódicas
setInterval(consultarPrecio, 30000); // Consulta cada 4 segundos

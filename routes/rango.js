const express = require('express');
const Rango = require('../models/Rango');

const router = express.Router();

// Endpoint para obtener el rango actual
router.get('/', async (req, res) => {
    try {
        const rango = await Rango.findOne();
        if (!rango) {
            return res.status(404).json({ error: 'No se encontró ningún rango.' });
        }
        res.json(rango);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para actualizar el rango
router.post('/actualizar', async (req, res) => {
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

        res.json({ message: 'Rango actualizado con éxito.', rango });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

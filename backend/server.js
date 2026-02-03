// Importar Express y CORS
const express = require('express');
const cors = require('cors');

// Crear una instancia de la aplicacion Express
const app = express();
const PORT = process.env.PORT || 5000; // Es el puerto en el que escuchara el servidor

// Middleware
app.use(express.json()); //Habilita el body-parse para el JSON
app.use(cors()); // Habilita CORS para todas las solicitudes

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor Funcionando');
});

// Ruta para la traduccion (por el momento es un placeholder)
app.post('/translate', (req, res) => {
    const {text, fromLang, toLang} = res.body; // Aqui se espera a recibir text, fronLang y toLang en el cuerpo de la solicitud
    console.log(`Solicitud de traducción: "${text}" de ${fromLang} a ${toLang}`);

    // Aqui va a ir la logica de traduccion real pero mas adelante
    // Simulacion de una traduccion simple
    if(text && fromLang === 'es' && toLang === 'en'){
        // Traduccion muy basica para probrar
        const translatedText = `(traducido de: "${text}) - Esto es una traduccion simulada a ingles`;
        res.json({ originalText: text, translatedText: translatedText, fromLang, toLang});
    } else{
        res.status(400).json({ error: 'Falta parametros o idioma no soportado'});
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor esucchando en el puerto ${PORT}`);
    console.log(`Accede a http://localhost:${PORT}`);
});
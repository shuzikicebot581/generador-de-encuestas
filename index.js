const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conectar a MongoDB
mongoose.connect('mongodb://localhost/generador-encuestas', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB...'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

// Modelo de Encuesta
const EncuestaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  preguntas: [{ texto: String, opciones: [String] }]
});

const Encuesta = mongoose.model('Encuesta', EncuestaSchema);

// Rutas básicas
app.get('/', (req, res) => {
  res.send('Bienvenido al Generador de Encuestas');
});

app.post('/encuestas', (req, res) => {
  const nuevaEncuesta = new Encuesta(req.body);
  nuevaEncuesta.save()
    .then(encuesta => res.status(201).json(encuesta))
    .catch(err => res.status(400).json({ error: err.message }));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
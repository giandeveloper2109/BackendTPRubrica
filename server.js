const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar Swagger
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Node.js MongoDB Auth API',
    version: '1.0.0',
    description: 'API para iniciar sesión y registrarse',
  },
  servers: [
    {
      url: `http://localhost:${PORT}`,
      description: 'Servidor local',
    }, 
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js', './models/*.js'], // Rutas que contienen las definiciones Swagger
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Configurar MongoDB
mongoose.connect('mongodb://localhost:27017/nodejs-mongodb-auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Conectado a MongoDB');
});

// Middleware para manejar datos JSON
app.use(bodyParser.json());

// Rutas


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// Importar rutas de autenticación
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Importar rutas de rubricas
const rubricaRoutes = require('./routes/rubricaRoutes');
app.use('/api/rubrica', rubricaRoutes);

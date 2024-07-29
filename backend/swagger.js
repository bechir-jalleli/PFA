const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json'; 
const endpointsFiles = [
  './routes/adminRoutes.js',
  './routes/responsableRoutes.js',
  './routes/chefProjectRoutes.js',
  './routes/membreEquipeRoutes.js',
  './routes/organisationRoutes.js',
  './routes/sousOrganisationRoutes.js',
  './routes/projectRoutes.js',
  './routes/tacheRoutes.js'
];

swaggerAutogen(outputFile, endpointsFiles).then(() => {
  require('./app.js'); 
});

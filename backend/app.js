const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const corsOptions = require('./config/corsOption');
const connectDB = require('./config/dbConnect');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const bodyParser = require('body-parser')


dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const adminRoutes = require('./routes/adminRoutes');
const responsableRoutes = require('./routes/responsableRoutes');
const chefProjectRoutes = require('./routes/chefProjectRoutes');
const membreEquipeRoutes = require('./routes/membreEquipeRoutes');
const organisationRoutes = require('./routes/organisationRoutes');
const sousOrganisationRoutes = require('./routes/sousOrganisationRoutes');
const projectRoutes = require('./routes/projectRoutes');
const tacheRoutes = require('./routes/tacheRoutes');

app.use('/admin', adminRoutes);
app.use('/responsables', responsableRoutes);
app.use('/chef-projects', chefProjectRoutes);
app.use('/membre-equipes', membreEquipeRoutes);
app.use('/organisations', organisationRoutes);
app.use('/sous-organisations', sousOrganisationRoutes);
app.use('/projects', projectRoutes);
app.use('/taches', tacheRoutes);
const swaggerDocument = require('./swagger.json')
//const swaggerDocument = JSON.load(path.join(__dirname, 'swagger.json'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({ message: err.message || 'Something broke!' });
});

mongoose.connect(process.env.DATABASE_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

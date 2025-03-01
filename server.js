const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.routes');


dotenv.config();
const app = express();

app.use(express.json());  // Ceci permet à Express de parser les requêtes JSON
app.use('/api/auth', authRoutes); // Routes d'authentification



const PORT = process.env.PORT || 5001;  // Utilisation du port 5001
  app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));

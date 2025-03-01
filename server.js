const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const protectedRoutes = require('./routes/protectedRoutes');
const accessRoutes = require('./routes/accessRoutes');
const authRoutes = require('./routes/authRoutes');
const projectorRoutes = require('./routes/projectorRoutes');
const reservationRoutes = require('./routes/reservation');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/api', protectedRoutes);
app.use('/api/admin', accessRoutes);
app.use('/api', reservationRoutes);
app.use('/api/projectors', projectorRoutes);
app.use('/api/projecteur', projectorRoutes);
app.use(express.json());  // Ceci permet à Express de parser les requêtes JSON
app.use('/api/auth.routes', authRoutes); // Routes d'authentification
app.use('/api/reservation', reservationRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Projector Management !');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


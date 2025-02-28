const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();
app.use(express.json());

const protectedRoutes = require('./routes/protectedRoutes');
const accessRoutes = require('./routes/accessRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', protectedRoutes);
app.use('/api/admin', accessRoutes);
app.use('/api', reservationRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Projector Management !');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

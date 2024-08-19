const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const authRoutes = require('./routes/dbRoutes.js');
app.use('/api',authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

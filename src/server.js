const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
app.use(authRoutes);

app.listen(4000, () => {
    console.log('Server running on http://localhost:4000');
});

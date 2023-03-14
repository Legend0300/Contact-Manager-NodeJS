express = require('express');
const connect = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');
const contactRoutes = require('./routes/contacts');
const userRoutes = require('./routes/users');
app = express();
app.use(errorHandler)

connect();
app.use(express.json());

app.use('/api/contacts', contactRoutes);
app.use('/api/users', userRoutes);

app.get('/', function(req, res) {
    res.send('Hello World!');
    }
);

app.listen(3000);
const express = require('express');
const cors = require('cors');

const categoriaRoutes = require('./routes/categoriaRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');

const app = express();

app.use(cors()); 
app.use(express.json()); 

app.use('/api/categorias', categoriaRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/pedidos', pedidoRoutes);

app.get('/', (req, res) => {
    res.json({ mensagem: 'API funcionar!' });
});

module.exports = app;
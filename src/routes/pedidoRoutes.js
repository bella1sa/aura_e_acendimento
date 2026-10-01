const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router.get('/listar', pedidoController.listarTodos);
router.post('/criar', pedidoController.criar);

module.exports = router;
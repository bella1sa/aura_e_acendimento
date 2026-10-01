const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

router.get('/listar', produtoController.listarTodos);
router.get('/listar/:id', produtoController.buscarPorId);
router.post('/criar', produtoController.criar);
router.delete('/deletar/:id', produtoController.deletar);

module.exports = router;
const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

router.get('/', categoriaController.listarTodas);
router.post('/', categoriaController.criar);

module.exports = router;
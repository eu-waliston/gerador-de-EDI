const express = require('express');
const router = express.Router();
const ediController = require('../controllers/ediController');
const pdfController = require('../controllers/notaController');

router.get('/', (req, res) => {
    res.render('form'); // o formulário inicial
});

router.post('/gerar', ediController.generateEDI);
router.post('/nota/pdf', pdfController.gerarPdf);

module.exports = router;

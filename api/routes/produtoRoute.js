const { Router } = require('express');
const ProdutoController = require('../controllers/produtoController');
const autenticador = require('../middleware/autenticador');

const router = Router();

router.use(autenticador);

router
  .post('/produtos', ProdutoController.cadastrarProduto)
  .get('/produtos', ProdutoController.buscarTodosProdutos)
  .get('/produtos/id/:id', ProdutoController.buscarProdutoPorId)
  .delete('/produtos/id/:id', ProdutoController.deletarProdutoPorId)
  .put('/produtos/id/:id', ProdutoController.editarProduto);

module.exports = router;
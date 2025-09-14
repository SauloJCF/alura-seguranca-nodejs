const { Router } = require('express');
const ProdutoController = require('../controllers/produtoController');
const autenticador = require('../middleware/autenticador');
const roles = require('../middleware/roles');
const permissoes = require('../middleware/permissoes');

const router = Router();

router.use(autenticador);

router
  .post('/produtos', ProdutoController.cadastrarProduto)
  .get('/produtos', permissoes('editar'), ProdutoController.buscarTodosProdutos)
  .get('/produtos/id/:id', ProdutoController.buscarProdutoPorId)
  .delete('/produtos/id/:id', ProdutoController.deletarProdutoPorId)
  .put('/produtos/id/:id', ProdutoController.editarProduto);

module.exports = router;
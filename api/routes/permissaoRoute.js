const { Router } = require('express');
const PermissaoController = require('../controllers/permissaoController');

const router = Router();

router
  .post('/permissoes', PermissaoController.cadastrar)
  .get('/permissoes', PermissaoController.buscarTodos)
  .get('/permissoes/:id', PermissaoController.buscarPorId)
  .delete('/permissoes/:id', PermissaoController.deletar)
  .put('/permissoes/:id', PermissaoController.editar);

module.exports = router;
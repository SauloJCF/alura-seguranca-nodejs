const { Router } = require('express');
const PermissaoController = require('../controllers/permissaoController');

const router = Router();

router
  .post('/roles', PermissaoController.cadastrar)
  .get('/roles', PermissaoController.buscarTodos)
  .get('/roles/:id', PermissaoController.buscarPorId)
  .delete('/roles/:id', PermissaoController.deletar)
  .put('/roles/:id', PermissaoController.editar);

module.exports = router;
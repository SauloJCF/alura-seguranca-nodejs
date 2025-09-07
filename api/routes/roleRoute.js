const { Router } = require('express');
const RoleController = require('../controllers/roleController');

const router = Router();

router
  .post('/roles', RoleController.cadastrar)
  .get('/roles', RoleController.buscarTodos)
  .get('/roles/:id', RoleController.buscarPorId)
  .delete('/roles/:id', RoleController.deletar)
  .put('/roles/:id', RoleController.editar);

module.exports = router;
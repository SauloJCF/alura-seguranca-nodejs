const RoleService = require('../services/roleService');

const roleService = new RoleService();

class RoleController {

    static async cadastrar(req, res) {
        try {
            const { nome, descricao } = req.body;

            const role = await roleService.cadastrar({ nome, descricao });

            res.status(201).send(role);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async buscarTodos(req, res) {
        try {
            const roles = await roleService.buscarTodos();

            res.status(200).send(roles);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async buscarPorId(req, res) {
        try {
            const id = req.params.id;

            const role = await roleService.buscarPorId(id);

            if (!role) {
                return res.status(404).send({ message: 'Role não encontrada!' });
            }

            res.status(200).send(role);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async editar(req, res) {
        try {
            const id = req.params.id;
            const { nome, descricao } = req.body;

            const role = await roleService.editar({id,  nome, descricao });

            res.status(200).send(role);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async deletar(req, res) {
        try {
            const id = req.params.id;

            const roleDeletada = await roleService.deletar(id);

            if (!roleDeletada) {
                return res.status(404).send({ message: 'Role não encontrada!' });
            }

            res.status(200).send({ message: 'Role deletada com sucesso!' });
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }
}

module.exports = RoleController;
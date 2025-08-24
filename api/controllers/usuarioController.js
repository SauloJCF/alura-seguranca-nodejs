const UsuarioService = require('../services/usuarioService');

const usuarioService = new UsuarioService();

class UsuarioController {

    static async cadastrar(req, res) {
        try {
            const { nome, email, senha } = req.body;

            const usuario = await usuarioService.cadastrar({ nome, email, senha });

            res.status(201).send(usuario);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async buscarTodosUsuarios(req, res) {
        try {
            const usuarios = await usuarioService.buscarTodosUsuarios();

            res.status(200).send(usuarios);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async buscarUsuarioPorId(req, res) {
        try {
            const id = req.params.id;

            const usuario = await usuarioService.buscarUsuarioPorId(id);

            if (!usuario) {
                return res.status(404).send({ message: 'Usuário não encontrado!' });
            }

            res.status(200).send(usuario);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async editarUsuario(req, res) {
        try {
            const id = req.params.id;
            const { nome, email } = req.body;

            const usuario = await usuarioService.editarUsuario({id,  nome, email });

            res.status(200).send(usuario);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async deletarUsuario(req, res) {
        try {
            const id = req.params.id;

            const usuarioDeletado = await usuarioService.deletarUsuario(id);

            if (!usuarioDeletado) {
                return res.status(404).send({ message: 'Usuário não encontrado!' });
            }

            res.status(200).send({ message: 'Usuário deletado com sucesso!' });
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }
}

module.exports = UsuarioController;
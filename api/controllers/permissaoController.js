const PermissaoService = require('../services/permissaoService');

const permissaoService = new PermissaoService();

class PermissaoController {

    static async cadastrar(req, res) {
        try {
            const { nome, descricao } = req.body;

            const permissao = await permissaoService.cadastrar({ nome, descricao });

            res.status(201).send(permissao);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async buscarTodos(req, res) {
        try {
            const permissoes = await permissaoService.buscarTodos();

            res.status(200).send(permissoes);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async buscarPorId(req, res) {
        try {
            const id = req.params.id;

            const permissao = await permissaoService.buscarPorId(id);

            if (!permissao) {
                return res.status(404).send({ message: 'Permissão não encontrada!' });
            }

            res.status(200).send(permissao);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async editar(req, res) {
        try {
            const id = req.params.id;
            const { nome, descricao } = req.body;

            const permissao = await permissaoService.editar({id,  nome, descricao });

            res.status(200).send(permissao);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async deletar(req, res) {
        try {
            const id = req.params.id;

            const permissaoDeletada = await permissaoService.deletar(id);

            if (!permissaoDeletada) {
                return res.status(404).send({ message: 'Permissão não encontrada!' });
            }

            res.status(200).send({ message: 'Permissão deletada com sucesso!' });
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }
}

module.exports = PermissaoController;
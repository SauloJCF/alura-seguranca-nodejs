const SegurancaService = require("../services/segurancaService");

const segurancaService = new SegurancaService;

class SegurancaController {
    static async cadastrarAcl(req, res) {
        const { roles, permissoes } = req.body;

        const { usuarioId } = req;

        try {
            const acl = await segurancaService.cadastrarAcl({ roles, permissoes, usuarioId });

            return res.status(201).send(acl);
        } catch (error) {
            return res.status(400).send({ message: error.message })
        }
    }

    static async cadastrarPermissoesRole(req, res) {
        const { roleId, permissoes } = req.body;

        try {
            const permissoesRole = await segurancaService.cadastrarPermissoesRole({ roleId, permissoes });
            
            return res.status(201).send(permissoesRole);
        } catch (error) {
            return res.status(400).send({ message: error.message })
        }
    }
}

module.exports = SegurancaController;
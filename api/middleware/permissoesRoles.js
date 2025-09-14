const database = require('../models');

const permissoesRoles = (listaPermissoes) => {
    return async (req, res, next) => {
        const { usuarioId } = req;

        const usuario = await database.usuarios.findOne({
            include: [
                {
                    model: database.roles,
                    as: 'usuario_roles',
                    attributes: ['id'],
                    include: [
                        {
                            model: database.permissoes,
                            as: 'roles_das_permissoes',
                            attributes: ['id', 'nome']
                        }
                    ]
                }
            ],
            where: {
                id: usuarioId
            }
        });

        if (!usuario) {
            return res.status(401).send({ message: 'Usuário não cadastrado!' });
        }

        console.log(usuario.usuario_roles);


        const usuarioTemPermissao = usuario.usuario_roles
            .some((role) => {
                return role.roles_das_permissoes
                    .some((permissao) => {
                        return listaPermissoes.includes(permissao.nome)
                    })
            });

        if (!usuarioTemPermissao) {
            return res.status(401).send({ message: 'Usuário não possui acesso a esta rota!' });
        }


        return next();
    }
}

module.exports = permissoesRoles;
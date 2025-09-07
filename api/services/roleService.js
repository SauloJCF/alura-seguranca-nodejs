const uuid = require('uuid');
const database = require('../models');

class RoleService {
    async cadastrar(dto) {
        const role = await database.roles.findOne({
            where: {
                nome: dto.nome
            }
        });

        if (role) {
            throw new Error('Role já cadastrada!');
        }

        try {

            const novaRole = await database.roles.create({
                id: uuid.v4(),
                nome: dto.nome,
                descricao: dto.descricao
            });

            return novaRole;
        } catch (error) {
            throw new Error('Erro ao cadastrar role!');
        }

    }

    async buscarTodos() {
        const roles = await database.roles.findAll();
        return roles;
    }

    async buscarPorId(id) {
        const role = await database.roles.findByPk(id);
        return role;
    }

    async editar(dto) {
        const role = await this.buscarPorId(dto.id)
        try {
            role.nome = dto.nome
            role.descricao = dto.descricao

            await role.save()
            
            return role;
        } catch (error) {
            throw new Error('Erro ao editar role!')
        }
    }

    async deletar(id) {
        const rolesDeletadas = await database.roles.destroy({
            where: {
                id: id
            }
        });

        return rolesDeletadas > 0;
    }
}

module.exports = RoleService;
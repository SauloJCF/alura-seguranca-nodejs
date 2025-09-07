const uuid = require('uuid');
const database = require('../models');

class PermissaoService {
    async cadastrar(dto) {
        const permissao = await database.permissoes.findOne({
            where: {
                nome: dto.nome
            }
        });

        if (permissao) {
            throw new Error('Permissão já cadastrada!');
        }

        try {

            const novapermissao = await database.permissoes.create({
                id: uuid.v4(),
                nome: dto.nome,
                descricao: dto.descricao
            });

            return novapermissao;
        } catch (error) {
            throw new Error('Erro ao cadastrar Permissão!');
        }

    }

    async buscarTodos() {
        const permissoes = await database.permissoes.findAll();
        return permissoes;
    }

    async buscarPorId(id) {
        const permissao = await database.permissoes.findByPk(id);
        return permissao;
    }

    async editar(dto) {
        const permissao = await this.buscarPorId(dto.id)
        try {
            permissao.nome = dto.nome
            permissao.descricao = dto.descricao

            await permissao.save()
            
            return permissao;
        } catch (error) {
            throw new Error('Erro ao editar Permissão!')
        }
    }

    async deletar(id) {
        const permissoesDeletadas = await database.permissoes.destroy({
            where: {
                id: id
            }
        });

        return permissoesDeletadas > 0;
    }
}

module.exports = PermissaoService;
const { where } = require('sequelize');
const { hash } = require('bcryptjs');
const uuid = require('uuid');
const database = require('../models');

class UsuarioService {
    async cadastrar(dto) {
        const usuario = await database.usuarios.findOne({
            where: {
                email: dto.email
            }
        });

        if (usuario) {
            throw new Error('E-mail já cadastrado!');
        }

        try {
            const hashSenha = await hash(dto.senha, 8);

            const novoUsuario = await database.usuarios.create({
                id: uuid.v4(),
                nome: dto.nome,
                email: dto.email,
                senha: hashSenha
            });

            return novoUsuario;
        } catch (error) {
            throw new Error('Erro ao cadastrar usuário!');
        }

    }

    async buscarTodosUsuarios() {
        const usuarios = await database.usuarios.findAll();
        return usuarios;
    }

    async buscarUsuarioPorId(id) {
        const usuario = await database.usuarios.findByPk(id);
        return usuario;
    }

    async editarUsuario(dto) {
        const usuario = await this.buscarUsuarioPorId(dto.id)
        try {
            usuario.nome = dto.nome
            usuario.email = dto.email

            await usuario.save()
            
            return usuario
        } catch (error) {
            throw new Error('Erro ao editar usuario!')
        }
    }

    async deletarUsuario(id) {
        const usuariosDeletados = await database.usuarios.destroy({
            where: {
                id: id
            }
        });

        return usuariosDeletados > 0;
    }
}

module.exports = UsuarioService;
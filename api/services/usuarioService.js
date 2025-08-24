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
}

module.exports = UsuarioService;
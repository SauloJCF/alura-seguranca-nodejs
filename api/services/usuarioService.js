const { where } = require('sequelize');
const database = require('../models');

class UsuarioService {
    async cadastrar(dto) {
        const usuario = database.find({
            where: {
                email: dto.email
            }
        });

        if (usuario) {
            throw new Error('E-mail já cadastrado!');
        }
    }
}

module.exports = UsuarioService;
// Modelo para gerar a tabela de clientes no MySQL
// Mapeamento: cada propriedade vira uma coluna da tabela

// DataTypes = serve para definir qual o tipo da coluna
const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const Joi = require("joi");

const clienteSchema = Joi.object({
    nome: Joi.string().required(),
    email: Joi.string().email().required(),
    telefone: Joi.string().length(10).pattern(/^\d+$/).required()
})

const Cliente = connection.define("cliente", {
    // Configurar a coluna 'nome'
    nome: {
        // nome VARCHAR NOT NULL
        type: DataTypes.STRING(130),
        allowNull: false, // NOT NULL
    },
    email: {
        // email VARCHAR UNIQUE NOT NULL
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    telefone: {
        // telefone VARCHAR NOT NULL
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Associação 1:1 (One-to-One)
const Endereco = require("./endereco");




// Cliente tem um Endereço
// Endereço ganha uma chave estrangeira (nome do model + Id)
// Chave estrangeira = clienteId
Cliente.hasOne(Endereco, { onDelete: "CASCADE" });
// CASCADE = apagar o cliente, faz o endereço associado ser apagado junto
Endereco.belongsTo(Cliente); // Endereço pertence a um Cliente


module.exports = {Cliente, clienteSchema }

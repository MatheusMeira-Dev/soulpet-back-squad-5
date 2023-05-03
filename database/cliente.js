// Modelo para gerar a tabela de clientes no MySQL
// Mapeamento: cada propriedade vira uma coluna da tabela

// DataTypes = serve para definir qual o tipo da coluna
const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const Joi = require("joi");


const clienteSchema = Joi.object({
    nome: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    telefone: Joi.string().length(11).pattern(/^\d+$/).required(),
    endereco: {
        uf: Joi.string().required(),
        cidade: Joi.string().required(),
        cep: Joi.string().length(9).required(),
        rua: Joi.string().required(),
        numero: Joi.string().required()
    }
});

const options = {
    messages: {
      'any.required': '{{#label}} é um campo obrigatório',
      'string.base': '{{#label}} deve ser uma string',
      'string.email': '{{#label}} deve ser um e-mail válido',
      'string.min': '{{#label}} deve ter pelo menos {{#limit}} caracteres',
      'string.max': '{{#label}} deve ter no máximo {{#limit}} caracteres',
      'number.base': '{{#label}} deve ser um número',
      'number.integer': '{{#label}} deve ser um número inteiro',
      'number.min': '{{#label}} deve ser maior ou igual a {{#limit}}',
      'number.max': '{{#label}} deve ser menor ou igual a {{#limit}}'
    }
  };

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


module.exports = { Cliente, clienteSchema, options }

const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const Joi = require("joi");

const produtoSchema = Joi.object({
    nome: Joi.string().required(),
    preco: Joi.number().positive().precision(2).required(),
    descricao: Joi.string().max(150).required(),
    desconto: Joi.number().positive().precision(2),
    dataDesconto: Joi.date(),
    categoria: Joi.string().max(150).required()
});

const options = {
    messages: {
        'any.required': '{{#label}} é um campo obrigatório',
        'string.empty': '{{#label}} não pode ser um campo vazio',
        'string.base': '{{#label}} deve ser uma string',
        'string.email': '{{#label}} deve ser um e-mail válido',
        'string.length': '{{#label}} o campo deve ter 9 caracteres',
        'string.min': '{{#label}} deve ter pelo menos {{#limit}} caracteres',
        'string.max': '{{#label}} deve ter no máximo {{#limit}} caracteres',
        'number.base': '{{#label}} deve ser um número',
        'date.base': '{{#label}} deve ser uma data válida',
        'object.unknown': '{{#label}} deve ser um campo valido ',
        'number.integer': '{{#label}} deve ser um número inteiro',
        'number.min': '{{#label}} deve ser maior ou igual a {{#limit}}',
        'number.max': '{{#label}} deve ser menor ou igual a {{#limit}}'
    }
};

const Produto = connection.define("produto", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    desconto: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    dataDesconto: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = { Produto, produtoSchema, options }
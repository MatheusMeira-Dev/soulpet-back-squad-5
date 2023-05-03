const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const Joi = require("joi");

const servicoSchema = Joi.object({
    nome: Joi.string().required(),
    preco: Joi.number().positive().precision(2).required()
});

const options = {
    messages: {
        'any.required': '{{#label}} é um campo obrigatório',
        'string.base': '{{#label}} deve ser uma string',
        'string.email': '{{#label}} deve ser um e-mail válido',
        'string.min': '{{#label}} deve ter pelo menos {{#limit}} caracteres',
        'string.max': '{{#label}} deve ter no máximo {{#limit}} caracteres',
        'string.empty':  '{{#label}} O campo nome não pode estar vazio',
        'number.base': '{{#label}} deve ser um número',
        'number.integer': '{{#label}} deve ser um número inteiro',
        'number.min': '{{#label}} deve ser maior ou igual a {{#limit}}',
        'number.max': '{{#label}} deve ser menor ou igual a {{#limit}}',
        'number.positive': '{{#label}} deve ser um numero positivo {{#limit}}'
    }
};

const Servico = connection.define("servico", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    preco: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    }
});


module.exports = { Servico, servicoSchema, options }

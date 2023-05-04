const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const Joi = require("joi");

const servicoSchema = Joi.object({
    nome: Joi.string().required(),
    preco: Joi.number().positive().precision(2).required(),
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
        'object.unknown': '{{#label}} deve ser um campo valido',
        'number.positive':'deve ser um número positivo' ,
        'number.integer': '{{#label}} deve ser um número inteiro',
        'number.min': '{{#label}} deve ser maior ou igual a {{#limit}}',
        'number.max': '{{#label}} deve ser menor ou igual a {{#limit}}'
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
})


module.exports = {Servico, servicoSchema, options };

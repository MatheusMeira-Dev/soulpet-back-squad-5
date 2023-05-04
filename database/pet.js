const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const {Cliente} = require("./cliente");
const Joi = require("joi");

const petSchema = Joi.object({
    nome: Joi.string().max(130).trim().required(),
    tipo: Joi.string().max(100).required(),
    porte: Joi.string().max(100).required(),
    dataNasc: Joi.date(),
    clienteId: Joi.number().required()
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
        'object.unknown': '{{#label}} ',
        'number.integer': '{{#label}} deve ser um número inteiro',
        'number.min': '{{#label}} deve ser maior ou igual a {{#limit}}',
        'number.max': '{{#label}} deve ser menor ou igual a {{#limit}}'
    }
};



const Pet = connection.define("pet", {
    nome: {
        type: DataTypes.STRING(),
        allowNull: false,
    },
    tipo: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    porte: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    dataNasc: {
        type: DataTypes.DATEONLY,
    },
});



// Relacionamento 1:N (Um cliente pode ter N pets)
Cliente.hasMany(Pet, { onDelete: "CASCADE" });
// CASCADE = quando o cliente for deletado, TODOS os pets serão deletados
Pet.belongsTo(Cliente); // Um pet pertece a um cliente

module.exports = {Pet, petSchema, options }

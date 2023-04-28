const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const Pet = require("./pet");
const Servico = require("./serviço");

const Agendamento = connection.define("agendamento", {
    realizada: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    dataAgendada: {
        type: DataTypes.DATE,
        allowNull: false,
    }
})

Servico.hasMany(Agendamento);
Pet.hasMany(Agendamento);


module.exports = Servico;
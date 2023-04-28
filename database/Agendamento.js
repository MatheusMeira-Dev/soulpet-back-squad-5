const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const Pet = require("./pet");
const Servico = require("./servico");

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

Pet.hasMany(Agendamento);
Servico.hasMany(Agendamento);

module.exports = Agendamento;
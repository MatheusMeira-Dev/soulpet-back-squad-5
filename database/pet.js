const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const Cliente = require("./cliente");
const Servico = require("./serviço");

const Pet = connection.define("pet", {
  nome: {
    type: DataTypes.STRING(130),
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

Servico.hasMany(Pet)
// Relacionamento 1:N (Um cliente pode ter N pets)
Cliente.hasMany(Pet, { onDelete: "CASCADE" });
// CASCADE = quando o cliente for deletado, TODOS os pets serão deletados
Pet.belongsTo(Cliente); // Um pet pertece a um cliente

module.exports = Pet;

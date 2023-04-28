const { where } = require("sequelize");
const Cliente = require("../database/cliente");
const Endereco = require("../database/endereco");

const { Router } = require("express");

// Criar o grupo de rotas (/pets)
const router = Router();



// router.get("/clientes/:clienteId/endereco", async (req, res) => {
//   const { id } = req.params;

//   const endereco = await Endereco.findByPk(id);
//   if (endereco) {
//     res.json(endereco);
//   } else {
//     res.status(404).json({ message: "Endereço não encontrado." });
//   }
// });

router.get("/clientes/:clienteId/endereco", async (req, res)=> {
  const clienteId = req.params.clienteId;

  const cliente = await Cliente.findOne({where: {Id: clienteId}, include: [Endereco],});
  if (cliente) {
    res.status(201).json(cliente.endereco);
  } else {
    res.status(404).json({ message: "Cliente não existe"})
  }

});




module.exports = router;

const express = require("express");
const router = express.Router();
const Agendamento = require("../database/agendamento");
const Pet = require("../database/pet");
const Servico = require("../database/servico");

router.get("/agendamentos", async (req, res) => {
  const listaAgendamentos = await Agendamento.findAll();
    res.json(listaAgendamentos);
});

router.post("/agendamentos", async (req, res) => {
  const { realizada, dataAgendada, petId, servicoId } = req.body;
  
  const pet = await Pet.findByPk(petId);
  const servico = await Servico.findByPk(servicoId);
  try {
    if (pet && servico){
      const novoAgendamento = await Agendamento.create({realizada, dataAgendada, petId, servicoId});
      res.status(201).json(novoAgendamento);
    } else if (!pet && servico) {
      res.status(404).json({ message: "Pet não encontrado"})
    } else if (pet && !servico) {
      res.status(404).json({ message: "Servico não encontrado"})
    }
  } catch (error) {
    res.status(500).json({ message: "Um erro aconteceu!"})
  }
})


module.exports = router;

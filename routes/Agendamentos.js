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

router.put("/agendamentos/:id", async (req, res) => {
  const { realizada, dataAgendada } = req.body;
   
  
  const agendamento = await Agendamento.findByPk(req.params.id);
  try {
    if (agendamento){
      await Agendamento.update(
        {realizada, dataAgendada},
        { where: { id: req.params.id}});
      res.status(201).json({ message: "Agendamento atualizado!"});
    } else {
      res.status(404).json({ message: "Agendamento não encontrado"});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Um erro aconteceu!"});
  }
})

router.delete("/agendamentos/all", async (req, res) => {
  try {
      await Agendamento.destroy({ truncate: true });
      res.status(201).json({message: "Todos os Agendamentos foram excluidos!"})
  } catch (err) {
      console.log(err);
      res.status(500).json({message: "Um erro aconteceu!" })
  }
});


router.delete("/agendamentos/:id", async (req, res) => {
  const { id } = req.params;

  try {
      const agendamento = await Agendamento.findByPk(id)
      if (agendamento) {
          await agendamento.destroy();
          res.status(201).json({ message: "Agendamento excluido!" })
      } else {
          res.status(404).json({ message: "O Agendamento não foi encontrado!" });
      }
  } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Um erro aconteceu!" })
  }
});
module.exports = router;

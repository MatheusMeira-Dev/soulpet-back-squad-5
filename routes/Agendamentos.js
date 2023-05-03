const express = require("express");
const router = express.Router();
const Agendamento = require("../database/Agendamento");

router.get("/agendamentos", async (req, res) => {
  try {
    const agendamentos = await Agendamento.findAll();
    res.json(agendamentos);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar agendamentos");
  }
});


module.exports = router;

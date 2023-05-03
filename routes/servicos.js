const Servico = require("../database/servico");
const { Router } = require("express");

const router = Router();

router.post("/servicos", async (req, res) => {
  const { nome, preco } = req.body;

  try {
    const newServico = await Servico.create({ nome, preco });
    res.status(201).json(newServico);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/servicos", async (req, res) => {
    const allServicos = await Servico.findAll();
    try {
        res.status(201).json(allServicos);
    } catch (err) {
        res.status(500).json({ message: "um erro aconteu"});
    }
});

module.exports = router;

const Servico = require("../database/servico")
const { Router } = require("express")

const router = Router();


router.post("/servicos", async (req, res) => {
const { nome, preco } = req.body;

try {
const newServico = await Servico.create({nome, preco});
res.status(201).json(newServico);
} catch (err) {
console.log(err)
res.status(500).json({ message: "um erro aconteceu!"})
}
})


module.exports = router;

const { Servico, servicoSchema, options } = require("../database/servico");
const { Router } = require("express");

const router = Router();

router.post("/servicos", async (req, res) => {
    const { nome, preco } = req.body;

    try {
        const newServico = await Servico.create({ nome, preco });
        res.status(201).json(newServico);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "um erro aconteceu!" });
    }
});

router.get("/servicos", async (req, res) => {
    const allServicos = await Servico.findAll();
    try {
        res.status(201).json(allServicos);
    } catch (err) {
        res.status(500).json({ message: "um erro aconteu" });
    }
});

router.put("/servicos/:id", async (req, res) => {
    const { nome, preco } = req.body;
    const { id } = req.params;
    const { error } = servicoSchema.validate(req.body, options)

    try {
        const atualizarServico = await Servico.findByPk(id)
        if (error) {
            res.status(400).json({ message: `Dados invalidos ${error}` })
        } else if (atualizarServico) {
            await atualizarServico.update(
                { nome, preco },
                { where: { id: req.params.id } }
            );
            res.json({ message: "Serviço Atualizado!" })
        } else {
            res.status(404).json({ message: "Serviço não encontrado!" })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu!" })
    }
});



module.exports = router;

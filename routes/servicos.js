const {Servico, servicoSchema, options } = require("../database/servico");
const { Router } = require("express");

const router = Router();

router.post("/servicos", async (req, res) => {
    const { nome, preco } = req.body;
    const { error } = servicoSchema.validate(req.body, options);

    try {
        if(error) {
            res.status(400).json({message:`Dados invalidos ${error}`});            
        } else {
            const newServico = await Servico.create({ nome, preco });
           
            res.status(201).json(newServico);
        }
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

router.get("/servicos/:id", async (req, res) => {
    const { id } = req.params;
    const servico = await Servico.findByPk(id);
    try {
        if (servico) {
            res.status(201).json(servico);
        } else {
            res.status(404).json({ message: "Serviço não encontrado"})
        }
    } catch (err) {
        res.status(500).json({ message: "um erro aconteu" });
    }
});

router.put("/servicos/:id", async (req, res) => {
    const { nome, preco } = req.body;
    const { id } = req.params;
    const { error } = servicoSchema.validate(req.body, options);


    try {
        if(error) {
            res.status(400).json({message:`Dados invalidos ${error}`})
        } else {
            const atualizarServico = await Servico.findByPk(id)
                if (atualizarServico) {
                await atualizarServico.update(
                    { nome, preco },
                    { where: { id: id } }
                );
                res.status(201).json({ message: "Serviço Atualizado!" })
            } else {
                res.status(404).json({ message: "Serviço não encontrado!" })
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu!" })
    }
});


router.delete("/servicos/all", async (req, res) => {
    try {
        await Servico.destroy({ truncate: true });
        res.json({message: "Todos os serviços foram excluidos!"})
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Um erro aconteceu!" })
    }
});


router.delete("/servicos/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const servico = await Servico.findByPk(id)
        if (servico) {
            await servico.destroy();
            res.json({ message: "Serviço excluido!" })
        } else {
            res.status(404).json({ message: "O serviço não foi encontrado!" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu!" })
    }
});

module.exports = router;

const { where } = require("sequelize");
const { Cliente }  = require("../database/cliente");
const {Pet, petSchema, options } = require("../database/pet");

const { Router } = require("express");

// Criar o grupo de rotas (/pets)
const router = Router();

router.get("/pets", async (req, res) => {
  const listaPets = await Pet.findAll();
  res.json(listaPets);
});

router.get("/pets/:id", async (req, res) => {
  const { id } = req.params;

  const pet = await Pet.findByPk(id);
  if (pet) {
    res.json(pet);
  } else {
    res.status(404).json({ message: "Pet não encontrado." });
  }
});

router.post("/pets", async (req, res) => {
  const { nome, tipo, porte, dataNasc, clienteId } = req.body;
  const { error } = petSchema.validate(req.body, options);

  try {
    if(error){
        res.status(400).json({message: `Dados invalidos ${error}`})
    } else {
        const cliente = await Cliente.findByPk(clienteId);
        if (cliente) {
          const pet = await Pet.create({ nome, tipo, porte, dataNasc, clienteId });
          res.status(201).json(pet);
        } else {
          res.status(404).json({ message: "Cliente não encontrado." });
        }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});

router.put("/pets/:id", async (req, res) => {
  // Esses são os dados que virão no corpo JSON
  const { nome, tipo, dataNasc, porte } = req.body;
  const { error } = petSchema.validate(req.body, options);

  // É necessário checar a existência do Pet
  // SELECT * FROM pets WHERE id = "req.params.id";
  const pet = await Pet.findByPk(req.params.id);

  // se pet é null => não existe o pet com o id
  try {
    if(error){
        res.status(400).json({message:`Dados invalidos ${error}`})
    } else if (pet) {
      // IMPORTANTE: Indicar qual o pet a ser atualizado
      // 1º Arg: Dados novos, 2º Arg: Where
      await Pet.update(
        { nome, tipo, dataNasc, porte },
        { where: { id: req.params.id } } // WHERE id = "req.params.id"
      );
      // await pet.update({ nome, tipo, dataNasc, porte });
      res.json({ message: "O pet foi editado." });
    } else {
      // caso o id seja inválido, a resposta ao cliente será essa
      res.status(404).json({ message: "O pet não foi encontrado." });
    }
  } catch (err) {
    // caso algum erro inesperado, a resposta ao cliente será essa
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});

router.delete("/pets/:id", async (req, res) => {
  // Precisamos checar se o pet existe antes de apagar
  const pet = await Pet.findByPk(req.params.id);

  try {
    if (pet) {
      // pet existe, podemos apagar
      await pet.destroy();
      res.json({ message: "O pet foi removido." });
    } else {
      res.status(404).json({ message: "O pet não foi encontrado" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});

// listar pet que pertence a um cliente

router.get("/clientes/:clienteId/pets", async (req, res)=> {
  const clienteId = req.params.clienteId;

  const cliente = await Cliente.findOne({where: {Id: clienteId}, include: [Pet],});
  if (cliente) {
    res.status(201).json(cliente);
  } else {
    res.status(404).json({ message: "Cliente não existe"})
  }

});

module.exports = router;

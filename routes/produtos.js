const { where } = require("sequelize");
const Produto = require("../database/produto");
const {Router} = require("express");

const router = Router();

router.get("/produtos", async (req, res) => {
  const { nome, categoria} = req.query;
  const where = {};

if (nome) where.nome = nome;
if (categoria) where.categoria = categoria;

try {
  const produtos = await Produto.findAll({ where });
  res.status(200).json(produtos);
} catch (err) {
  console.error(err);
  res.status(400).json({ message: "Erro ao buscar os produtos"});
}
});

router.get("/produtos/:id", async (req, res) => {
  const {id} = req.params;

  try {
    const produto = await Produto.findOne({ where: {id} });
    if (produto) {
      res.status(200).json(produto);
    } else {
      res.status(400).json({ message: "Produto não encontrado"});
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Erro ao buscar o produto"});
  }
});

router.post("/produtos", async (req, res) => {
  // Coletar os dados do req.body
  const { nome, preco, descricao, desconto, dataDesconto, categoria } = req.body;

  try {
    // Realizando as validações necessárias
    if (!nome || !preco || !descricao || !desconto || !dataDesconto || !categoria) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    if (desconto < 0 || desconto > 100) {
      return res.status(400).json({ message: "O desconto deve estar entre 0 e 100" });
    }

    const categoriasPermitidas = ["Higiene", "Brinquedos", "Conforto", "Alimentação"];
    if (!categoriasPermitidas.includes(categoria)) {
      return res.status(400).json({ message: "A categoria informada não é válida" });
    }

    const hoje = new Date();
    const data = new Date(dataDesconto);
    if (data <= hoje) {
      return res.status(400).json({ message: "A data do desconto deve ser futura" });
    }
    
    const produto = await Produto.create({
      nome,
      preco,
      descricao,
      desconto,
      dataDesconto,
      categoria,
    });

    res.status(201).json(produto);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erro ao inserir produto" });
  }
});

router.put("/produtos/:id", async (req, res) => {
  
  const { nome, preco, descricao, desconto, dataDesconto, categoria } = req.body; 
  const { id } = req.params;
  try {
    
    const produto = await Produto.findOne({ where: { id } });
    
    if (produto) {
      // Realizando as validações necessárias
    if (!nome || !preco || !descricao || !desconto || !dataDesconto || !categoria) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    if (desconto < 0 || desconto > 100) {
      return res.status(400).json({ message: "O desconto deve estar entre 0 e 100" });
    }

    const categoriasPermitidas = ["Higiene", "Brinquedos", "Conforto", "Alimentação"];
    if (!categoriasPermitidas.includes(categoria)) {
      return res.status(400).json({ message: "A categoria informada não é válida" });
    }

    const hoje = new Date();
    const data = new Date(dataDesconto);
    if (data <= hoje) {
      return res.status(400).json({ message: "A data do desconto deve ser futura" });
    }
    await produto.update({ nome, preco, descricao, desconto, dataDesconto, categoria });
      res.status(200).json({ message: "Produto editado." });
   } else {
      res.status(404).json({ message: "Produto não encontrado." });
    }   
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Um erro inesperado aconteceu." });
  }
});

router.delete("/produtos/all", async (req, res) => {
  try {
      await Produto.destroy({ truncate: true });
      res.status(201).json({message: "Todos os Produtos foram excluidos!"})
  } catch (err) {
      console.log(err);
      res.status(500).json({message: "Um erro aconteceu!" })
  }
});


router.delete("/produtos/:id", async (req, res) => {
  const { id } = req.params;

  try {
      const produto = await Produto.findByPk(id)
      if (produto) {
          await produto.destroy();
          res.status(201).json({ message: "Produto excluido!" })
      } else {
          res.status(404).json({ message: "O Produto não foi encontrado!" });
      }
  } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Um erro aconteceu!" })
  }
});

module.exports = router;
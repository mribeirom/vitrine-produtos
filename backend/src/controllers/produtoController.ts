import { Request, Response } from "express";
import Produto from "../models/Produto.js";
import { produtoZodSchema } from "../schemas/produtoSchema.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3001;

export const getProdutos = async (req: Request, res: Response) => {
  try {
    const produtos = await Produto.find().sort({ createdAt: -1 });
    res.json(produtos);
  } catch (err: any) {
    console.error("Erro ao buscar produtos:", err.message);
    res.status(500).json({ erro: "Erro interno do servidor." });
  }
};

export const getProdutoById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const produto = await Produto.findById(id);

    if (!produto) {
      res.status(404).json({ erro: "Produto não encontrado." });
      return;
    }

    res.json(produto);
  } catch (err: any) {
    console.error(`Erro ao buscar produto ${id}:`, err.message);
    res.status(500).json({ erro: "Erro interno do servidor." });
  }
};

export const createProduto = async (req: Request, res: Response) => {
  try {
    const dadosValidados = produtoZodSchema.parse(req.body);

    let imagemUrl = "";
    if (req.file) {
      imagemUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
    } else {
      res.status(400).json({ erro: "A imagem é obrigatória." });
      return;
    }

    const novoProduto = new Produto({
      ...dadosValidados,
      imagem: imagemUrl,
    });

    const produtoSalvo = await novoProduto.save();
    res.status(201).json(produtoSalvo);
  } catch (err: any) {
    if (err.name === "ZodError") {
      res.status(400).json({ erro: "Erro de validação", detalhes: err.errors });
      return;
    }
    console.error("Erro ao criar produto:", err.message);
    res.status(400).json({ erro: "Erro ao criar produto." });
  }
};

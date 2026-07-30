import express from "express";
import { getProdutos, getProdutoById, createProduto } from "../controllers/produtoController.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.get("/", getProdutos);
router.get("/:id", getProdutoById);
router.post("/", upload.single("imagem"), createProduto);

export default router;

import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import produtoRoutes from "./routes/produtoRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares globais
app.use(cors());
app.use(express.json());

// Servir a pasta de uploads estaticamente
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Conectar ao banco de dados
connectDB();

// Rotas
app.use('/api/produtos', produtoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

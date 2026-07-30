import { z } from "zod";

export const produtoZodSchema = z.object({
  nome: z.string().min(1, "O nome é obrigatório"),
  preco: z.coerce.number().min(0.01, "O preço deve ser maior que zero"),
  marca: z.string().min(1, "A marca é obrigatória"),
  descricao: z.string().min(1, "A descrição é obrigatória"),
  detalhes: z.string().optional(),
});

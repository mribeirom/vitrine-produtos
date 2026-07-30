import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { AdicionarProduto } from '../../../services/api';

const produtoSchema = z.object({
  nome: z.string().min(1, 'O nome é obrigatório'),
  preco: z.coerce.number().min(0.01, 'O preço deve ser maior que zero'),
  marca: z.string().min(1, 'A marca é obrigatória'),
  descricao: z.string().min(10, 'A descrição deve ter pelo menos 10 caracteres'),
  detalhes: z.string().optional(),
  imagem: z.any()
    .refine((files) => files?.length === 1, 'A imagem é obrigatória.')
    .refine((files) => files?.[0]?.size <= 5 * 1024 * 1024, 'Tamanho máximo de 5MB.')
    .refine(
      (files) => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(files?.[0]?.type),
      'Apenas formatos .jpg, .png e .webp são aceitos.'
    ),
});

type ProdutoFormData = z.infer<typeof produtoSchema>;

function NovoProduto() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProdutoFormData>({
    resolver: zodResolver(produtoSchema),
  });

  const onSubmit = async (data: ProdutoFormData) => {
    setLoading(true);

    try {
      const formPayload = new FormData();
      formPayload.append("nome", data.nome);
      formPayload.append("preco", data.preco.toString());
      formPayload.append("marca", data.marca);
      formPayload.append("descricao", data.descricao);
      if (data.detalhes) {
        formPayload.append("detalhes", data.detalhes);
      }
      formPayload.append("imagem", data.imagem[0]);

      await AdicionarProduto(formPayload);
      toast.success('Produto criado com sucesso!');
      navigate('/');
    } catch (err: any) {
      toast.error(err.message || 'Erro ao criar produto');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (hasError: boolean) => 
    `w-full px-4 py-3 rounded-xl border ${hasError ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'} focus:border-transparent focus:ring-2 outline-none transition-all bg-gray-50 focus:bg-white`;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-900 py-6 px-8">
            <h3 className="text-2xl font-bold text-white tracking-tight">Adicionar Novo Produto</h3>
            <p className="text-gray-400 mt-1">Preencha os dados para cadastrar na vitrine.</p>
          </div>
          
          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-6">
              
              <div>
                <label htmlFor="nome" className="block text-sm font-semibold text-gray-700 mb-2">Nome do Produto</label>
                <input type="text" className={inputClass(!!errors.nome)} id="nome" {...register('nome')} placeholder="Ex: Tênis Nike Air Max" />
                {errors.nome && <p className="mt-2 text-sm text-red-500">{errors.nome.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="preco" className="block text-sm font-semibold text-gray-700 mb-2">Preço (R$)</label>
                  <input type="number" step="0.01" className={inputClass(!!errors.preco)} id="preco" {...register('preco')} placeholder="0.00" />
                  {errors.preco && <p className="mt-2 text-sm text-red-500">{errors.preco.message}</p>}
                </div>

                <div>
                  <label htmlFor="marca" className="block text-sm font-semibold text-gray-700 mb-2">Marca</label>
                  <input type="text" className={inputClass(!!errors.marca)} id="marca" {...register('marca')} placeholder="Ex: Nike" />
                  {errors.marca && <p className="mt-2 text-sm text-red-500">{errors.marca.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="imagem" className="block text-sm font-semibold text-gray-700 mb-2">Imagem do Produto</label>
                <input type="file" accept="image/*" className={`w-full px-4 py-2.5 rounded-xl border ${errors.imagem ? 'border-red-300' : 'border-gray-200'} bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer`} id="imagem" {...register('imagem')} />
                {errors.imagem && <p className="mt-2 text-sm text-red-500">{errors.imagem.message as string}</p>}
              </div>

              <div>
                <label htmlFor="descricao" className="block text-sm font-semibold text-gray-700 mb-2">Descrição</label>
                <textarea className={inputClass(!!errors.descricao)} id="descricao" rows={4} {...register('descricao')} placeholder="Descreva os principais benefícios do produto..."></textarea>
                {errors.descricao && <p className="mt-2 text-sm text-red-500">{errors.descricao.message}</p>}
              </div>

              <div>
                <label htmlFor="detalhes" className="block text-sm font-semibold text-gray-700 mb-2">Detalhes adicionais <span className="text-gray-400 font-normal">(Opcional)</span></label>
                <input type="text" className={inputClass(!!errors.detalhes)} id="detalhes" {...register('detalhes')} placeholder="Ex: Categoria, cor principal..." />
                {errors.detalhes && <p className="mt-2 text-sm text-red-500">{errors.detalhes.message}</p>}
              </div>

              <div className="pt-6 border-t border-gray-100 flex flex-col-reverse sm:flex-row gap-4 sm:justify-end">
                <Link to="/" className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors text-center">
                  Cancelar
                </Link>
                <button type="submit" disabled={loading} className="w-full sm:w-auto px-8 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 transition-all shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed">
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Salvando...
                    </span>
                  ) : (
                    'Salvar Produto'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NovoProduto;

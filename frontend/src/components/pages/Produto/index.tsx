import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProdutoById, Produto as ProdutoType } from '../../../services/api';

function Produto() {
  const { id } = useParams<{ id: string }>();

  const [produto, setProduto]   = useState<ProdutoType | null>(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);

  useEffect(() => {
    async function carregarProduto() {
      try {
        const data = await ProdutoById(id!);
        setProduto(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    carregarProduto();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (error || !produto) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Produto não encontrado!</h2>
        <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-xl transition-colors shadow-sm">
          Voltar para Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          
          <div className="md:w-1/2 p-8 lg:p-12 bg-gray-50/50 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-100">
            <img
              src={produto.imagem}
              alt={produto.nome}
              className="w-full max-w-md object-contain aspect-square rounded-2xl mix-blend-multiply"
            />
          </div>

          <div className="md:w-1/2 p-8 lg:p-12 flex flex-col">
            <p className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-2">{produto.marca}</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">{produto.nome}</h1>
            
            <div className="mb-8">
              <span className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tighter">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.preco)}
              </span>
            </div>

            <div className="prose prose-gray mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Descrição</h3>
              <p className="text-gray-600 leading-relaxed">{produto.descricao}</p>
            </div>

            {produto.detalhes && (
              <div className="mb-10 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Mais detalhes</h3>
                <p className="text-gray-600 text-sm">{produto.detalhes}</p>
              </div>
            )}

            <div className="mt-auto pt-6 border-t border-gray-100 flex gap-4">
              <Link 
                to="/" 
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3.5 px-6 rounded-xl transition-colors text-center"
              >
                Voltar
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Produto;
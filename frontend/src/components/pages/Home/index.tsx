import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PackageOpen } from 'lucide-react';
import { Produtos, Produto } from '../../../services/api';

function Home() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const data = await Produtos();
        setProdutos(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    carregarProdutos();
  }, []);

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-red-50 text-red-500 p-4 rounded-lg shadow">Erro: {error}</div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Produtos</h2>
        <Link 
          to="/novo-produto" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-xl transition-all shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0"
        >
          Adicionar Produto
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 shadow-sm animate-pulse border border-gray-100">
              <div className="bg-gray-100 aspect-square rounded-xl w-full mb-4"></div>
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-100 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/3 mt-auto"></div>
            </div>
          ))}
        </div>
      ) : produtos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-3xl shadow-sm border border-gray-100 border-dashed">
          <div className="bg-blue-50 p-5 rounded-full mb-5">
            <PackageOpen className="w-12 h-12 text-blue-500" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum produto por aqui</h3>
          <p className="text-gray-500 mb-8 max-w-sm">
            Sua vitrine está vazia. Adicione o seu primeiro produto para começar a exibi-los aqui.
          </p>
          <Link 
            to="/novo-produto" 
            className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-8 rounded-xl transition-colors"
          >
            Adicionar Primeiro Produto
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {produtos.map(produto => (
            <Link 
              to={`/produto/${produto.id}`} 
              key={produto.id}
              className="group flex flex-col bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl border border-gray-100 hover:border-blue-200 transition-all duration-300"
            >
              <div className="relative aspect-square w-full mb-4 overflow-hidden rounded-xl bg-gray-50/50 p-6 flex items-center justify-center">
                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500 drop-shadow-sm"
                />
              </div>
              <div className="flex flex-col flex-grow">
                <h5 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">{produto.nome}</h5>
                <p className="text-sm text-gray-500 font-medium mb-3">{produto.marca}</p>
                <div className="mt-auto">
                  <span className="text-2xl font-black text-gray-900 tracking-tight">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.preco)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
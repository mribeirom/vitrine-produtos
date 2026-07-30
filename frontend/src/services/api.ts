export interface Produto {
    id: string;
    nome: string;
    preco: number;
    imagem: string;
    marca: string;
    descricao: string;
    detalhes?: string;
    createdAt?: string;
    updatedAt?: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const Produtos = async (): Promise<Produto[]> => {
    try {
        const response = await fetch(`${API_URL}/produtos`);
        if (!response.ok) {
            throw new Error('Erro ao buscar produtos');
        }
        return await response.json();
    } catch (error) {
        console.error('Erro em Produtos:', error);
        throw error;
    }
};

export const ProdutoById = async (id: string): Promise<Produto> => {
    try {
        const response = await fetch(`${API_URL}/produtos/${id}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar produto');
        }
        return await response.json();
    } catch (error) {
        console.error('Erro em ProdutoById:', error);
        throw error;
    }
};

export const AdicionarProduto = async (formData: FormData): Promise<Produto> => {
    try {
        const response = await fetch(`${API_URL}/produtos`, {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Erro ao adicionar produto');
        }
        return await response.json();
    } catch (error) {
        console.error('Erro em AdicionarProduto:', error);
        throw error;
    }
};

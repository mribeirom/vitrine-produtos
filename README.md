# Vitrine de Produtos

Uma aplicação fullstack moderna para exibição e gerenciamento de catálogo de produtos.

## Screenshots

### Catálogo de Produtos
Tela principal da aplicação, exibindo todos os itens cadastrados.
<p align="center">
  <img src="https://github.com/user-attachments/assets/369005a6-c60b-4ed1-8e0b-0f1ed6b342ca" width="800px" />
</p>

### Cadastro
Formulário de adição de novos produtos
<p align="center">
  <img src="https://github.com/user-attachments/assets/b6c4e27a-67de-4007-abda-8142c4e63122" width="800px" />
</p>

### Detalhes do Produto
Visão expandida de um único produto.
<p align="center">
  <img src="https://github.com/user-attachments/assets/9a82b1d9-eca4-472b-845b-dcf0cb55b0f1" width="800px" />
</p>

### Catálogo Vazio
Tela principal da aplicação, quando não possui itens cadastrados.
<p align="center">
  <img src="https://github.com/user-attachments/assets/3e83cbd4-33cb-4e0b-a02e-d8acf3a05223" width="800px" />
</p>


## Tecnologias

### Frontend
- **React 19** 
- **TypeScript**
- **Tailwind CSS**
- **Zod & React Hook Form**
- **Lucide React** 
- **Sonner**

### Backend
- **Node.js & Express**
- **TypeScript**
- **Mongoose / MongoDB**
- **Zod**
- **Multer**
- **CORS & Dotenv**

## Como Executar o Projeto Localmente

### Pré-requisitos
Certifique-se de ter instalado em sua máquina:
- Node.js versão 18 ou superior
- MongoDB Local ou MongoDB Atlas
- Gerenciador de pacotes npm, yarn ou bun

### Configurando a API Backend

Navegue até a pasta do backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Copie o arquivo de variáveis de ambiente e preencha com suas chaves:

```bash
cp .env.example .env
```

Inicie o servidor em modo de desenvolvimento:

```bash
npm run dev
```

A API estará rodando em:

```bash
http://localhost:3001
```

### Configurando o Frontend

Abra um novo terminal na raiz do repositório e navegue até a pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Copie o arquivo de variáveis de ambiente:

```bash
cp .env.example .env
```

Inicie a aplicação web:

```bash
npm run dev
```

O frontend estará acessível em:

```bash
http://localhost:5173
```

## Funcionalidades

-  Listagem de produtos
-  Validação robusta de formulários 
-  Upload de imagens
-  Backend com validação de dados

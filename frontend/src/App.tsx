import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'sonner';
import Home from './components/pages/Home';
import Produto from './components/pages/Produto';
import NovoProduto from './components/pages/NovoProduto';

function App() { 
    return ( 
        <BrowserRouter>
            <Toaster position="top-right" richColors />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/produto/:id" element={<Produto />} />
                <Route path="/novo-produto" element={<NovoProduto />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
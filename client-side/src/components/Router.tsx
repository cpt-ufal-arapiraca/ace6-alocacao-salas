import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Page from "./pages/Page";
import NotFound from "./error/NotFound";
import Inicio from "./pages/Inicio";
import CadastrarUsuario from "./pages/usuario/CadastrarUsuario";
import VerUsuarios from "./pages/usuario/VerUsuarios";
import AdicionarSala from "./pages/sala/AdicionarSala";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Page/>}>
                    <Route index element={<Navigate to={"inicio"}/>}/>
                    <Route path="inicio" element={<Inicio/>}/>
                    <Route path="cadastrar-usuario" element={<CadastrarUsuario/>}/>
                    <Route path="ver-usuarios" element={<VerUsuarios/>}/>
                    <Route path="adicionar-sala" element={<AdicionarSala/>}/>
                </Route>
                <Route path="*"  element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;
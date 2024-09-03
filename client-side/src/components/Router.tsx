import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Page from "./pages/Page";
import NotFound from "./error/NotFound";
import Inicio from "./pages/Inicio";
import CadastrarUsuario from "./pages/usuario/CadastrarUsuario";
import VerUsuarios from "./pages/usuario/VerUsuarios";
import AdicionarSala from "./pages/sala/AdicionarSala";
import CadastrarDisciplina from "./pages/Disciplina/CadastrarDisciplina";
import CadastrarTurma from "./pages/Turma/CadastrarTurma";
import VerSalas from "./pages/sala/VerSalas";
import VerDisciplinas from "./pages/Disciplina/VerDisciplinas";
import VerTurmas from "./pages/Turma/VerTurmas";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Page/>}>
                    <Route path="inicio" element={<Inicio/>}/>
                    <Route path="cadastrar-usuario" element={<CadastrarUsuario/>}/>
                    <Route path="ver-usuarios/atualizar-usuario/:id" element={<CadastrarUsuario/>}/>
                    <Route path="ver-usuarios" element={<VerUsuarios/>}/>
                    <Route path="adicionar-sala" element={<AdicionarSala/>}/>
                    <Route path="ver-salas" element={<VerSalas/>}/>
                    <Route path="cadastrar-disciplina" element={<CadastrarDisciplina/>}/>
                    <Route path="ver-disciplinas" element={<VerDisciplinas/>}/>
                    <Route path="cadastrar-turma" element={<CadastrarTurma/>}/>
                    <Route path="ver-turmas" element={<VerTurmas/>}/>
                    <Route index element={<Navigate to={"inicio"}/>}/>
                </Route>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;
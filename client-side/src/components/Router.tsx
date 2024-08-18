import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Page from "./pages/Page";
import Usuario from "./pages/Usuario";
import NotFound from "./error/NotFound";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Page/>}>
                    <Route index element={<Navigate to={"cadastro"}/>}/>
                    <Route path="cadastro" element={<Usuario/>}/>
                </Route>
                <Route path="*"  element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Page from "./pages/Page";
import Usuario from "./pages/Usuario";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Page></Page>}>
                    <Route path="cadastro" element={<Usuario></Usuario>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;
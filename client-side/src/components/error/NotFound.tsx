import { Link } from "react-router-dom";
import Button from "../utils/Button";

function NotFound() {
    return (
        <div>
            <h1>404 - Página não encontrada!</h1>
            <p>Desculpe, a página que você está procurando não
 foi encontrada ou o caminho está incorreto.</p>
        <Button to="alocsalas" text="teste"></Button>
        </div>



    )
}

export default NotFound;
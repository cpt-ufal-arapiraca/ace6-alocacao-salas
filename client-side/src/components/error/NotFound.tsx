import Button from "../utils/Button";
import Img from "./Error-404.png";

function NotFound() {
    return (
        <div className="h-full flex items-center">
            <img src={Img} alt="error" />


            <div className="h-full text-center">
                <h1 className="text-5xl"><b>404 - Página não encontrada!</b></h1>
                <p className="text-2xl"> Desculpe, a página que você está procurando não <br />
                    foi encontrada ou o caminho está incorreto.</p>
                <Button to="alocsalas" text="Tela inicial">
                </Button>
            </div>
        </div>



    )
}

export default NotFound;
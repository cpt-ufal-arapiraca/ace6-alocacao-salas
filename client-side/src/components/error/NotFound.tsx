import Button from "../utils/Button";
import Img from "./Error-404.png";

function NotFound() {
    return (
        <div className="h-full flex items-center ">
        <img src={Img} alt="error" /> 
            

        <div className="text-center ">
        <h1 className="text-5xl text-center mb-4" ><b>404 - Página não encontrada!</b></h1>
        <p className="text-2xl text-center mb-4"> Desculpe, a página que você está procurando não
         foi encontrada ou o caminho está incorreto.</p>
        <div className=""><Button to="inicio" text="Tela inicial">
        </Button></div>
        </div>
        </div>



    )
}

export default NotFound;
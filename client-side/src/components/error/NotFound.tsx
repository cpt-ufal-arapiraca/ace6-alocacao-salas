import Button from "../utils/Button";
import Img from "./Error-404.png";

function NotFound() {
    return (
        <div className="grid grid-cols-12 ">
            <div className="col-span-4">
                <img src={Img}  alt="error" />
            </div>
            <div className="col-span-8 flex justify-center items-center flex-col">
                <div className="text-center">
                    <h1 className="text-5xl  mb-4" ><b>404 - Página não encontrada!</b></h1>
                    <p className="text-balance text-2xl mb-4">Desculpe, a página que você está procurando não
                    foi encontrada ou o caminho está incorreto.</p>

                </div>
                <div className=""><Button to="inicio" text="Tela inicial"></Button></div>
            </div>
        </div>



    )
}

export default NotFound;
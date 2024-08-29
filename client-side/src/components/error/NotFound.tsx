import Button from "../utils/Button";
import Img from "./Error-404.png";

function NotFound() {
    return (
        <div className="grid grid-cols-12 h-screen">
            <div className="col-span-3 hidden sm:block">
                <img className="object-fill h-screen" src={Img}  alt="error" />
            </div>
            <div className="p-4 sm:col-span-9 col-span-12 flex justify-center items-center flex-col">
                <div className="text-center">
                    <h1 className="sm:text-5xl text-3xl  mb-4" ><b>404 - Página não encontrada!</b></h1>
                    <p className="text-balance text-2xl mb-4">Desculpe, a página que você está procurando não
                    foi encontrada ou o caminho está incorreto.</p>

                </div>
                <div className="mt-2"><Button to="inicio" text="Tela inicial"></Button></div>
            </div>
        </div>
    )
}

export default NotFound;
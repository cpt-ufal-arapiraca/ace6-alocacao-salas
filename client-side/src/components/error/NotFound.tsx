import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div>
           <button className="bg-blue-500 w-40 text-white p-2 rounded">
            <Link to="/alocsalas">
                telaInicial
            </Link>
            </button>
        </div>
    )
}

export default NotFound;
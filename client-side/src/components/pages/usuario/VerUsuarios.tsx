import { useEffect, useState } from "react";
import Skeleton from "../../utils/Skeleton";
import Tabela from "../../utils/Tabela";

function VerUsuarios() {
    const [showTable, setShowTable] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowTable(true);
        },2000)
        return ()=> clearTimeout(timer)
    })
    return (
        <section>
            <h1 className="font-bold ms-7 m-2 sm:m-7 text-text_title">Ver usuários</h1>
            {showTable ? (
                <Tabela pesquisa="Pesquise por um usuário"></Tabela>
            ): (
                <Skeleton/>
            )}
        </section>
    );
}

export default VerUsuarios;
import Tabela from "../../utils/Tabela";

function VerSalas() {
    return (
        <section>
            <h1 className="font-bold ms-7 m-2 sm:m-7 text-text_title">Ver salas</h1>
            <Tabela pesquisa="Pesquise por uma sala"></Tabela>
        </section>
    )
}
export default VerSalas;
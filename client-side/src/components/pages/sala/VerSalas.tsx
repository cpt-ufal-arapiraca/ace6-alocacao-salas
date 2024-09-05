import Tabela from "../../utils/Tabela";

function VerSalas() {
    return (
        <section>
            {/*  pesquisa="Pesquise por uma sala" */}
            <h1 className="font-bold ms-7 m-2 sm:m-7 text-text_title">Ver salas</h1>
            <Tabela dados={null}></Tabela>
        </section>
    )
}
export default VerSalas;
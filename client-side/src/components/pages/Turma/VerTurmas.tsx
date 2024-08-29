import Tabela from "../../utils/Tabela";

function VerTurmas() {
    return (
        <section>
            <h1 className="font-bold ms-7 m-2 sm:m-7 text-text_title">Ver Turmas</h1>
            <Tabela pesquisa="Pesquise por uma turma"></Tabela>
        </section>
    )
}
export default VerTurmas;
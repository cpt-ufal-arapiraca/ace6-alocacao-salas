import Tabela from "../../utils/Tabela";

function VerDisciplinas() {
    return (
        <section>
            {/* pesquisa="Pesquise por uma disciplina" */}
            <h1 className="font-bold ms-7 m-2 sm:m-7 text-text_title">Ver disciplinas</h1>
            <Tabela dados={null} ></Tabela>
        </section>
    )
}

export default VerDisciplinas;
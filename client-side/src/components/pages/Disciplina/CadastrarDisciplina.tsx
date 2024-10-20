import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from "../../utils/InputsReutilizaveis";
import Button from "../../utils/Button";
import Subtitle from "../../utils/Subtitle";
import { useEffect, useState } from 'react';
import api from '../../../api/axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DisciplinaAtualizarInterface, DisciplinaInterface } from '../../../interface/Disciplina';

const schema = z.object({
    nome: z.string().min(1, "Nome da disciplina é obrigatório"),
    codigo_disciplina: z.string().min(1, "O codigo é obrigatório"),
    curso: z.string().min(1, "Curso inválido"),
    periodo: z.string().min(1, "Período inválido"),
    PPCA: z.string().min(1, "PPC inválido"),
});

type FormData = z.infer<typeof schema>;

function Form() {
    const { register, handleSubmit, setValue, formState: { errors }} = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const navigate = useNavigate();
    const disciplina_id  = Number(useParams().id);
    const location = useLocation();

    const onSubmit = async (data: FormData) => {
        setClick(true);
        const requestData = disciplina_id ? { ...data } : data;
        try {
            const response = disciplina_id 
                ? await api.put(`/disciplina`, requestData)
                : await api.post('/disciplina', data);
            
            setClick(false);
            navigate("/ver-disciplinas");
            return response;
        } catch (error) {
            setClick(false);
            console.error('Erro ao enviar os dados:', error);
            throw error;
        }
    };

    const [click, setClick] = useState(false);

    useEffect(() => {
        if (location.pathname.includes("atualizar-disciplina") && disciplina_id) {
            const fetchData = async () => {
                try {
                    const response = await api.get<DisciplinaAtualizarInterface>(`/disciplina/${disciplina_id}`);
                    if (response.status === 200) {
                        const data = response.data;
                        setValue('codigo_disciplina', data.codigo_disciplina);
                        setValue('nome', data.nome);
                        setValue('curso', data.curso);
                        setValue('periodo', data.periodo);
                        setValue('PPCA', data.PPCA);
                    }
                } catch (error) {
                    console.error("Erro ao buscar dados do usuário:", error);
                }
            };
            fetchData();
        }
    }, [location.pathname, disciplina_id, setValue]);


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="m-7 grid grid-cols-12 gap-5">
            <div className="col-span-12">
                <Subtitle subtitle="Informação sobre a disciplina" />
            </div>

            {/* Nome disciplina */}
            <div className="col-span-12 sm:col-span-5">
                <Input
                    label="Nome"
                    placeholder="Digite da disciplina"
                    error={errors.nome?.message}
                    {...register("nome")}
                />
            </div>

            {/* Codigo */}
            <div className="col-span-12 sm:col-span-5">
                <Input
                    label="Codigo"
                    placeholder="Digite o codigo"
                    error={errors.codigo_disciplina?.message}
                    {...register("codigo_disciplina")}
                />
            </div>

            {/* Curso */}
            <div className="col-span-12 sm:col-span-5">
                <Input
                    label="Curso"
                    placeholder="Digite o curso"
                    error={errors.curso?.message}
                    {...register("curso")}
                />
            </div>

            {/* Período */}
            <div className="col-span-12 sm:col-span-5">
                <Input
                    label="Período"
                    placeholder="Digite o período"
                    error={errors.periodo?.message}
                    {...register("periodo")}
                />
            </div>

           {/* PPC */}
           <div className="col-span-10">
                <Input
                    label="PPC"
                    placeholder="Digite o PPC"
                    error={errors.PPCA?.message}
                    {...register("PPCA")}
                />
            </div>
            
            {/* Submit Button */}
            <div className="col-span-12 mb-5 sm:mb-0 flex justify-end">
                {click ? (
                    <svg width="30" height="30" fill="currentColor" className="mr-2 text-button_blue animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                        <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                    </svg>
                ) : (
                    <Button text="Cadastrar" type="submit" />
                )}
            </div>
        </form>
    );
}

function CadastrarDisciplina() {
    return (
        <section>
            <h1 className="font-bold ms-7 m-2 sm:m-7 text-text_title">Cadastrar disciplina</h1>
            <Form />
        </section>
    );
}

export default CadastrarDisciplina;

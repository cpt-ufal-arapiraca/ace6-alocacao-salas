import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Checkbox } from "../../utils/InputsReutilizaveis";
import Button from "../../utils/Button";
import Subtitle from "../../utils/Subtitle";
import ValidarCPF from "../../utils/ValidarCPF";

const schema = z.object({
    nome: z.string().min(1, "Nome da disciplina é obrigatório"),
    id: z.string().min(1, "O codigo é obrigatório"),
    curso: z.string().min(1, "Curso inválido"),
    periodo: z.string().min(1, "Período inválido"),
    PPC: z.string().min(1, "PPC inválido"),
});

type FormData = z.infer<typeof schema>;

function Form() {
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

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
                    error={errors.id?.message}
                    {...register("id")}
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
                    error={errors.PPC?.message}
                    {...register("PPC")}
                />
            </div>
            
            {/* Submit Button */}
            <div className="col-span-12 mb-5 sm:mb-0 flex justify-end">
                <Button text="Cadastrar" type="submit" />
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

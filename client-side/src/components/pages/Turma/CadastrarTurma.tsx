import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Checkbox } from "../../utils/InputsReutilizaveis";
import Button from "../../utils/Button";
import Subtitle from "../../utils/Subtitle";
import Alert from '../../utils/Alert';

const schema = z.object({
    nome: z.string().min(1, "Nome da disciplina é obrigatório"),
    id: z.string().min(1, "O codigo é obrigatório"),
    horario: z.string().min(1, "horario inválido"),
    capacidade: z.string().min(1, "capacidade inválido"),
    tipoAula: z.array(z.string()).nonempty("Pelo menos um tipo aula deve ser selecionado"),
});

type FormData = z.infer<typeof schema>;

function Form() {
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            tipoAula: [],
        },
    });

    const tipoAulaValues: any = watch("tipoAula");

    const onSubmit = (data: FormData) => {
        setClick(true);
        fetch('http://localhost:5555/administrador')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
        console.log(data);
        // setTimeout(() => {
        //     setClick(false);
        // }, 2000);
    };

    const [click, setClick] = useState(false);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        setValue("tipoAula", checked 
            ? [...tipoAulaValues, value] 
            : tipoAulaValues.filter((v: any) => v !== value),
            { shouldValidate: true }
        );
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="m-7 grid grid-cols-12 gap-5">
            <div className="col-span-12">
                <Subtitle subtitle="Informação sobre a turma" />
            </div>

            {/* Nome professor */}
            <div className="col-span-12 sm:col-span-5">
                <Input
                    label="Professor(a):"
                    placeholder="Nome da professor(a)"
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

            {/* horario */}
            <div className="col-span-12 sm:col-span-5">
                <Input
                    label="Horário"
                    placeholder="Horário da aula"
                    error={errors.horario?.message}
                    {...register("horario")}
                />
            </div>

            {/* capacidade */}
            <div className="col-span-12 sm:col-span-5">
                <Input
                    label="Capacidade"
                    placeholder="Digite a capacidade"
                    error={errors.capacidade?.message}
                    {...register("capacidade")}
                />
            </div>

            <div className="col-span-12">
                <Subtitle subtitle="Tipo da aula" />
            </div>
            
            {/* Tipo da aula */}
            <div className='col-span-12 sm:col-span-8'>
                <div className={`
                ${errors.tipoAula ? 'border border-alert_error col-span-12 rounded p-2': "border border-border_input col-span-12 rounded p-2"}`}>
<div className='grid grid-cols-12 gap-5'>
                    <div className="col-span-12 sm:col-span-6">
                        <Checkbox 
                            label="Pratica conceitual" 
                            value="conceitual"
                            onChange={handleCheckboxChange}
                            checked={tipoAulaValues.includes("conceitual")}
                        />
                    </div>

                    <div className="col-span-12 sm:col-span-6">
                        <Checkbox 
                            label="Pratica laboratório" 
                            value="laboratorio"
                            onChange={handleCheckboxChange}
                            checked={tipoAulaValues.includes("laboratorio")}
                        />
                    </div>

                </div>
                </div>
                {/* Exibir erro de tipoAula */}
                {errors.tipoAula && (
                    <div className="col-span-12 text-alert_error text-xs">
                        {errors.tipoAula.message}
                    </div>
                )}
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
                <Alert background='bg-alert_success' text='Turma atualizada com sucesso!'/>
            </div>
        </form>
    );
}

function CadastrarTurma() {
    return (
        <section>
            <h1 className="font-bold ms-7 m-2 sm:m-7 text-text_title">Cadastrar turma</h1>
            <Form />
        </section>
    );
}

export default CadastrarTurma;

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Checkbox } from "../../utils/InputsReutilizaveis";
import Button from "../../utils/Button";
import Subtitle from "../../utils/Subtitle";

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
        console.log(data);
    };

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
            <div className='col-span-12 sm:col-span-5'>
                <div className={`
                ${errors.tipoAula ? 'border border-alert_error col-span-12 rounded p-2': "border col-span-12 rounded p-2"}`}>
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
                <Button text="Cadastrar" type="submit" />
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

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Checkbox } from "../../utils/InputsReutilizaveis";
import Button from "../../utils/Button";
import Subtitle from "../../utils/Subtitle";

const schema = z.object({
    numero: z
        .string()
        .min(1, "Número é obrigatório")
        .transform((val) => parseInt(val, 10)),
    capacidade: z
        .string()
        .min(1, "Capacidade é obrigatória")
        .transform((val) => parseInt(val, 10)),
    tipoSala: z.array(z.string()).nonempty("Selecione o tipo da sala"),
});

type FormData = z.infer<typeof schema>;

function Form() {
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            tipoSala: [],
        },
    });

    const tipoSalaValues: any = watch("tipoSala");

    const onSubmit = (data: FormData) => {
        setClick(true);
        console.log(data);
        setTimeout(() => {
            setClick(false);
        }, 2000);
    };

    const [click, setClick] = useState(false);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        setValue("tipoSala", checked 
            ? [...tipoSalaValues, value] 
            : tipoSalaValues.filter((v: any) => v !== value),
            { shouldValidate: true }
        );
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="m-7 grid grid-cols-12 gap-5">
            <div className="col-span-12">
                <Subtitle subtitle="Informação sobre a sala" />
            </div>

            {/* Número da sala */}
            <div className="col-span-12 sm:col-span-5">
                <Input
                    type='number'
                    label="Número"
                    placeholder="Digite número da sala"
                    error={errors.numero?.message}
                    {...register("numero")}
                />
            </div>

            {/* Capacidade */}
            <div className="col-span-12 sm:col-span-5">
                <Input
                    type='number'
                    label="Capacidade"
                    placeholder="Digite a capacidade"
                    error={errors.capacidade?.message}
                    {...register("capacidade")}
                />
            </div>

            <div className="col-span-12">
                <Subtitle subtitle="Tipo de sala" />
            </div>
            
            {/* Tipo de sala */}
            <div className='col-span-12 sm:col-span-5'>
                <div className={`
                ${errors.tipoSala ? 'border border-alert_error col-span-12 rounded p-2' : "border border-border_input col-span-12 rounded p-2"}`}>
                    <div className='grid grid-cols-12 gap-5'>
                        <div className="col-span-12 xl:col-span-6">
                            <Checkbox 
                                label="Presencial" 
                                value="presencial"
                                onChange={handleCheckboxChange}
                                checked={tipoSalaValues.includes("presencial")}
                            />
                        </div>

                        <div className="col-span-12 xl:col-span-6">
                            <Checkbox 
                                label="Laboratório" 
                                value="laboratorio"
                                onChange={handleCheckboxChange}
                                checked={tipoSalaValues.includes("laboratorio")}
                            />
                        </div>
                    </div>
                </div>
                {/* Exibir erro de tipoSala */}
                {errors.tipoSala && (
                    <div className="col-span-12 text-alert_error text-xs">
                        {errors.tipoSala.message}
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
            </div>
        </form>
    );
}

function AdicionarSala() {
    return (
        <section>
            <h1 className="font-bold ms-7 m-2 sm:m-7 text-text_title">Cadastrar sala</h1>
            <Form />
        </section>
    );
}

export default AdicionarSala;

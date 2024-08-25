import React from 'react';
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
        console.log(data);
    };

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
                <Button text="Cadastrar" type="submit" />
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

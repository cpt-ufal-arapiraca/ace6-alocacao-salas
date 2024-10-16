import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Checkbox } from "../../utils/InputsReutilizaveis";
import Button from "../../utils/Button";
import Subtitle from "../../utils/Subtitle";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import api from '../../../api/axios';
import { sala, SalaInterface } from '../../../interface/Sala';

const schema = z.object({
    codigo_sala: z
        .string()
        .min(1, "Número é obrigatório"),
    capacidade: z
        .string()
        .min(1, "Capacidade é obrigatória")
        .transform((val) => parseInt(val, 10)),
        bloco: z
        .string()
        .length(1, "O bloco deve ter apenas uma letra")
        .regex(/^[A-Za-z]$/, "O bloco deve ser uma letra")
        .transform((val) => val.toUpperCase()),
    tipo: (z.string()).nonempty("Selecione o tipo da sala"),
});

type FormData = z.infer<typeof schema>;

function Form() {
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            tipo: '',
        },
    });

    const navigate = useNavigate();
    const salaId  = Number(useParams().id);
    const tipoSalaValues: any = watch("tipo") || [];
    const location = useLocation();

    const onSubmit = async (data: FormData) => {
        setClick(true);
        const requestData = salaId ? { ...data } : data;
        try {
            const response = salaId 
                ? await api.put(`/sala`, requestData)
                : await api.post('/sala', data);
            
            setClick(false);
            navigate("/ver-salas");
            return response;
        } catch (error) {
            setClick(false);
            console.error('Erro ao enviar os dados:', error);
            throw error;
        }
    };

    const [click, setClick] = useState(false);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setValue("tipo", value, { shouldValidate: true });
    };

    useEffect(() => {
        if (location.pathname.includes("atualizar-sala") && salaId) {
            const fetchData = async () => {
                try {
                    const response = await api.get<sala>(`/sala/${salaId}`);
                    if (response.status === 200) {
                        const data = response.data;
                        setValue("codigo_sala", data.codigo_sala);
                        setValue("bloco", data.bloco);
                        setValue("capacidade", data.capacidade);
                        setValue("tipo",  String(data.tipo));
                    }
                } catch (error) {
                    console.error("Erro ao buscar dados do usuário:", error);
                }
            };
            fetchData();
        }
    }, [location.pathname, salaId, setValue]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="m-7 grid grid-cols-12 gap-5">
            <div className="col-span-12">
                <Subtitle subtitle="Informação sobre a sala" />
            </div>

          {/* Número da sala */}
            <div className="col-span-12 sm:col-span-5">
                <Input
                    disabled={
                        !!(location.pathname.includes("atualizar-sala") && salaId)
                    }
                    type='text'
                    label="Número"
                    placeholder="Digite número da sala"
                    error={errors.codigo_sala?.message}
                    {...register("codigo_sala")}
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

            {/* Bloco */}
            <div className="col-span-10">
                <Input
                    type='text'
                    label="Bloco"
                    maxLength={1}
                    placeholder="Digite o bloco"
                    error={errors.bloco?.message}
                    {...register("bloco")}
                />
            </div>

            <div className="col-span-12">
                <Subtitle subtitle="Tipo de sala" />
            </div>
            
            {/* Tipo de sala */}
            <div className='col-span-12 sm:col-span-8'>
                <div className={`
                ${errors.tipo ? 'border border-alert_error col-span-12 rounded p-2' : "border border-border_input col-span-12 rounded p-2"}`}>
                    <div className='grid grid-cols-12 gap-5'>
                        <div className="col-span-12 md:col-span-6">
                            <Checkbox 
                                label="Presencial" 
                                value="presencial"
                                onChange={handleCheckboxChange}
                                checked={tipoSalaValues.includes("presencial")}
                            />
                        </div>

                        <div className="col-span-12 md:col-span-6">
                            <Checkbox 
                                label="Laboratório" 
                                value="laboratório"
                                onChange={handleCheckboxChange}
                                checked={tipoSalaValues.includes("laboratório")}
                            />
                        </div>

                        <div className="col-span-12 md:col-span-6">
                            <Checkbox 
                                label="Ateliê" 
                                value="ateliê"
                                onChange={handleCheckboxChange}
                                checked={tipoSalaValues.includes("ateliê")}
                            />
                        </div>
                    </div>
                </div>
                {/* Exibir erro de tipo */}
                {errors.tipo && (
                    <div className="col-span-12 text-alert_error text-xs">
                        {errors.tipo.message}
                    </div>
                )}
            </div>

            <div className="col-span-12 mb-5 sm:mb-0 flex items-center justify-start">
                {click ? (
                    <svg width="30" height="30" fill="currentColor" className="mr-2 text-button_blue animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                        <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm502-202q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm296 502q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5z" />
                    </svg>
                ) : (
                    <Button type="submit" text={location.pathname.includes("atualizar-sala") ? "Atualizar" : "Registrar"} />
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

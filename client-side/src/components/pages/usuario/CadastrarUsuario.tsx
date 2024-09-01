import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Checkbox } from "../../utils/InputsReutilizaveis";
import Button from "../../utils/Button";
import Subtitle from "../../utils/Subtitle";
import ValidarCPF from "../../utils/ValidarCPF";
import Alert from '../../utils/Alert';
import api from '../../../api/axios';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UsuarioAtualizarInterface } from '../../../interface/Usuario';

const schema = z.object({
    usuario_nome: z.string().min(1, "Nome é obrigatório"),
    id: z.string().min(1, "O ID-Siape é obrigatório"),
    usuario_email: z.string().email("Email inválido"),
    usuario_cpf: z.string()
        .min(14, "CPF deve ter 11 dígitos")
        .max(14, "CPF deve ter 11 dígitos")
        .refine((cpf) => ValidarCPF(cpf), {
            message: "CPF inválido",
        }),
    tipo_usuario: z.array(z.string()).nonempty("Pelo menos um tipo de usuário deve ser selecionado"),
});

type FormData = z.infer<typeof schema>;

export function Form() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            tipo_usuario: [],
        },
    });
    const [click, setClick] = useState(false);
    const tipoUserValues: any = watch("tipo_usuario") || [];
    const location = useLocation();
    const usuarioId  = useParams().id;

    const onSubmit = async (data: FormData) => {
        setClick(true);
        const requestData = usuarioId ? { ...data, usuario_id: usuarioId } : data;
        try {
            const response = usuarioId 
                ? await api.put(`/usuario`, requestData)
                : await api.post('/usuario', data);
            
            setClick(false);
            navigate("/usuarios");
            return response;
        } catch (error) {
            setClick(false);
            console.error('Erro ao enviar os dados:', error);
            throw error;
        }
    };
    
    const formatCPF = (cpf: string) => {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    };

    useEffect(() => {
        if (location.pathname.includes("atualizar-usuario") && usuarioId) {
            const fetchData = async () => {
                try {
                    const response = await api.get<UsuarioAtualizarInterface>(`/usuario/${usuarioId}`);
                    if (response.status === 200) {
                        const data = response.data;
                        setValue("usuario_nome", data.usuario_nome);
                        setValue("id", String(data.usuario_id));
                        setValue("usuario_email", data.usuario_email);
                        setValue("usuario_cpf", formatCPF(data.usuario_cpf));
                        setValue("tipo_usuario",  [data.tipo_usuario.tipo_usuario_nome]);
                    }
                } catch (error) {
                    console.error("Erro ao buscar dados do usuário:", error);
                }
            };
            fetchData();
        }
    }, [location.pathname, usuarioId, setValue]);
    
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        setValue(
            "tipo_usuario",
            checked 
                ? [...tipoUserValues, value] 
                : tipoUserValues.filter((v: any) => v !== value),
            { shouldValidate: true }
        );
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="m-7 grid grid-cols-12 gap-5">
            <div className="col-span-12">
                <Subtitle subtitle="Informações pessoais" />
            </div>

            {/* Nome usuario */}
            <div className="col-span-12 sm:col-span-5">
                <Input
                
                    label="Nome"
                    placeholder="Digite seu nome"
                    error={errors.usuario_nome?.message}
                    {...register("usuario_nome")}
                />
            </div>

            {/* ID-Siape */}
            <div className="col-span-12 sm:col-span-5">
                <Input
                    label="ID-Siape"
                    placeholder="Digite o ID-Siape"
                    error={errors.id?.message}
                    {...register("id")}
                />
            </div>

            {/* Email */}
            <div className="col-span-12 sm:col-span-5">
                <Input
                    label="Email"
                    placeholder="Digite seu email"
                    error={errors.usuario_email?.message}
                    {...register("usuario_email")}
                />
            </div>

            {/* CPF */}
            <div className="col-span-12 sm:col-span-5">
                <Input
                    label="CPF"
                    placeholder="Digite seu CPF"
                    mask="###.###.###-##"
                    replacement={{ '#': /\d/ }}
                    error={errors.usuario_cpf?.message}
                    {...register("usuario_cpf")}
                />
            </div>

            <div className="col-span-12">
                <Subtitle subtitle="Tipo de usuário" />
            </div>

            {/* Tipo de usuário */}
            <div className='col-span-12 sm:col-span-8'>
                <div className={`${errors.tipo_usuario ? 'border border-alert_error col-span-12 rounded p-2' : "border border-border_input col-span-12 rounded p-2"}`}>
                    <div className='grid grid-cols-12 gap-5'>
                        <div className="col-span-12 sm:col-span-6">
                            <Checkbox 
                                label="Administrador" 
                                value="administrador"
                                onChange={handleCheckboxChange}
                                checked={tipoUserValues.includes("administrador")}
                            />
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <Checkbox 
                                label="Gerente" 
                                value="gerente"
                                onChange={handleCheckboxChange}
                                checked={tipoUserValues.includes("gerente")}
                            />
                        </div>
                        
                        <div className="col-span-12 sm:col-span-6">
                            <Checkbox 
                                label="Professor" 
                                value="professor"
                                onChange={handleCheckboxChange}
                                checked={tipoUserValues.includes("professor")}
                            />
                        </div>
                    </div>
                </div>
                {/* Exibir erro de tipo_usuario */}
                {errors.tipo_usuario && (
                    <div className="col-span-12 text-alert_error text-xs">
                        {errors.tipo_usuario.message}
                    </div>
                )}
            </div>

            {/* Submit Button */}
            <div className="col-span-12 mb-5 sm:mb-0 flex items-center justify-end">
                {click ? (
                    <svg width="30" height="30" fill="currentColor" className="mr-2 text-button_blue animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                        <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm502-202q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm296 502q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5z" />
                    </svg>
                ) : (
                    <Button type="submit" text={location.pathname.includes("atualizar-usuario") ? "Atualizar" : "Registrar"} />
                )}
            </div>
        </form>
    );
}

function CadastrarUsuario() {
    const usuarioId = useParams().id;
    
    return (
        <section>
            <h1 className="font-bold ms-7 m-2 sm:m-7 text-text_title">{usuarioId ? `Atualizar usuário`: `Cadastrar usuário`}</h1>
            <Form />
        </section>
    );
}

export default CadastrarUsuario;

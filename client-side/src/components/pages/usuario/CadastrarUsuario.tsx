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
    senha: z.string()
        .min(8, "A senha deve ter pelo menos 8 caracteres")
        .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
        .regex(/[0-9]/, "A senha deve conter pelo menos um número")
        .regex(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/, "A senha deve conter pelo menos um caractere especial"),
    autenticacao_senha: z.string()
        .min(8, "A confirmação da senha deve ter pelo menos 8 caracteres"),
    tipoUser: z.array(z.string()).nonempty("Pelo menos um tipo de usuário deve ser selecionado"),
});

type FormData = z.infer<typeof schema>;

function Form() {
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            tipoUser: [],
        },
    });
    const [click, setClick] = useState(false);
    const tipoUserValues: any = watch("tipoUser");

    const onSubmit = async (data: FormData) => {
        setClick(true);
        const data2 = {
            autenticacao_senha: "Teste123@",
            usuario_cpf : "713.659.914-82",
            usuario_email: "asdf@alsd.com",
            usuario_nome: "ASDf asdfasf"
        }
        console.log(data);
        try {
            const response = await api.get('http://localhost:5555/administrador/verificar');
            setClick(false);
            return response
        }   catch (error) {
            setClick(false);
            console.error('Erro ao buscar dados do usuário:', error);
            throw error;
          }
        // setTimeout(() => {
        //     setClick(false);
        // }, 2000);
    };

    
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        setValue("tipoUser", checked 
            ? [...tipoUserValues, value] 
            : tipoUserValues.filter((v: any) => v !== value),
            { shouldValidate: true }
        );
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="m-7 grid grid-cols-12 gap-5">
            <div className="col-span-12">
                <Subtitle subtitle="Informação pessoais" />
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

            {/* Criar senha */}
            <div className="col-span-12 sm:col-span-5">
                <Input
                    label="Criar senha"
                    placeholder="Digite uma senha"
                    type="password"
                    showPasswordToggle
                    error={errors.senha?.message}
                    {...register("senha")}
                />
            </div>
             
            {/* Confirme senha */}
            <div className="col-span-12 sm:col-span-5">
                <Input
                    label="Confirme sua senha"
                    placeholder="Confirme sua senha"
                    type="password"
                    showPasswordToggle
                    error={errors.autenticacao_senha?.message}
                    {...register("autenticacao_senha")}
                />
            </div>

            <div className="col-span-12">
                <Subtitle subtitle="Tipo de usuário" />
            </div>
            
            {/* Tipo de usuário */}
            <div className='col-span-12 sm:col-span-5'>
                <div className={`
                ${errors.tipoUser ? 'border border-alert_error col-span-12 rounded p-2': "border border-border_input col-span-12 rounded p-2"}`}>
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
                {/* Exibir erro de tipoUser */}
                {errors.tipoUser && (
                    <div className="col-span-12 text-alert_error text-xs">
                        {errors.tipoUser.message}
                    </div>
                )}
            </div>

            {/* Submit Button */}
            <div className="col-span-12 mb-5 sm:mb-0 flex items-center justify-end">
                {click ? (
                    <svg width="30" height="30" fill="currentColor" className="mr-2 text-button_blue animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                        <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                    </svg>
                ) : (
                    <Button text="Cadastrar" type="submit" />
                )}
                    <Alert background='bg-alert_error' text='Não foi possível alterar!'/>
            </div>
        </form>
    );
}

function CadastrarUsuario() {
    return (
        <section>
            <h1 className="font-bold ms-7 m-2 sm:m-7 text-text_title">Cadastrar usuário</h1>
            <Form />
        </section>
    );
}

export default CadastrarUsuario;

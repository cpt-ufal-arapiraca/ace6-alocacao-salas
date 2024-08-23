import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Checkbox } from "../../utils/InputsReutilizaveis";
import Button from "../../utils/Button";
import Subtitle from "../../utils/Subtitle";
import ValidarCPF from "../../utils/ValidarCPF";

const schema = z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
    id: z.string().min(1, "O ID-Siape é obrigatório"),
    email: z.string().email("Email inválido"),
    cpf: z.string()
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
    confirmarSenha: z.string()
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

    const tipoUserValues: any = watch("tipoUser");

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        setValue("tipoUser", checked 
            ? [...tipoUserValues, value] 
            : tipoUserValues.filter((v: any) => v !== value)
        );
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="m-7 sm:me-0 grid grid-cols-12 gap-5">
            <div className="col-span-12">
                <Subtitle subtitle="Informação pessoais" />
            </div>

            {/* Nome usuario */}
            <div className="col-span-12 sm:col-span-5">
                <Input
                    label="Nome"
                    placeholder="Digite seu nome"
                    error={errors.nome?.message}
                    {...register("nome")}
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
                    error={errors.email?.message}
                    {...register("email")}
                />
            </div>

            {/* CPF */}
            <div className="col-span-12 sm:col-span-5">
                <Input
                    label="CPF"
                    placeholder="Digite seu CPF"
                    mask="###.###.###-##"
                    replacement={{ '#': /\d/ }}
                    error={errors.cpf?.message}
                    {...register("cpf")}
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
                    error={errors.confirmarSenha?.message}
                    {...register("confirmarSenha")}
                />
            </div>

            <div className="col-span-12">
                <Subtitle subtitle="Tipo de usuário" />
            </div>
            
            {/* Tipo de usuário */}
            <div className='col-span-12 sm:col-span-5'>
                <div className={`
                ${errors.tipoUser ? 'border border-alert_error col-span-12 rounded p-2': "border col-span-12 rounded p-2"}`}>
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
            <div className="col-span-12 mb-5 sm:mb-0 flex justify-end">
                <Button text="Cadastrar" type="submit" />
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

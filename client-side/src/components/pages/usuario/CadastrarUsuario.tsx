import { Select, Input } from "../../utils/InputsReutilizaveis";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ValidarCPF, {} from "../../utils/ValidarCPF"
import { z } from 'zod';
import Button from "../../utils/Button";
import Subtitle from "../../utils/Subtitle";

const schema = z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
    id: z.number().min(1, "O ID-Siape é obrigatório"),
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
        
    categoria: z.string().min(1, "Categoria é obrigatória"),
});
  
  
type FormData = z.infer<typeof schema>;

function Form() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });
    
    const onSubmit = (data: FormData) => {
        console.log(data);
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="m-7 grid grid-cols-12 gap-5">
            <div className="col-span-12">
                <Subtitle subtitle="Informação pessoais"></Subtitle>
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
            {/* ASdf */}
            {/* <div className="col-span-12 sm:col-span-5">
                <Select
                    label="Categoria"
                    options={[
                        { value: 'categoria1', label: 'Categoria 1' },
                        { value: 'categoria2', label: 'Categoria 2' },
                    ]}
                    error={errors.categoria?.message}
                    {...register("categoria")}
                />
            </div> */}
            <div className="col-span-12">
                <Subtitle subtitle="Tipo de usuário"></Subtitle>
            </div>
            {/* Submit Button */}
            <div className="col-span-12 flex justify-end">
                <Button text="Cadastrar" type="submit" />
            </div>
        </form>
    );
}

function CadastrarUsuario() {
    return (
        <section>
            <h1 className="font-bold m-7 text-text_title">Cadastrar usuário</h1>
            <Form />
        </section>
    )
}

export default CadastrarUsuario;

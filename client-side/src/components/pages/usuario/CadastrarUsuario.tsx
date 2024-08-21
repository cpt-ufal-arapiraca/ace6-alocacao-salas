import { Select, Input } from "../../utils/InputsReutilizaveis";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
    id: z.number().min(1, "O ID-Siape é obrigatório"),
    email: z.string().email("Email inválido"),
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
        <form onSubmit={handleSubmit(onSubmit)} className="m-5 grid grid-cols-12 gap-5">
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
                    error={errors.email?.message}
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
                    error={errors.email?.message}
                    {...register("email")}
                />
            </div>

            {/* ASdf */}
            <div className="col-span-12 sm:col-span-5">
                <Select
                    label="Categoria"
                    options={[
                        { value: 'categoria1', label: 'Categoria 1' },
                        { value: 'categoria2', label: 'Categoria 2' },
                    ]}
                    error={errors.categoria?.message}
                    {...register("categoria")}
                />
            </div>

            {/* Submit Button */}
            <div className="col-span-12">
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Enviar</button>
            </div>
        </form>
    );
}

function CadastrarUsuario() {
    return (
        <section>
            <h1 className="font-bold m-5 text-text_title">Cadastrar usuário</h1>
            <div className="ms-5 border-b-2 text-text_secondary">
            Informação pessoais
            </div>
            <Form />
        </section>
    )
}

export default CadastrarUsuario;

import { Select, Input } from "../../utils/InputsReutilizaveis";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido"),
    categoria: z.string().min(1, "Categoria é obrigatória"),
});
  
type FormData = z.infer<typeof schema>;

function CadastrarUsuario() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });
    
    const onSubmit = (data: FormData) => {
        console.log(data);
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
                label="Nome"
                placeholder="Digite seu nome"
                error={errors.nome?.message}
                {...register("nome")}
            />
            <Input
                label="Email"
                placeholder="Digite seu email"
                error={errors.email?.message}
                {...register("email")}
            />
            <Select
                label="Categoria"
                options={[
                    { value: 'categoria1', label: 'Categoria 1' },
                    { value: 'categoria2', label: 'Categoria 2' },
                ]}
                error={errors.categoria?.message}
                {...register("categoria")}
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Enviar</button>
        </form>
    )
}

export default CadastrarUsuario;

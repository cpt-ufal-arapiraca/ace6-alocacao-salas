import { useEffect, useState } from "react";
import {UsuarioInterface} from "../../interface/Usuario";
import Modal from "./Modal";
import api from "../../api/axios";
import Alert from "./Alert";
import { Link } from "react-router-dom";

interface TableProps {
    dados: UsuarioInterface | null;
}

function Tabela({ dados }: TableProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [usuarioId, setUsuarioId] = useState<number | null>(null);
    const [usuarios, setUsuarios] = useState(dados ? dados.usuarios : []);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isDelete) {
            timer = setTimeout(() => setIsDelete(false), 5000);
        }
        return () => clearTimeout(timer);
    }, [isDelete]);

    useEffect(() => {
        if (dados) {
            setUsuarios(dados.usuarios);
        }
    }, [dados]);

    const handleConfirm = async () => {
        if (usuarioId) {
            try {
                const response = await api.delete(`/usuario/${usuarioId}`);
                if (response.status === 200) {
                    const novosUsuarios = usuarios.filter((user) => user.usuario_id !== usuarioId);
                    setUsuarios(novosUsuarios);
                    setIsDelete(true);
                } else {
                    setIsDelete(false);
                }
            } catch (error) {
                setIsDelete(false);
                console.error("Erro ao deletar usuário:", error);
            } finally {
                setIsModalOpen(false);
                setUsuarioId(null);
            }
        }
    };

    return (
        <section className="m-7 grid grid-cols-12 gap-5">
            <div className="col-span-12">
                <div className="relative overflow-x-auto shadow-md rounded">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs h-14 text-white bg-button_blue dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    No
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Usuário
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Cargo
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        {usuarios.length > 0 && (
                            <tbody>
                                {usuarios.map((usuario, index) => (
                                    <tr
                                        key={usuario.usuario_id}
                                        className="odd:bg-white text-text_primary odd:dark:bg-gray-900 even:bg-table even:dark:bg-gray-800 dark:border-gray-700"
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium whitespace-nowrap dark:text-white"
                                        >
                                            {index + 1}
                                        </th>
                                        <td className="px-6 py-4">
                                            {usuario.usuario_nome}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div
                                                className={`${
                                                    usuario.tipo_usuario
                                                        .tipo_usuario_nome ===
                                                    "Administrador"
                                                        ? "bg-cargo_user_admin"
                                                        : usuario.tipo_usuario
                                                              .tipo_usuario_nome ===
                                                          "Gerente"
                                                        ? "bg-cargo_user_gerente"
                                                        : "bg-cargo_user_professor"
                                                } text-white text-xs rounded-full w-min p-1`}
                                            >
                                                {usuario.tipo_usuario
                                                    .tipo_usuario_nome}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="grid grid-cols-12">
                                                <Link to={`/ver-usuarios/atualizar-usuario/${usuario.usuario_id}`} className="cursor-pointer col-span-6 justify-self-center">
                                                    <i className="fi fi-rr-pencil flex items-center text-xl"></i>
                                                </Link>
                                                <div
                                                    onClick={() => {
                                                        setUsuarioId(
                                                            usuario.usuario_id
                                                        );
                                                        setIsModalOpen(true);
                                                    }}
                                                    className="cursor-pointer col-span-6 justify-self-center"
                                                >
                                                    <i className="fi fi-rr-cross-circle flex items-center text-xl"></i>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </table>
                    {usuarios.length === 0 && (
                        <div className="h-14 flex justify-center items-center">
                            <h1 className="font-bold text-xl text-text_title">
                                Nenhum usuário encontrado
                            </h1>
                        </div>
                    )}
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirm}
                title="Tem certeza?"
                content="Essa ação removerá o usuário do sistema. Essa ação não é reversível."
                confirmText="Sim, deletar"
                cancelText="Cancelar"
            />
            {isDelete && (
                <Alert background="bg-alert_success" text="Usuário apagado com sucesso!" />
            )}
        </section>
    );
}

export default Tabela;

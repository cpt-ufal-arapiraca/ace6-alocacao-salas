import { useEffect, useState } from "react";
import {UsuarioInterface} from "../../interface/Usuario";
import Modal from "./Modal";
import api from "../../api/axios";
import Alert from "./Alert";
import { Link } from "react-router-dom";
import { SalaInterface } from "../../interface/Sala";

interface TableProps {
    dados: UsuarioInterface | SalaInterface | null;
}

function Tabela({ dados }: TableProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [itemId, setItemId] = useState<number | null>(null);
    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        if (dados) {
            if ("usuarios" in dados) {
                setItems(dados.usuarios);
            } else if ("salas" in dados) {
                setItems(dados.salas);
            }
        }
    }, [dados]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isDelete) {
            timer = setTimeout(() => setIsDelete(false), 5000);
        }
        return () => clearTimeout(timer);
    }, [isDelete]);

    const handleConfirm = async () => {
        if (itemId && dados) {
            const endpoint = 'usuarios' in dados ? 'usuario' : 'sala';
            try {
                const response = await api.delete(`/${endpoint}/${itemId}`);
                if (response.status === 200) {
                    const novosItems = 'usuarios' in dados
                        ? items.filter((item) => item.usuario_id !== itemId)
                        : items.filter((item) => item.sala_id !== itemId);
    
                    setItems(novosItems);
                    setIsDelete(true);
                } else {
                    setIsDelete(false);
                }
            } catch (error) {
                setIsDelete(false);
                console.error("Erro ao deletar item:", error);
            } finally {
                setIsModalOpen(false);
                setItemId(null);
            }
        }
    };
    

    return (
        <section className="m-7 grid grid-cols-12 gap-5">
            <div className="col-span-12">
                <div className="relative overflow-x-auto shadow-md rounded">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs h-14 text-white bg-button_blue">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    No
                                </th>
                                
                                {"usuarios" in dados! ? (
                                    <>
                                        <th scope="col" className="px-6 py-3">Usuário</th>
                                        <th scope="col" className="px-6 py-3">Cargo</th>
                                        <th scope="col" className="px-6 py-3">Ações</th>
                                    </>
                                ) : (
                                    <>
                                        <th scope="col" className="px-6 py-3">Código Sala</th>
                                        <th scope="col" className="px-6 py-3">Tipo</th>
                                        <th scope="col" className="px-6 py-3">Bloco</th>
                                        <th scope="col" className="px-6 py-3">Capacidade</th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        {items.length > 0 && (
                            <tbody>
                                {items.map((item, index) => (
                                    <tr
                                        key={item.usuario_id || item.sala_id}
                                        className="odd:bg-white text-text_primary even:bg-table"
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium whitespace-nowrap"
                                        >
                                            {index + 1}
                                        </th>

                                        {"usuarios" in dados! ? (
                                            <>
                                                <td className="px-6 py-4">{item.usuario_nome}</td>
                                                <td className="px-6 py-4">
                                                    <div
                                                        className={`${
                                                            item.tipo_usuario.tipo_usuario_nome ===
                                                            "Administrador"
                                                                ? "bg-cargo_user_admin"
                                                                : item.tipo_usuario
                                                                      .tipo_usuario_nome === "Gerente"
                                                                ? "bg-cargo_user_gerente"
                                                                : "bg-cargo_user_professor"
                                                        } text-white text-xs rounded-full w-min p-1`}
                                                    >
                                                        {item.tipo_usuario.tipo_usuario_nome}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="grid grid-cols-12">
                                                        <Link
                                                            to={`/ver-usuarios/atualizar-usuario/${item.usuario_id}`}
                                                            className="cursor-pointer col-span-6 justify-self-center"
                                                        >
                                                            <i className="fi fi-rr-pencil flex items-center text-xl"></i>
                                                        </Link>
                                                        <div
                                                            onClick={() => {
                                                                setItemId(item.usuario_id);
                                                                setIsModalOpen(true);
                                                            }}
                                                            className="cursor-pointer col-span-6 justify-self-center"
                                                        >
                                                            <i className="fi fi-rr-cross-circle flex items-center text-xl"></i>
                                                        </div>
                                                    </div>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td className="px-6 py-4">{item.codigo_sala}</td>
                                                <td className="px-6 py-4">{item.tipo}</td>
                                                <td className="px-6 py-4">{item.bloco}</td>
                                                <td className="px-6 py-4">
                                                    <div className="grid grid-cols-12">
                                                        <Link
                                                            to={`/ver-salas/atualizar-sala/${item.sala_id}`}
                                                            className="cursor-pointer col-span-6 justify-self-center"
                                                        >
                                                            <i className="fi fi-rr-pencil flex items-center text-xl"></i>
                                                        </Link>
                                                        <div
                                                            onClick={() => {
                                                                setItemId(item.sala_id);
                                                                setIsModalOpen(true);
                                                            }}
                                                            className="cursor-pointer col-span-6 justify-self-center"
                                                        >
                                                            <i className="fi fi-rr-cross-circle flex items-center text-xl"></i>
                                                        </div>
                                                    </div>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </table>
                    {items.length === 0 && (
                        <div className="h-14 flex justify-center items-center">
                            <h1 className="font-bold text-xl text-text_title">
                                Nenhum dado encontrado
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
                content="Essa ação removerá o item do sistema. Essa ação não é reversível."
                confirmText="Sim, deletar"
                cancelText="Cancelar"
            />
            {isDelete && (
                <Alert background="bg-alert_success" text="Item apagado com sucesso!" />
            )}
        </section>
    );
}
export default Tabela;

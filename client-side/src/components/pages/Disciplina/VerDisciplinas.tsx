import { useState, useEffect } from "react";
import api from "../../../api/axios";
import Tabela from "../../utils/Tabela";
import {UsuarioInterface} from "../../../interface/Usuario";
import { SkeletonTable } from "../../utils/Skeleton";
import { Link } from "react-router-dom";
import _ from 'lodash';

function VerDisciplinas() {
    const [usuarios, setUsuarios] = useState<UsuarioInterface | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    const fetchUsuarios = async (term: string, page: number) => {
        try {
            const response = await api.get<UsuarioInterface>('/usuario', {
                params: {
                    usuario_nome: term,
                    pagina: page,
                    quantidada: itemsPerPage
                }
            });
            
            
            setUsuarios(response.data);
            const total = response.data.total; 
            setTotalPages(Math.ceil(total / itemsPerPage));
        } catch (error) {
            console.error('Erro ao buscar dados do usuário:', error);
        }
    };

    const fetchAllUsuarios = async (page: number) => {
        try {
            const response = await api.get<UsuarioInterface>('/usuario', {
                params: {
                    pagina: page,
                    quantidada: itemsPerPage
                }
            });
            console.log(response);
            setUsuarios(response.data);
            const total = response.data.total;
            setTotalPages(Math.ceil(total / itemsPerPage));
        } catch (error) {
            console.error('Erro ao buscar todos os usuários:', error);
        }
    };

    const debouncedFetchUsuarios = _.debounce((term: string) => fetchUsuarios(term, currentPage), 300);

    useEffect(() => {
        if (searchTerm) {
            debouncedFetchUsuarios(searchTerm);
        } else {
            fetchAllUsuarios(currentPage);
        }
    }, [searchTerm, currentPage]);

    useEffect(() => {
        async function initialFetch() {
            try {
                await fetchAllUsuarios(currentPage);
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
                setLoading(false);
            }
        }
        initialFetch();
    }, []);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const getPageNumbers = () => {
        const pages = [];
        const startPage = Math.max(1, currentPage - 1);
        const endPage = Math.min(totalPages, currentPage + 1);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <section>
            <h1 className="font-bold ms-7 m-2 sm:m-7 text-text_title">Ver disciplinas</h1>
            <section className="m-7 grid grid-cols-12 gap-5">
                <div className="col-span-12 flex justify-end">
                    <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-10 flex">
                            <form className="w-full">
                                <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Pesquisar</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="block w-full p-2.5 border border-border_input rounded text-text_primary text-sm"
                                        placeholder='Pesquise por um usuário'
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        required
                                    />
                                    <div className="text-text_primary absolute inset-y-0 end-3 flex items-center ps-3 pointer-events-none">
                                        <i className="fi fi-rr-search flex items-center"></i>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-span-2 flex">
                            <Link to={'/cadastrar-usuario'} className="h-10 w-10 bg-button_blue rounded-full flex items-center justify-center">
                                <i className="fi fi-rr-plus text-white flex items-center"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            {loading ? (
                <SkeletonTable />
            ) : (
                <section>
                    <Tabela dados={usuarios} />
                    <section className="m-7 grid grid-cols-12 gap-5">
                        <div className="col-span-12">
                            <div className="text-text_primary text-xs grid grid-cols-2 justify-self-start">
                                <div className="col-span-1 flex items-center">
                                    Página {currentPage} de {totalPages}
                                </div>
                                <div className="col-span-1 justify-self-end">
                                    <div className={`grid ${totalPages === 1 ? 'grid-cols-1': totalPages === 2 ? 'grid-cols-2' : 'grid-cols-3'} gap-2`}>
                                        {pageNumbers.map((page) => (
                                            <div
                                                key={page}
                                                onClick={() => handlePageChange(page)}
                                                className={`cursor-pointer col-span-1 flex justify-center items-center rounded h-8 w-8 ${
                                                    currentPage === page ? 'bg-button_blue text-white' : 'border border-text_secondary text-text_primary'
                                                }`}
                                            >
                                                {page}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            )}
        </section>
    );
}

export default VerDisciplinas;

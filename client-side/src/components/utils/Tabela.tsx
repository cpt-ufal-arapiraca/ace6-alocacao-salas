function Tabela(){
    return (
        <section className="m-7 grid grid-cols-12 gap-5">
            <div className="col-span-12 flex justify-end">
                <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-10 flex">
                    <form className="max-w-md mx-auto">   
                        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Pesquisar</label>
                        <div className="relative">
                            <input type="text" className="block w-full p-2.5 border border-border_input rounded text-text_primary text-sm " placeholder="Pesquise por um usuário" required />
                            <div className="text-text_primary absolute inset-y-0 end-3 flex items-center ps-3 pointer-events-none">
                               <i className="fi fi-rr-search flex items-center"></i>
                            </div>
                        </div>
                    </form>
                    </div>
                    <div className="col-span-2 flex">
                        <div className=" h-10 w-10 bg-button_blue rounded-full flex items-center justify-center">
                            <i className="fi fi-rr-plus text-white flex items-center"></i>
                        </div>
                    </div>  
                </div>
            </div>
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
                        <tbody>
                        <tr className="odd:bg-white text-text_primary odd:dark:bg-gray-900 even:bg-table even:dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                                    1
                                </th>
                                <td className="px-6 py-4">
                                    Roberto
                                </td>
                                <td className="px-6 py-4">
                                    <div className="bg-green-500 text-white text-xs rounded-full w-min p-1">Gerente</div>
                                </td>
                                <td className="px-6 py-4">
                                   <div className="grid grid-cols-12">
                                        <div className="cursor-pointer col-span-6 justify-self-center">
                                            <i className="fi fi-rr-pencil flex items-center"></i>
                                        </div>
                                        <div className="cursor-pointer col-span-6 justify-self-center">
                                            <i className="fi fi-rr-cross-circle flex items-center"></i>
                                        </div>
                                   </div>
                                </td>
                            </tr>
                            <tr className="odd:bg-white text-text_primary odd:dark:bg-gray-900 even:bg-table even:dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                                    2
                                </th>
                                <td className="px-6 py-4">
                                    Raquel
                                </td>
                                <td className="px-6 py-4">
                                    <div className="bg-button_blue text-white text-xs rounded-full w-min p-1">Admin</div>
                                </td>
                                <td className="px-6 py-4">
                                   <div className="grid grid-cols-12">
                                        <div className="cursor-pointer col-span-6 justify-self-center">
                                            <i className="fi fi-rr-pencil flex items-center"></i>
                                        </div>
                                        <div className="cursor-pointer col-span-6 justify-self-center">
                                            <i className="fi fi-rr-cross-circle flex items-center"></i>
                                        </div>
                                   </div>
                                </td>
                            </tr>
                            <tr className="odd:bg-white text-text_primary odd:dark:bg-gray-900 even:bg-table even:dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                                    3
                                </th>
                                <td className="px-6 py-4">
                                    Vitoria
                                </td>
                                <td className="px-6 py-4">
                                    <div className="bg-button_blue text-white text-xs rounded-full w-min p-1">Admin</div>
                                </td>
                                <td className="px-6 py-4">
                                   <div className="grid grid-cols-12">
                                        <div className="cursor-pointer col-span-6 justify-self-center">
                                            <i className="fi fi-rr-pencil flex items-center"></i>
                                        </div>
                                        <div className="cursor-pointer col-span-6 justify-self-center">
                                            <i className="fi fi-rr-cross-circle flex items-center"></i>
                                        </div>
                                   </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="col-span-12">
                <div className="text-text_primary text-xs grid grid-cols-2 justify-self-start">
                    <div className="col-span-1 flex items-center">
                        Página 1 de 27
                    </div>
                    <div className="col-span-1 justify-self-end">
                        <div className="grid grid-cols-3 gap-2">
                            <div className="col-span-1 text-white flex justify-center items-center rounded bg-button_blue h-8 w-8">
                                1
                            </div>
                            <div className="col-span-1 flex justify-center items-center rounded border border-text_secondary h-8 w-8">
                                2
                            </div>
                            <div className="col-span-1 flex justify-center items-center rounded border border-text_secondary h-8 w-8">
                                3
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Tabela;
function Skeleton() {
    return (
        <section className="m-7 grid grid-cols-12 gap-5">
            <div className="col-span-12 flex justify-end">
                <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-10 flex">
                            <form className="w-full">   
                                <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Pesquisar</label>
                                <div className="relative">
                                    <input type="text" className="block w-full p-2.5 border border-border_input rounded text-text_primary text-sm " 
                                    placeholder='lorem' required />
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
            <div className="h-14 flex items-center justify-between p-4 bg-blue-400 animate-pulse">
                <div className="h-3 bg-blue-300 rounded-full w-12"></div>
                <div className="h-3 bg-blue-300 rounded-full w-12"></div>
                <div className="h-3 bg-blue-300 rounded-full w-12"></div>
                <div className="h-3 bg-blue-300 rounded-full w-12"></div>
            </div>

            {[...Array(4)].map((_, index) => (
                <div
                    key={index}
                    className={`flex items-center justify-between p-4 animate-pulse ${
                        index % 2 === 0 ? "bg-table" : "bg-white"
                    }`}
                >
                    <div className={`h-3 ${index % 2 === 0 ? "bg-gray-300" : "bg-gray-200"} rounded-full w-12`}></div>
                    <div className={`h-3 ${index % 2 === 0 ? "bg-gray-300" : "bg-gray-200"} rounded-full w-12`}></div>
                    <div className={`h-3 ${index % 2 === 0 ? "bg-gray-300" : "bg-gray-200"} rounded-full w-12`}></div>
                    <div className={`h-3 ${index % 2 === 0 ? "bg-gray-300" : "bg-gray-200"} rounded-full w-12`}></div>
                </div>
            ))}
        </div>
        <div className="col-span-12">
                <div className="text-text_primary text-xs grid grid-cols-2 justify-self-start">
                    <div className="col-span-1 flex items-center">
                        <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-600 w-24 animate-pulse"></div>
                    </div>
                    <div className="col-span-1 justify-self-end">
                        <div className="grid grid-cols-3 gap-2">
                            <div className="col-span-1 flex justify-center items-center rounded bg-blue-300 h-8 w-8 animate-pulse"></div>
                            <div className="col-span-1 flex justify-center items-center rounded bg-gray-300 h-8 w-8 animate-pulse"></div>
                            <div className="col-span-1 flex justify-center items-center rounded bg-gray-300 h-8 w-8 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Skeleton;
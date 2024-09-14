export function SkeletonTable() {
    return (
        <section className="m-7 grid grid-cols-12 gap-5">
            <div className="col-span-12">
                        <div className="h-14 flex items-center justify-between p-4 bg-button_blue animate-pulse">
                            <div className="h-3 bg-blue-300 rounded-full w-12"></div>
                            <div className="h-3 bg-blue-300 rounded-full w-12"></div>
                            <div className="h-3 bg-blue-300 rounded-full w-12"></div>
                            <div className="h-3 bg-blue-300 rounded-full w-12"></div>
                        </div>

                        {[...Array(4)].map((_, index) => (
                            <div
                                key={index}
                                className={`h-14 flex items-center justify-between p-4 animate-pulse ${
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
                        <div className="h-3 bg-gray-300 rounded-full w-24 animate-pulse"></div>
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
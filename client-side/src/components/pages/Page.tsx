import { Outlet } from "react-router-dom";

function Page() {
    return (
        <div>
            <header>titulo</header>
            <Outlet></Outlet>
        </div>
        
    )
}

export default Page;
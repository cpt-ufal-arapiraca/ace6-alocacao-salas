import { Outlet } from "react-router-dom";
import React from "react";
import SideBar from "../utils/SideBar";

function Page() {
  const [toggled, setToggled] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(window.matchMedia('(max-width: 800px)').matches);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia('(max-width: 800px)').matches);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ display: 'flex', height: '100dvh', minHeight: '400px' }}>
      <SideBar toggled={toggled} setToggled={setToggled} isMobile={isMobile} />
      <main className="sm:overflow-y-auto" style={{ flex: 1}}>
        {isMobile && (
          <button className="mt-5 ms-7 mb-0" onClick={() => setToggled(!toggled)}>
            {toggled ? (<i className="fi fi-rr-cross"></i>) : (<i className="fi fi-rr-menu-burger"></i>)}
          </button>
        )}
        <section>
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default Page;

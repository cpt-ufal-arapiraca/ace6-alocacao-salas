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
      <main style={{ flex: 1, padding: 10 }}>
        {isMobile && (
          <button className="sb-button" onClick={() => setToggled(!toggled)}>
            {toggled ? 'Fechar menu' : 'Abrir menu'}
          </button>
        )}
        <section className="mt-4">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default Page;

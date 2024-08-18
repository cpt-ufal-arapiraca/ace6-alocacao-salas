import { Outlet } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import React from "react";

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
      <Sidebar
        toggled={toggled}
        breakPoint="md"
        onBackdropClick={() => setToggled(false)}
      >
        <Menu>
            <p className="flex justify-end" onClick={() => setToggled(!toggled)}>fechar</p>
          <MenuItem> Documentation</MenuItem>
          <MenuItem> Calendar</MenuItem>
          <MenuItem> E-commerce</MenuItem>
          <MenuItem> Examples</MenuItem>
        </Menu>
      </Sidebar>
      <main style={{ flex: 1, padding: 10 }}>
        {isMobile && (
          <button className="sb-button" onClick={() => setToggled(!toggled)}>
            {toggled ? 'Close Sidebar' : 'Open Sidebar'}
          </button>
        )}
        <Outlet />
      </main>
    </div>
  );
}

export default Page;

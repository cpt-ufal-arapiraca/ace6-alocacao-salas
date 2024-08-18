import { Sidebar, Menu, MenuItem, SubMenu, menuClasses } from 'react-pro-sidebar';

function SideBar({ toggled, setToggled, isMobile }: { toggled: boolean; setToggled: React.Dispatch<React.SetStateAction<boolean>>; isMobile: boolean }) {
  return (
   <Sidebar
      backgroundColor="#0095DA" 
      toggled={toggled}
      breakPoint="md"
      onBackdropClick={() => setToggled(false)}
    >
        {isMobile && (
          <p className="flex justify-end" onClick={() => setToggled(!toggled)}>Fechar</p>
        )}
      <div className='h-36 flex flex-col justify-center items-center'>
        <div className='h-16 w-16 rounded-full bg-slate-100'>

        </div>
        <p className='text-white text-xl mt-2'>Olá, <span className='font-bold'>Raquel</span></p>
      </div>
      <Menu
        menuItemStyles={{
          button: ({ level, active, disabled, open }) => {
            if (level === 0)
              return {
                color: disabled ? '#f5d9ff' : '#FFFFFF',
                backgroundColor: active ? '#00AEFF' : open ? '#092C4C' : undefined,
                '&:hover': {
                  backgroundColor: '#005f9e',
                },
              };
            if (level === 1)
              return {
                color: '#FFFFFF',
                '&:hover': {
                  backgroundColor: '#00AEFF',
                },
              };
          },
        }}
      >
        <SubMenu 
          label="Charts"
          rootStyles={{
            ['& > .' + menuClasses.button]: {
              backgroundColor: '#0095DA',
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: '#005f9e',
              },
            },
            ['.' + menuClasses.subMenuContent]: {
              color: '#FFFFFF',
              backgroundColor: '#0095DA',
            },
            ['&.pro-menu-item-active']: {
              backgroundColor: '#FFFFFF', // Cor quando o SubMenu está ativo
            }
          }}
        >
          <MenuItem> Pie charts</MenuItem>
          <MenuItem active> Line charts</MenuItem>
          <MenuItem> Bar charts</MenuItem>
        </SubMenu>
        <MenuItem>Calendar</MenuItem>
        <MenuItem active>E-commerce</MenuItem>
        <MenuItem>Examples</MenuItem>
      </Menu>
    </Sidebar>
  );
}

export default SideBar;

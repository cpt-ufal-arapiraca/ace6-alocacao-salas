import React, { useState, useEffect } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu, menuClasses } from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';

interface BorderProps {
  width?: string,
}

function Border({width = 'w-10/12'}: BorderProps){
  return (
    <div className='flex justify-center'>
      <p className={`border-b-2 border-border_sidebar ${width}`}></p>
    </div>
  )
}

function SideBar({ toggled, setToggled, isMobile }: { toggled: boolean; setToggled: React.Dispatch<React.SetStateAction<boolean>>; isMobile: boolean }) {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const path = location.pathname;
    
    if (path.startsWith('/inicio')) {
      setActiveMenu('inicio');
    } else if (path.startsWith('/cadastrar-usuario')) {
      setActiveMenu('cadastrar_usuario');
    } else if (path.startsWith('/ver-usuarios')) {
      setActiveMenu('ver_usuarios');
    } else if (path.startsWith('/adicionar-sala')) {
      setActiveMenu('adicionar_sala');
    } else if (path.startsWith('/ver-salas')) {
      setActiveMenu('ver_salas');
    } else if (path.startsWith('/cadastrar-disciplina')) {
      setActiveMenu('cadastrar_disciplina');
    } else if (path.startsWith('/ver-disciplinas')) {
      setActiveMenu('ver_disciplinas');
    } else if (path.startsWith('/cadastrar-professor')) {
      setActiveMenu('cadastrar_professor');
    } else if (path.startsWith('/ver-professores')) {
      setActiveMenu('ver_professores');
    } else if (path.startsWith('/cadastrar-turma')) {
      setActiveMenu('cadastrar_turma');
    } else if (path.startsWith('/ver-turmas')) {
      setActiveMenu('ver_turmas');
    } else if (path.startsWith('/sair')) {
      setActiveMenu('sair');
    }
  }, [location]);

  return (
   <Sidebar
      backgroundColor="#0095DA" 
      toggled={toggled}
      breakPoint="md"
      onBackdropClick={() => setToggled(false)}
    >
        {isMobile && (
          <p className="flex justify-end p-2 text-white" onClick={() => setToggled(!toggled)}>{<i className="fi fi-rr-cross"></i>}</p>
        )}
      <div className='h-44 flex flex-col justify-center items-center'>
        <div className='h-20 w-20 rounded-full bg-slate-100'>
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
                  backgroundColor: '#1C79A5',
                },
              };
            if (level === 1)
              return {
                color: disabled ? '#f5d9ff' : '#FFFFFF',
                backgroundColor: active ? '#00AEFF' : open ? '#092C4C' : undefined,
                '&:hover': {
                  backgroundColor: '#1C79A5',
                },
              };
          },
        }}
      >
        <MenuItem 
          active={activeMenu === 'inicio'} 
          onClick={() => setActiveMenu('inicio')}
          component={<Link to="/inicio" />} >
          Início
        </MenuItem>
        <Border/>
        <SubMenu 
          open={activeMenu == 'cadastrar_usuario' || undefined}
          label="Usuário"
          rootStyles={{
            ['.' + menuClasses.subMenuContent]: {
              backgroundColor: '#0095DA',
            },
          }}
        >
          <MenuItem 
            active={activeMenu === 'cadastrar_usuario'} 
            onClick={() => setActiveMenu('cadastrar_usuario')}
            component={<Link to="/cadastrar-usuario" />} 
          > 
            Cadastrar usuário
          </MenuItem>
          <Border width='w-9/12'/>
          <MenuItem 
            active={activeMenu === 'ver_usuarios'} 
            onClick={() => setActiveMenu('ver_usuarios')}
            component={<Link to="/ver-usuarios" />} 
          > 
            Ver usuários
          </MenuItem>
        </SubMenu>
        <Border/>
        <SubMenu 
          label="Sala"
          rootStyles={{
            ['.' + menuClasses.subMenuContent]: {
              backgroundColor: '#0095DA',
            },
          }}
        >
          <MenuItem 
            active={activeMenu === 'adicionar_sala'} 
            onClick={() => setActiveMenu('adicionar_sala')}
            component={<Link to="/adicionar-sala" />}
          > 
            Adicionar sala
          </MenuItem>
          <Border width='w-9/12'/>
          <MenuItem 
            active={activeMenu === 'ver_salas'} 
            onClick={() => setActiveMenu('ver_salas')}
            component={<Link to="/ver-salas" />}
          > 
            Ver salas
          </MenuItem>
        </SubMenu>
        <Border/>
        <SubMenu 
          label="Disciplina"
          rootStyles={{
            ['.' + menuClasses.subMenuContent]: {
              backgroundColor: '#0095DA',
            },
          }}
        >
          <MenuItem 
            active={activeMenu === 'cadastrar_disciplina'} 
            onClick={() => setActiveMenu('cadastrar_disciplina')}
            component={<Link to="/cadastrar-disciplina" />}
          > 
            Cadastrar disciplina
          </MenuItem>
          <Border width='w-9/12'/>
          <MenuItem 
            active={activeMenu === 'ver_disciplinas'} 
            onClick={() => setActiveMenu('ver_disciplinas')}
            component={<Link to="/ver-disciplinas" />}
          > 
            Ver disciplinas
          </MenuItem>
        </SubMenu>
        <Border/>
        <SubMenu 
          label="Professor"
          rootStyles={{
            ['.' + menuClasses.subMenuContent]: {
              backgroundColor: '#0095DA',
            },
          }}
        >
          <MenuItem 
            active={activeMenu === 'cadastrar_professor'} 
            onClick={() => setActiveMenu('cadastrar_professor')}
            component={<Link to="/cadastrar-professor" />}
          > 
            Cadastrar professor
          </MenuItem>
          <Border width='w-9/12'/>
          <MenuItem 
            active={activeMenu === 'ver_professores'} 
            onClick={() => setActiveMenu('ver_professores')}
            component={<Link to="/ver-professores" />}
          > 
            Ver professores
          </MenuItem>
        </SubMenu>
        <Border/>
        <SubMenu 
          label="Turma"
          rootStyles={{
            ['.' + menuClasses.subMenuContent]: {
              backgroundColor: '#0095DA',
            },
          }}
        >
          <MenuItem 
            active={activeMenu === 'cadastrar_turma'} 
            onClick={() => setActiveMenu('cadastrar_turma')}
            component={<Link to="/cadastrar-turma" />}
          > 
            Cadastrar turma
          </MenuItem>
          <Border width='w-9/12'/>
          <MenuItem 
            active={activeMenu === 'ver_turmas'} 
            onClick={() => setActiveMenu('ver_turmas')}
            component={<Link to="/ver-turmas" />}
          > 
            Ver turmas
          </MenuItem>
        </SubMenu>
        <Border/>
        <MenuItem 
          active={activeMenu === 'sair'} 
          onClick={() => setActiveMenu('sair')}>
          Sair
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}

export default SideBar;

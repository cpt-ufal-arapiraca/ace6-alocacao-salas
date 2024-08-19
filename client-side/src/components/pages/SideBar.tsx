import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu, menuClasses } from 'react-pro-sidebar';

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
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

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
          onClick={() => setActiveMenu('inicio')}>
          Início
        </MenuItem>
        <Border/>
        <SubMenu 
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
          > 
            Cadastrar usuário
          </MenuItem>
          <Border width='w-9/12'/>
          <MenuItem 
            active={activeMenu === 'ver_usuarios'} 
            onClick={() => setActiveMenu('ver_usuarios')}
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
          > 
            Adicionar sala
          </MenuItem>
          <Border width='w-9/12'/>
          <MenuItem 
            active={activeMenu === 'ver_salas'} 
            onClick={() => setActiveMenu('ver_salas')}
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
          > 
            Cadastrar diciplina
          </MenuItem>
          <Border width='w-9/12'/>
          <MenuItem 
            active={activeMenu === 'ver_disciplinas'} 
            onClick={() => setActiveMenu('ver_disciplinas')}
          > 
            Ver diciplinas
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
          > 
            Cadastrar professor
          </MenuItem>
          <Border width='w-9/12'/>
          <MenuItem 
            active={activeMenu === 'ver_professores'} 
            onClick={() => setActiveMenu('ver_professores')}
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
          > 
            Cadastrar turma
          </MenuItem>
          <Border width='w-9/12'/>
          <MenuItem 
            active={activeMenu === 'ver_turmas'} 
            onClick={() => setActiveMenu('ver_turmas')}
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

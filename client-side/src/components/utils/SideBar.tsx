import React, { useState, useEffect } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu, menuClasses } from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';
import Modal from './Modal';

interface BorderProps {
  width?: string,
}

function Border({ width = 'w-10/12' }: BorderProps) {
  return (
    <div className='flex justify-center'>
      <p className={`border-b-2 border-border_sidebar ${width}`}></p>
    </div>
  )
}

function SideBar({ toggled, setToggled, isMobile }: { toggled: boolean; setToggled: React.Dispatch<React.SetStateAction<boolean>>; isMobile: boolean }) {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
    if (isMobile) {
      setToggled(false);
    }
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
  };

  return (
    <>
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
              if (level === 0 || level === 1) {
                return {
                  color: disabled ? '#f5d9ff' : '#FFFFFF',
                  backgroundColor: active ? '#00AEFF' : open ? '#0074AA' : undefined,
                  '&:hover': {
                    backgroundColor: active ? '#00AEFF' : 'rgba(11, 174, 250, 0.4)',
                  },
                };
              }
            },
          }}
        >
          <MenuItem
            active={activeMenu === 'inicio'}
            onClick={() => handleMenuClick('inicio')}
            component={<Link to="/inicio" />} >
            <i className="fi fi-rr-home pe-2 "></i>Início
          </MenuItem>
          <Border />
          <SubMenu
            open={activeMenu === 'cadastrar_usuario' || activeMenu === 'ver_usuarios' || undefined}
            label="Usuário"
            icon={<i className="fi fi-rr-user"></i>}
            rootStyles={{
              ['.' + menuClasses.subMenuContent]: {
                backgroundColor: '#0089C8',
              },
            }}
          >
            <MenuItem
              active={activeMenu === 'cadastrar_usuario'}
              onClick={() => handleMenuClick('cadastrar_usuario')}
              component={<Link to="/cadastrar-usuario" />}
            >
              <i className="fi fi-rr-user-add pe-2"></i>Cadastrar usuário
            </MenuItem>
            <Border width='w-9/12' />
            <MenuItem
              active={activeMenu === 'ver_usuarios'}
              onClick={() => handleMenuClick('ver_usuarios')}
              component={<Link to="/ver-usuarios" />}
            >
              <i className="fi fi-rr-users pe-2"></i>Ver usuários
            </MenuItem>
          </SubMenu>
          <Border />
          <SubMenu
            open={activeMenu === 'adicionar_sala' || activeMenu === 'ver_salas' || undefined}
            label="Sala"

            icon={<i className="fi fi-rr-apps"></i>}

            rootStyles={{
              ['.' + menuClasses.subMenuContent]: {
                backgroundColor: '#0089C8',
              },
            }}
          >
            <MenuItem
              active={activeMenu === 'adicionar_sala'}
              onClick={() => handleMenuClick('adicionar_sala')}
              component={<Link to="/adicionar-sala" />}
            >
              <i className="fi fi-rr-apps-add pe-2"></i>Adicionar sala
            </MenuItem>
            <Border width='w-9/12' />
            <MenuItem
              active={activeMenu === 'ver_salas'}
              onClick={() => handleMenuClick('ver_salas')}
              component={<Link to="/ver-salas" />}
            >
              <i className="fi fi-rr-category pe-2"></i>Ver salas 
            </MenuItem>
          </SubMenu>
          <Border />
          <SubMenu
            open={activeMenu === 'cadastrar_disciplina' || activeMenu === 'ver_disciplinas' || undefined}
            label="Disciplina"
            icon={<i className="fi fi-rr-copy"></i>} 
          
            rootStyles={{
              ['.' + menuClasses.subMenuContent]: {
                backgroundColor: '#0089C8',
              },
            }}
          >
            <MenuItem
              active={activeMenu === 'cadastrar_disciplina'}
              onClick={() => handleMenuClick('cadastrar_disciplina')}
              component={<Link to="/cadastrar-disciplina" />}
            >
              <i className="fi fi-rr-apps-add pe-2"></i>Cadastrar disciplina
            </MenuItem>
            <Border width='w-9/12' />
            <MenuItem
              active={activeMenu === 'ver_disciplinas'}
              onClick={() => handleMenuClick('ver_disciplinas')}
              component={<Link to="/ver-disciplinas" />}
            >
              <i className="fi fi-rr-copy pe-2"></i>Ver disciplinas
            </MenuItem>
          </SubMenu>
          <Border />
          <SubMenu
            open={activeMenu === 'cadastrar_turma' || activeMenu === 'ver_turmas' || undefined}
            label="Turma"
            icon={<i className="fi fi-rr-clock"></i>}
            rootStyles={{
              ['.' + menuClasses.subMenuContent]: {
                backgroundColor: '#0089C8',
              },
            }}
          >
            <MenuItem
              active={activeMenu === 'cadastrar_turma'}
              onClick={() => handleMenuClick('cadastrar_turma')}
              component={<Link to="/cadastrar-turma" />}
            >
              <i className="fi fi-rr-time-add pe-2"></i>Cadastrar turma
            </MenuItem>
            <Border width='w-9/12' />
            <MenuItem
              active={activeMenu === 'ver_turmas'}
              onClick={() => handleMenuClick('ver_turmas')}
              component={<Link to="/ver-turmas" />}
            >
              <i className="fi fi-rr-time-fast pe-2"></i>Ver turmas
            </MenuItem>
          </SubMenu>
          <Border />
          <MenuItem
            active={activeMenu === 'sair'}
            onClick={() => [setIsModalOpen(true), setToggled(false)]}
          >
            <i className="pe-2 fi fi-rr-exit"></i>Sair
          </MenuItem>
        </Menu>
      </Sidebar>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => setIsModalOpen(false)}
        title="Tem certeza?"
        content="Essa ação removerá o usuário do sistema. Essa ação não é reversível."
        confirmText="Sim, deletar"
        cancelText="Cancelar"
      />
    </>
  );
}

export default SideBar;

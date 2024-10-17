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
          <MenuItem
            active={activeMenu === 'ver_usuarios'}
            onClick={() => handleMenuClick('ver_usuarios')}
            component={<Link to="/ver-usuarios" />} >
            <i className="fi fi-rr-user pe-2 "></i>Usuário
          </MenuItem>
          <MenuItem
            active={activeMenu === 'ver_salas'}
            onClick={() => handleMenuClick('ver_salas')}
            component={<Link to="/ver-salas" />} >
              <div className='flex columns-lg items-center'> 
              <svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.6666 0.562377C10.6666 0.194669 10.4699 0.000277306 10.0981 0.000277306C6.92147 0 3.7451 0 0.568735 0C0.193023 0 0.00279339 0.189955 0.00279339 0.564318V3.28552C0.00251405 6.69278 0.00251405 9.10701 0 12.5722C0 12.8412 0.118161 13.0253 0.361744 13.1354C1.87884 13.8201 3.42023 14.5189 4.91079 15.1944C5.44879 15.4382 5.9868 15.6819 6.52481 15.9257C6.64437 15.9798 6.74632 16 6.83152 16C6.94046 16 7.02287 15.967 7.08069 15.9301C7.18489 15.8636 7.30947 15.7208 7.30947 15.4188C7.30947 14.8747 7.30947 14.3309 7.30947 13.7868V13.1368H8.06872C8.74192 13.1368 9.41513 13.1368 10.0881 13.1363C10.4769 13.136 10.666 12.9507 10.666 12.5703C10.6663 8.19772 10.666 4.93466 10.666 0.562099L10.6666 0.562377ZM6.91113 2.86429C5.67115 2.30774 4.41244 1.73649 3.19536 1.18382C3.03809 1.11255 2.88111 1.04101 2.72384 0.969739H9.70313V12.1823H7.31003V10.3263C7.30975 7.72159 7.30919 6.13734 7.31338 3.48823C7.31394 3.18597 7.186 2.98769 6.91113 2.86429ZM0.955899 2.53458V1.21682L2.11153 1.74037C3.49845 2.36875 4.93257 3.01875 6.34408 3.65572C6.34631 3.65683 6.34854 3.65767 6.3505 3.65878C6.3505 3.66072 6.3505 3.66266 6.3505 3.66488C6.34854 6.98395 6.34854 9.24926 6.34827 12.5126V14.7993L5.19599 14.2771C3.8127 13.6501 2.38221 13.0015 0.974056 12.3659C0.964838 12.3617 0.958134 12.3581 0.953664 12.3556C0.953385 12.3512 0.952826 12.3451 0.952826 12.3371C0.95562 8.69992 0.95562 6.11099 0.95562 2.53458H0.955899Z" fill="white"/>
              </svg>
              <div className='ps-2'>Sala</div>
              </div>
          </MenuItem>
          <MenuItem
            active={activeMenu === 'ver_disciplinas'}
            onClick={() => handleMenuClick('ver_disciplinas')}
            component={<Link to="/ver-disciplinas" />} >
              <div className='flex columns-lg items-center'>
              <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.9241 0H1.82069C1.33781 0 0.874713 0.210714 0.533268 0.585786C0.191822 0.960859 0 1.46957 0 2V14C0 14.5304 0.191822 15.0391 0.533268 15.4142C0.874713 15.7893 1.33781 16 1.82069 16H12.1379V1.33333C12.1379 0.979711 12.01 0.640573 11.7824 0.390524C11.5548 0.140476 11.2461 0 10.9241 0V0ZM10.9241 12H3.64138V1.33333H10.9241V12ZM1.82069 1.33333H2.42759V12H1.83101C1.62025 12.002 1.41141 12.0442 1.21379 12.1247V2C1.21379 1.82319 1.27773 1.65362 1.39155 1.5286C1.50536 1.40357 1.65973 1.33333 1.82069 1.33333ZM1.82069 14.6667C1.66057 14.6667 1.50693 14.5972 1.39326 14.4733C1.27958 14.3494 1.21507 14.1812 1.21379 14.0053H1.2229C1.22226 13.9173 1.23748 13.8301 1.26769 13.7486C1.29791 13.6671 1.34251 13.5929 1.39893 13.5305C1.45535 13.468 1.52247 13.4184 1.59642 13.3846C1.67037 13.3507 1.74968 13.3333 1.82979 13.3333H10.9241V14.6667H1.82069Z" fill="white"/>
                </svg>
                <div className='ps-2'>Disciplina</div>
              </div>
          </MenuItem>
          <MenuItem
            active={activeMenu === 'ver_turmas'}
            onClick={() => handleMenuClick('ver_turmas')}
            component={<Link to="/ver-turmas" />} >
            <i className="fi fi-rr-users-alt pe-2 "></i>Turma
          </MenuItem>
          <Border />
          <MenuItem
            active={activeMenu === 'sair'}
            onClick={() => [setIsModalOpen(true), setToggled(false)]}
          >
            <i className="pe-2 fi fi-rr-exit"></i>Sair
          </MenuItem>
        </Menu>
        <div className="absolute bottom-0 left-0 w-full p-2">
          <p className='text-xs font-light text-gray2'>Todos os direitos reservados ©</p>
        </div>
      </Sidebar>
      
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => handleConfirm()}
        title="Tem certeza?"
        content="Essa ação desloga o usuário do sistema"
        confirmText="Sim, sair"
        cancelText="Cancelar"
      />
    </>
  );
}

export default SideBar;

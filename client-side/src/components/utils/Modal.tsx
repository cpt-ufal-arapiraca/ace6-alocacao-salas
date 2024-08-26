import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
}

const Modal = ({ isOpen, onClose, title, content, confirmText, cancelText, onConfirm }: ModalProps) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out">
      <div className="bg-black opacity-50 fixed inset-0" onClick={onClose}></div>
      <div className="bg-white h-96 grid content-between flex-col p-6 rounded shadow-2xl border max-w-sm w-full transform transition-transform duration-300 ease-in-out scale-95">
        <div className='flex justify-end'>
          <i onClick={onClose} className="cursor-pointer fi fi-rr-cross text-text_title"></i>
        </div>
        <div className='flex justify-center'>
          <div className='h-20 w-20 bg-bg_red_secondary rounded-full flex items-center justify-center'>
            <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M26.6699 7.5C28.5944 4.16667 33.4056 4.16667 35.3301 7.5L53.5167 39C55.4412 42.3333 53.0355 46.5 49.1865 46.5H12.8135C8.96446 46.5 6.55884 42.3333 8.48334 39L26.6699 7.5Z" fill="#ED1C24"/>
              <circle cx="31" cy="38" r="2" fill="white"/>
              <line x1="31" y1="15" x2="31" y2="31" stroke="white" strokeWidth="4" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
        <div>
          <h2 className="text-2xl text-center text-button_red font-semibold mb-4">{title}</h2>
          <div className="mb-4 text-text_title">{content}</div>
        </div>
        <div className='flex justify-between'>
          {onConfirm && (
            <button
              onClick={onConfirm}
              className="bg-button_red text-white font-medium rounded-lg text-sm px-5 py-2.5"
            >
              {confirmText}
            </button>
          )}
          <button onClick={onClose}
            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-bold text-button_red rounded-lg group bg-gradient-to-br from-button_red to-button_red hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-bg_red_secondary dark:focus:ring-red-800">
            <span className="relative px-5 py-2.5 font-medium rounded-lg text-sm transition-all ease-in duration-75 bg-white dark:bg-gray-900 group-hover:bg-opacity-0">
              {cancelText}
            </span>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
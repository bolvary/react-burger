import React, { FC, useEffect, useCallback, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import ModalOverlay from './components/ModalOverlay';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import modalStyles from './Modal.module.css';

const modalRoot = document.getElementById("react-modals") as HTMLElement;;

type TModal = {
  children: ReactNode;
  title?: string;
  onClose: () => void;
};

const Modal: FC<TModal> = ({children, title="", onClose}) => { 
  const handleEsc =  useCallback((e) => {
    if (e.keyCode === 27 || e.key === 'Escape') { onClose() }
  }, [onClose]);
  
  useEffect(() => {
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [handleEsc]);

  return createPortal(
    (<div>
      <div id="modal" className={modalStyles.modal}>
        <header className={modalStyles.modalHeader}>
          <h1>{title}</h1>
          <button
            className={`${modalStyles.modalCloseButton}`}
            onClick={onClose}
          >
            <CloseIcon type="primary" />
          </button>
        </header>
          {children}
      </div>
      <ModalOverlay clickOverlay={onClose} />
    </div>), modalRoot
  );
}

export default Modal;

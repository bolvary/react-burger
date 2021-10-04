import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ModalOverlay from './components/ModalOverlay';
import modalStyles from './Modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("react-modals");

const Modal = ({children, title="", onClose}) => { 
  const handleEsc =  React.useCallback((e) => {
    if (e.keyCode === 27 || e.key === 'Escape') { onClose() }
  }, [onClose]);
  
  React.useEffect(() => {
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [handleEsc]);

  return ReactDOM.createPortal(
    (<div>
      <div className={modalStyles.modal}>
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

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Modal;

import React from 'react';
import PropTypes from 'prop-types';

import modalOverlayStyles from './ModalOverlay.module.css';

const ModalOverlay = ({clickOverlay}) => { 
    return(
       <div className={modalOverlayStyles.modalOverlay} onClick={clickOverlay}></div>
    )
}

ModalOverlay.propTypes = {
    clickOverlay: PropTypes.func.isRequired,
  };

export default ModalOverlay;


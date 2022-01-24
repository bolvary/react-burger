import { FC } from 'react';

import modalOverlayStyles from './ModalOverlay.module.css';

type TModalOverlay = {
  clickOverlay: () => void;
};

const ModalOverlay: FC<TModalOverlay> = ({clickOverlay}) => { 
    return(
       <div className={modalOverlayStyles.modalOverlay} onClick={clickOverlay}></div>
    )
}

export default ModalOverlay;

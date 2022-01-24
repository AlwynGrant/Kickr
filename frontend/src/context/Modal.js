import React from 'react';
import '../styles/modal.css'

const Modal = props => {
    if(!props.show) {
        return null
    }

    return (
        <div className='modal' onClick={props.onClose}>
            <div className='modal-content' onClick={e => e.stopPropagation() }>
                <div className='modal-header'>
                    <h4 className='modal-title'>Modal title</h4>
                </div>
                <div className='modal-body'>
                    This is modal content
                </div>
                <div className='modal-footer'>
                    <button onClick={props.onClose} className='button'>Close</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;

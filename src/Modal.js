import React from 'react'
import ReactDom from 'react-dom'

const MODAL_STYLES = {
    position:'fixed',top:'50%',left:'50%',transform:'translate(-50%, -50%)',padding:'10px',backgroundColor:'black', color:"white",zIndex:1000, height:'90%',width:'90%'
}
const OVERLAY_STYLE = {
    position:'fixed',top:'0',left:'0',backgroundColor:'black',zIndex:1000
}

const Modal = ({ children , onClose}) => {
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLE} />
        <div style={MODAL_STYLES} >
            <button onClick={onClose} className='bg-red-500 text-white font-bold px-4 py-1 fixed top-4 right-4'> CLOSE </button>
       
        {children}
        </div>
       
    </>,
    document.getElementById('cart-root')
  )
}

export default Modal

import { useState, useEffect, FC, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { IoCloseSharp } from 'react-icons/io5'

import './modal.css'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
  children: ReactNode
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, onSubmit, children }) => {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const root = document.createElement('div')
    document.body.appendChild(root)
    setModalRoot(root)

    return () => {
      document.body.removeChild(root)
    }
  }, [])

  if (!isOpen || !modalRoot) return null

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        <button onClick={onSubmit} className="modal-button">
          Enviar
        </button>
        <button onClick={onClose} className="modal-close-button">
          <IoCloseSharp />
        </button>
      </div>
    </div>,
    modalRoot
  )
}

export default Modal

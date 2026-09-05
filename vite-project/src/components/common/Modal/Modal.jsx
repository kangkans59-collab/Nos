import { useEffect } from 'react'
import './Modal.css'

function Modal({ open, title, onClose, children, footer }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose?.()
    }
    if (open) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-panel__header">
          <h3 className="modal-panel__title">{title}</h3>
          <button className="modal-panel__close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="modal-panel__body">{children}</div>
        {footer && <div className="modal-panel__footer">{footer}</div>}
      </div>
    </div>
  )
}

export default Modal

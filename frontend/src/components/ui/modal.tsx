import * as React from 'react'
import { cn } from '@/lib/utils'

export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title?: React.ReactNode; children: React.ReactNode }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className={cn('relative z-10 w-full max-w-lg rounded-md bg-white p-6')}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {title && <h3 id="modal-title" className="text-lg font-semibold mb-4">{title}</h3>}
        {children}
      </div>
    </div>
  )
}

export default Modal

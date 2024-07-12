import React, { ReactNode } from 'react';
import { Button } from './@/components/ui/button';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        {children}
        <Button onClick={onClose} className="mt-4">Close</Button>
      </div>
    </div>
  );
};

export default Modal;
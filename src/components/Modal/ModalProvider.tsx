'use client';

import React, { createContext, useState, ReactNode, useCallback } from 'react';
import { ModalContextType, ModalProps } from './types';
import Modal from './index';

export const ModalContext = createContext<ModalContextType | null>(null);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [props, setProps] = useState<ModalProps>({});

  const openModal = useCallback((props: ModalProps = {}) => {
    setProps(props);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => setIsOpen(false), [setIsOpen]);

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      <Modal {...props} />
    </ModalContext.Provider>
  );
};

export default ModalProvider;

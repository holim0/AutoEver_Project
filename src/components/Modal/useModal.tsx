import { useContext } from 'react';
import { ModalContextType } from './types';
import { ModalContext } from './ModalProvider';

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

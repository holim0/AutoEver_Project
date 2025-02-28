import { ReactNode } from 'react';

export interface ModalProps {
  content?: ReactNode;
  closeText?: string;
}

export interface ModalContextType {
  isOpen: boolean;
  openModal: (props: ModalProps) => void;
  closeModal: () => void;
}

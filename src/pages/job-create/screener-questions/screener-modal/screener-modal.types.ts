import { ModalProps } from 'src/components/templates/modal/modal.types';

export interface ScreenerModalProps extends Omit<ModalProps, 'children'> {
  onDone: () => void;
  onBack: () => void;
  onOpen: () => void;
}
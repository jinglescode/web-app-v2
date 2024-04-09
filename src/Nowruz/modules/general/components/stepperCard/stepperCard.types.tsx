import { ReactNode } from 'react';

export interface StepperCardProps {
  iconName?: string;
  customIcon?: ReactNode;
  img?: string;
  title?: string;
  subtitle?: string;
  supprtingText?: string;
  editable?: boolean;
  editFunc?: () => void;
  deletable?: boolean;
  deleteFunc?: () => void;
  description?: string;
  handleEdit?: () => void;
  handleDelete?: () => void;
  verified?: boolean;
  DisplayVerificationStatus?: boolean;
}

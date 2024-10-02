export interface WalletModalProps {
  open: boolean;
  handleClose: () => void;
  handleAccept: () => void;
  walletAddress?: string | null;
}

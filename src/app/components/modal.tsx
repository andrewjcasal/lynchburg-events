import {
  DialogContent,
  DialogTitle,
  ModalDialog,
  Stack,
  Modal as MuiModal,
} from "@mui/joy";

interface OpenProps {
  open: boolean;
  onClose: () => void;
  heading: string;
  subheading?: string;
  children: React.ReactNode;
}

export const Modal = ({
  open,
  onClose,
  heading,
  subheading,
  children,
}: OpenProps) => {
  return (
    <MuiModal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ModalDialog>
        <DialogTitle>{heading}</DialogTitle>
        {subheading && <DialogContent>{subheading}</DialogContent>}
        <form>
          <Stack spacing={2}>{children}</Stack>
        </form>
      </ModalDialog>
    </MuiModal>
  );
};

import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

export default function CustomAlert({
  width = 380,
  openModal,
  setOpenModal,
  onClose,
  children,
  removeCloseIcon,
}: {
  width?: number;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: Function;
  children: React.ReactNode;
  removeCloseIcon?: boolean;
}) {
  return (
    <Dialog
      open={openModal}
      onClose={() => {
        onClose?.();
        setOpenModal(false);
      }}
      sx={{
        borderRadius: 16,
        "& .MuiPaper-root": {
          margin: "12px",
          borderRadius: "12px",
          boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.16)",
        },
      }}
    >
      <DialogContent sx={{ width: '100%', maxWidth: `${width}px` }}>
        <div className="w-full flex justify-end">
          <IconButton
            onClick={() => {
              onClose?.();
              setOpenModal(false);
            }}
          >
            {!removeCloseIcon && <CloseIcon />}
          </IconButton>
        </div>
        {children}
      </DialogContent>
    </Dialog>
  );
}

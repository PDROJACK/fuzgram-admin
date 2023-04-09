import { Button } from "@mui/material";
import { MouseEventHandler } from "react";

export interface IPrimaryButton {
  text: string;
  endIcon?: React.ReactNode | null;
  startIcon?: React.ReactNode | null;
  onClick: MouseEventHandler;
}

const PrimaryButton = (children: IPrimaryButton) => {
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={children.startIcon}
      endIcon={children.endIcon}
      onClick={children.onClick}
      size="medium"
      style={{
        fontSize: 14,
        height: "32px",
      }}
    >
      {children.text}
    </Button>
  );
};

export default PrimaryButton;

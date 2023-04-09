import { Button } from "@mui/material";

function SecButton(children) {
  return (
    <Button
      variant="outlined"
      color="secondary"
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
}

export default SecButton;

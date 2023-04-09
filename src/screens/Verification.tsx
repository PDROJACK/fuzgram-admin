import { Grid } from "@mui/material";

const Verification = () => {
  return (
    <Grid
      container
      marginX={50}
      width={600}
      height={200}
      borderRadius={10}
      style={{
        boxShadow: "-6px 6px grey",
        borderRight: "5px",
        borderTop: "5px",
      }}
    >
      <Grid margin={4} item>
        <p>Dear User</p>
        <p>Thank you for signing up! To ensure the security of your account,</p>
        <p>we need to verify your email address.</p>
        <p>Please check you email</p>
      </Grid>
    </Grid>
  );
};

export default Verification;

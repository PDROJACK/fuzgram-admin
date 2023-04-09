import { FacebookAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { Button } from "@mui/material";
import { app } from "../app/firebasConfig";
import { Facebook } from "@material-ui/icons";

// @ts-nocheck
function FBLoginButton() {
  const handleClick = () => {
    const provider = new FacebookAuthProvider();
    provider.addScope("email");
    const auth = getAuth(app);

    signInWithPopup(auth, provider)
      .then((result) => {
        // Handle successful login
        console.log(result.user);
      })
      .catch((error) => {
        // Handle login error
        console.error(error);
      });
  };

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<Facebook />}
      fullWidth
      onClick={handleClick}
    >
      Sign In with Facebook
    </Button>
  );
}

export default FBLoginButton;

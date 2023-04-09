import { Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../app/firebasConfig";
import FBLoginButton from "./FBLoginButton";

const UserLoginSignUp = ({ type }) => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string | null>(null);

  const navigator = useNavigate();

  const signIn = () => {
    // Verify variables and Send Sign In request and save token in redux state
    console.log({ email, password });

    if (type === "login") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          console.log("Logged in");

          navigator("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorMessage);
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          // const user = userCredential.user;
          console.log("Sign in");

          // Send email verification email
          sendEmailVerification(auth.currentUser);

          // Take user to Email verification screen
          navigator("/verification");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorMessage);
        });
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          name="email"
          label="Email Address"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={signIn}
          fullWidth
        >
          {type === "login" ? "Sign In" : "Sign Up"}
        </Button>
      </Grid>
      <Grid item xs={12}>
        <FBLoginButton />
      </Grid>
      {error ? (
        <Grid item xs={12}>
          <p>{error}</p>
        </Grid>
      ) : null}
    </Grid>
  );
};

export default UserLoginSignUp;

import { Button } from "@mui/material";
import {
  INSTA_AUTH_REDIRECT_URL,
  INSTA_CLIENT_ID,
  INSTA_SCOPE,
} from "../app/constants";
import { Instagram } from "@material-ui/icons";

interface IFBLogin {
  client_id: string;
  scope: string;
  redirect_uri: string;
}

const FBLogin = (props: IFBLogin) => {
  const { client_id, scope, redirect_uri } = props;
  return (
    <a
      href={`https://api.instagram.com/oauth/authorize?client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}&response_type=code`}
    >
      Add Instagram
    </a>
  );
};

const InstagramLogin = () => {
  return (
    <Button variant="contained" color="success" startIcon={<Instagram />}>
      <FBLogin
        client_id={INSTA_CLIENT_ID}
        scope={INSTA_SCOPE}
        redirect_uri={INSTA_AUTH_REDIRECT_URL}
      />
    </Button>
  );
};

export default InstagramLogin;

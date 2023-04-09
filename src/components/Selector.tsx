import {
  Grid,
  Paper,
  Stack,
  styled,
  Typography,
  useTheme,
} from "@mui/material";

import InsertLinkIcon from "@material-ui/icons/InsertLink";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";

const Selector = (props: { setPage: Function; page: string }) => {
  const { setPage, page } = props;

  const theme = useTheme();

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body1,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    cursor: "pointer",
  }));

  return (
    <Grid
      container
      justifySelf={"center"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack direction="row" spacing={10}>
        <Item
          style={{
            color:
              page === "posts"
                ? theme.palette.text.primary
                : theme.palette.text.secondary,
            borderBottom: page === "posts" ? "3px solid black" : "",
          }}
          onClick={() => setPage("posts")}
          elevation={0}
        >
          <Grid container direction="row">
            <InsertPhotoIcon />
            <Typography>POSTS</Typography>
          </Grid>
        </Item>
        <Item
          style={{
            color:
              page === "links"
                ? theme.palette.text.primary
                : theme.palette.text.secondary,
            borderBottom: page === "links" ? "3px solid black" : "",
          }}
          onClick={() => setPage("links")}
          elevation={0}
        >
          <Grid container direction="row">
            <InsertLinkIcon />
            <Typography>LINKS</Typography>
          </Grid>
        </Item>
      </Stack>
    </Grid>
  );
};

export default Selector;

import { Grid, styled, Typography } from "@mui/material";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  borderRadius: "50%",
  height: "100",
  width: "100",
  // maxWidth: '100%',
  // maxHeight: '100%',
});

type Link = {
  website: string;
  url: string;
};

const linksdata: Link[] = [
  {
    website: "spotify",
    url: "www",
  },
  {
    website: "TikTok",
    url: "www",
  },
  {
    website: "Medium",
    url: "www",
  },
  {
    website: "Medium",
    url: "www",
  },
  {
    website: "Medium",
    url: "www",
  },
  {
    website: "Medium",
    url: "www",
  },
];

const LinkComponent = ({ website, url }: Link) => {
  return (
    <Grid
      onClick={() => console.log("hello")}
      style={{
        border: "2 solid black",
      }}
    >
      <Img src="https://via.placeholder.com/35" />
      {/* <Typography>{website}</Typography> */}
    </Grid>
  );
};

const User = () => {
  return (
    <Grid
      justifyContent="center"
      style={{
        marginTop: 50,
      }}
      container
      md={12}
      sm={12}
      direction="row"
    >
      {/* Padding Grid
            <Grid lg={2} sm={0} md={0} xs={0}></Grid> */}

      <Grid
        justifyContent="center"
        style={{
          justifyContent: "space-evenly",
          marginTop: 50,
          marginBottom: 20,
        }}
        lg={8}
        container
        direction="row"
      >
        {/* Profile photo */}
        <Grid item>
          <Img src="https://via.placeholder.com/150" />
        </Grid>

        {/* User info */}
        <Grid
          container
          direction="column"
          style={{
            justifyContent: "space-evenly",
            paddingLeft: 10,
          }}
          lg={6}
        >
          <Grid item>
            <Typography variant="h5" component="h5">
              Priyadarshan Singh
            </Typography>
          </Grid>

          <Grid item>@pdrojack</Grid>

          <Grid item marginTop={1} marginBottom={1}>
            Most importantly, we hope people love the tool and find it useful.
            For me, it’s the most delightful thing to play with we’ve created so
            far. I find it to be creativity-enhancing, helpful for many
            different situations, and fun in a way I haven’t felt from
            technology in a while. But I also think it’s noteworthy for a few
            reasons:
          </Grid>

          <Grid container justifyItems="flex-start" direction="row">
            {linksdata.map((l: Link, i: number) => {
              return (
                <Grid key={i} item marginRight={2}>
                  <LinkComponent website={l.website} url={l.url} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>

      {/* Padding Grid */}
      {/* <Grid lg={2}></Grid> */}
    </Grid>
  );
};

export default User;

import { Box, Grid, Modal, Typography } from "@mui/material";
import {} from "@mui/styled-engine";
import {  flipModal, selectModal } from "./postSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { makeStyles } from "tss-react/mui";
import { Post } from "./postTypes";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type PostModalI = {
  post: Post | null;
};

const useStyles = makeStyles()((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "80%",
    maxHeight: "80%",
    overflowY: "auto",
  },
  imageContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  image: {
    width: 150,
    height: 150,
    margin: theme.spacing(1),
    objectFit: "cover",
  },
  captionContainer: {
    padding: theme.spacing(2),
  },
  links: {
    backgroundColor: "red",
    marginRight: "5px",
  },
}));

const PostModal = ({ post }: PostModalI) => {
  const modalState: boolean = useAppSelector(selectModal);
  const dispatch = useAppDispatch();
  const { classes } = useStyles();

  if (post === null) return null;

  return (
    <Modal
      open={modalState}
      onBackdropClick={() => dispatch(flipModal())}
      className={classes.modal}
    >
      <Box className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} className={classes.imageContainer}>
            {/* #TODO: REPLACE it with image/media url */}
            {post.media_type}
          </Grid>
          <Grid
            item
            container
            direction={"column"}
            xs={12}
            md={6}
            className={classes.captionContainer}
          >
            <Grid
              item
              container
              direction={"row"}
              alignContent={"space-evenly"}
              justifyContent={"flex-start"}
            >
              {/* #TODO : Replace it with links from post  */}
              <Grid className={classes.links}>link 1</Grid>
              <Grid className={classes.links}>link 2</Grid>
              <Grid className={classes.links}>link 3</Grid>
            </Grid>
            <Grid item>
              <Typography
                variant="body2"
                id="modal-modal-description"
                sx={{ mt: 2 }}
              >
                {post.caption}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default PostModal;

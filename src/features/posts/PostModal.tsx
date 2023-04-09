import { Box, Modal, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { Post, flipModal, selectModal, selectPosts } from "./postSlice";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const PostModal = () => {
  const posts: Post[] = useAppSelector(selectPosts);
  const modalState: boolean = useAppSelector(selectModal);
  const dispatch = useAppDispatch();

  return (
    <Modal
      open={modalState}
      onClose={() => dispatch(flipModal())}
      // onBackdropClick={()=>dispatch(flipModal())}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {posts[0].content}
        </Typography>
      </Box>
    </Modal>
  );
};

export default PostModal;

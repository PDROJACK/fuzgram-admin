import {
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  styled,
  useMediaQuery,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import PostModal from "./PostModal";
import { flipModal, selectPosts, sendInitialPostSetRequest } from "./postSlice";
import User from "../user/User";
import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { selectIntegrations, selectUser } from "../user/userSlice";
import { changeUserSelection, changePostSelection } from "../../utils/utils";
import BuildCircleTwoToneIcon from '@mui/icons-material/BuildCircleTwoTone';
import DoneOutlineTwoToneIcon from '@mui/icons-material/DoneOutlineTwoTone';
import { IUser } from "../user/userTypes";
import { Post } from "./postTypes";
import { IIntegration } from "../integrations/integrationTypes";
import { setSelectedComponent } from "../integrations/integrationSlice";


const Img = styled("img")({
  margin: "auto",
  display: "block",
  borderRadius: "50%",
  height: "100",
  width: "100",
});

const Posts = (props) => {

  const { selectedIntegration, selectedComponent } = props;

  const dispatch = useAppDispatch();
  
  const data = useAppSelector(selectPosts);

  const setselectedComponent = (comp) => {
    dispatch(setSelectedComponent(comp));
  }

  console.log(data);

  return (
    <Grid
      container
      justifyContent={"center"}
      alignContent={"center"}
      alignItems={"center"}
      xs={12}
      sm={12}
      md={12}
      lg={12}
    >
      <Grid
        onClick={() => {
          changeUserSelection(selectedIntegration, selectedComponent, setselectedComponent);
        }}
        container
        lg={8}
        md={8}
        sm={11}
        xs={12}
      >
        <User selectedIntegration={selectedIntegration}  selectedComponent={selectedComponent}/>
      </Grid>

      <Grid item lg={8} md={10} sm={12} xs={12}>
        <ImageList cols={3}>
          {data.map((item: Post, i) => (
            <ImageListItem
              key={i}
              onClick={() => {
                changePostSelection(item, selectedComponent, setselectedComponent);
                dispatch(flipModal());
              }}
              style={{
                backgroundColor: selectedComponent?.caption ? "red" : "white",
              }}
            >
              <img
                src={`${item.media_url}?w=150&fit=crop&auto=format`}
                srcSet={`${item.media_url}?w=150&fit=crop&auto=format&dpr=2 2x`}
                alt={item.caption}
                loading="lazy"
              /> 
              {/* { selectedComponent === item ?  */}
              <ImageListItemBar
                sx={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                    "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                }}
                position="top"
                actionIcon= { selectedComponent !== null && selectedComponent.id === item.id ? <BuildCircleTwoToneIcon sx={{ padding: 1, color: "white" }} /> : <DoneOutlineTwoToneIcon  sx={{ padding: 1, color: "white" }}/> }
                actionPosition="right"
              /> 
              {/* : null} */}
              
            </ImageListItem>
          ))}
        </ImageList>
      </Grid>
    </Grid>
  );
};

const PostHighLight = ({
  item,
  setselectedComponent,
}: {
  item: Post;
  setselectedComponent: Function;
}) => {
  const [highlight, setHighlight] = useState(false);

  return (
    <ImageListItem
      // key={i}
      onClick={() => {
        // setSelectedPost(item);
        setselectedComponent(item);
        // console.log(selectedComponent);
        console.log(item);
      }}
    >
      <img
        src={`${item.media_url}?w=150&fit=crop&auto=format`}
        srcSet={`${item.media_url}?w=150&fit=crop&auto=format&dpr=2 2x`}
        alt={item.caption}
        loading="lazy"
      />
      <ImageListItemBar title={item.caption} />
    </ImageListItem>
  );
};

export default Posts;

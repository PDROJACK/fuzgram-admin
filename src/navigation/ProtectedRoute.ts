import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../app/firebasConfig";
import { selectUser, sendInitialStateRequest } from "../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setIntegration, setSelectedComponent } from "../features/integrations/integrationSlice";
import { sendInitialPostSetRequest } from "../features/posts/postSlice";

export const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const navigator = useNavigate();
  const dispatch = useAppDispatch();
  const { integration } = useParams();
  const userState = useAppSelector(selectUser);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // #TODO: Fetch user details
        setUser(user);

        const token = await user.getIdToken();

        dispatch(sendInitialStateRequest(token));
      } else {
        setUser(null);
        navigator("/login");
      }
    });

    return () => {
      setUser(null);
    };
  }, []);

  if (user === null) {
    console.log("going to logout");
    navigator("/login");
    return null;
  }

  if (!user.emailVerified) {
    console.log("going to verification screen");
    navigator("/verification");
    return null;
  }

  if( integration !== null ){
    // set integration
    userState.integrations.forEach( i => {
      if(i.username === integration ){
        console.log(i);
        dispatch(setIntegration({integration : i}));
        dispatch(setSelectedComponent(null))
        dispatch(sendInitialPostSetRequest(integration))
      }
    })
  }

  return children;
};

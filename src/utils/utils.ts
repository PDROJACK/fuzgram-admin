import { IIntegration } from "../features/integrations/integrationTypes";
import { Post } from "../features/posts/postTypes";
import { IUser } from "../features/user/userTypes";

export const isIntegration = (obj: any): obj is IIntegration => {
    if(obj === null ||  obj === undefined) return false
    return 'bio' in obj;
}

export const isPost = (obj: any): obj is Post => {
    if(obj === null) return false
    return 'media_url' in obj;
}

export const changeUserSelection = (current : IIntegration | null, previous: IIntegration | Post | null, changeSelection: Function) => {
    
    // current -> user , previous -> post
        // selected -> user
    // current -> user , previous -> user
        // i. selected -> null

    // check if it is User
    if( previous === null) {
        changeSelection(current)
        return;
    }

    if(current._id === previous._id) {
        changeSelection(null)
        return;
    }

    changeSelection(current)
}

export const changePostSelection = (current : Post | null, previous: Post | IIntegration | null, changeSelection: Function) => {

    // current -> post , previous -> post 
        // i. post are same -> selected = null
        // ii. post are diff -> selected = current
    // current -> post , previous -> user
        // selected -> post

    // check if previous it is Post
    if( isPost(previous) && previous.id === current.id ) {
        changeSelection(null)
        return
    }

    changeSelection(current)
}
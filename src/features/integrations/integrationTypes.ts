import { Post } from "../posts/postTypes";

export type updateIntegrationType = {
    username: string,
    bio: string,
    links: Link[],
    profile: string,
}

export type Link = {
    name: string;
    url: string;
};
  
export type IIntegration = {
    _id?: string;
    uid?: string;
    social?: string;
    username?: string;
    bio?: string;
    links?: Link[];
    profile?: string;
    enabled?: boolean;
    selectedComponent?: IIntegration | Post
}

export type IupdateIntegration = {
    _id: string;
    uid: string;
    username: string;
    bio: string;
    links: Link[];
    profile?: string;
    enabled: boolean;
}
  
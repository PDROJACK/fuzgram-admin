export type PostLinks = {
  website: string;
  url: string;
};

export type Post = {
  _id: string;
  uid: string;
  id: string;
  caption: string;
  media_type: string;
  media_url: string;
  links?: PostLinks[];
};

export type IinitialStateType = {
  modal: boolean;
  posts: Post[];
};

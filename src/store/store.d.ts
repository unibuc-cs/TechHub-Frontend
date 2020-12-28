export type ActionWithPayload<TPayload> = {
  type: string;
  payload: TPayload;
};

export interface UserLoginInformation {
  accessToken: string;
  didRegister: boolean;
  currentUserEmail: string;
}

export interface CategoriesInformation {
  categories: CategoryCard[];
}

export interface ThreadInformation {
  id: string;
  ownerEmail: string;
  title: string;
  category: string;
  text: string;
  dateCreated: string;
  hasTrophy: boolean;
}

export interface PostInformation {
  id: string;
  userEmail: string;
  threadId: string;
  postNumber: number;
  text: string;
  dateCreated: string;
  hasTrophy: boolean;
  upvotes: string[];
  downvotes: string[];
}

export interface ThreadStateInformation {
  threads: ThreadInformation[];
}

export interface PostStateInformation {
  posts: PostInformation[];
}

export interface Store {
  user: UserLoginInformation;
  categories: CategoriesInformation;
  threads: ThreadStateInformation;
  posts: PostStateInformation;
}

export interface CategoryCard {
  title: string;
}

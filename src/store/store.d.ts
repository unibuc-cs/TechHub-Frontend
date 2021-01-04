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

export interface UserDetails {
  email: string;
  password: string;
  username: string;
  type: string;
  profilePicture: string;
  accountStatus: string;
  totalPoints: number;
  currentPoints: number;
  vipStatus: boolean;
  trophies: number;
}

export interface UserDetailsStateInformation {
  details: UserDetails;
}

export interface ThreadStateInformation {
  threads: ThreadInformation[];
}

export interface PostStateInformation {
  posts: PostInformation[];
}

export interface LeaderboardStateInformation {
  topUsers: UserDetails[];
}

export interface Store {
  user: UserLoginInformation;
  categories: CategoriesInformation;
  threads: ThreadStateInformation;
  posts: PostStateInformation;
  userDetails: UserDetailsStateInformation;
  leaderboard: LeaderboardStateInformation;
}

export interface CategoryCard {
  title: string;
}

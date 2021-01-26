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
  userImage: string;
  username: string;
  title: string;
  category: string;
  text: string;
  dateCreated: string;
  hasTrophy: boolean;
  vipStatus: boolean;
  isReported: boolean;
  accountStatus: string;
}

export interface PostInformation {
  id: string;
  userEmail: string;
  userImage: string;
  username: string;
  threadId: string;
  postNumber: number;
  text: string;
  dateCreated: string;
  hasTrophy: boolean;
  upvotes: string[];
  downvotes: string[];
  isReported: boolean;
  accountStatus: string;
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

export interface Discount {
  id: string;
  sellerEmail: string;
  title: string;
  description: string;
  pictures: string[];
  pointsCost: number;
  vipStatus: boolean;
}

export interface PurchasedDiscount {
  id: string;
  purchaserEmail: string;
  pointsSpent: number;
  discount: Discount;
  datePurchased: string;
}

export interface Report {
  id: string;
  reporterId: string;
  reportedItemId: string;
  description: string;
  reportType: string;
  dateReported: string;
  isResolved: boolean;
  isPostReport: boolean;
  threadInformation: ThreadInformation;
}

export interface ReportsStateInformation {
  reports: Report[];
  reportTypes: string[];
}

export interface PurchasedDiscountsStateInformation {
  purchasedDiscounts: PurchasedDiscount[];
}

export interface DiscountsStateInformation {
  discounts: Discount[];
}

export interface UserDetailsStateInformation {
  details: UserDetails;
}

export interface ThreadStateInformation {
  threads: ThreadInformation[];
}

export interface PostStateInformation {
  posts: PostInformation[];
  currentThreadHasTrophy: boolean;
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
  discounts: DiscountsStateInformation;
  purchasedDiscounts: PurchasedDiscountsStateInformation;
  reports: ReportsStateInformation;
}

export interface CategoryCard {
  title: string;
}

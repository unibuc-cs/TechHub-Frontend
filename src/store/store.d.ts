export type ActionWithPayload<TPayload> = {
  type: string;
  payload: TPayload;
};

export interface UserLoginInformation {
  accessToken: string;
  didRegister: boolean;
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
}

export interface ThreadStateInformation {
  threads: Thread[];
}

export interface Store {
  user: UserLoginInformation;
  categories: CategoriesInformation;
  threads: ThreadStateInformation;
}

export interface CategoryCard {
  title: string;
}

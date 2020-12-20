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

export interface Store {
  user: UserLoginInformation;
  categories: CategoriesInformation;
}

export interface CategoryCard {
  title: string;
}

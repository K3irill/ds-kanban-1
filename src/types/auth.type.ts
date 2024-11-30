export interface IUser {
  email: string;
}

export interface IUserData extends Pick<IUser, 'email'> {
  password: string;
}

interface IUserExist {
  token: string;
  refreshToken?: string;
  expire: number;
  userId: string;
  name: string;
  error?: { status: "failed" };
}
interface IUser {
  name?: string;
  email: string;
  password?: string;
}

export type { IUserExist, IUser };

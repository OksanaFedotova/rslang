interface IUserExist {
  token: string;
  refreshToken?: string;
  expire: number;
  userId: string;
  name: string;
}
interface IUser {
  name?: string;
  email: string;
  password?: string;
  error?: { status: "failed" };
  expire?: number;
}

export type { IUserExist, IUser };

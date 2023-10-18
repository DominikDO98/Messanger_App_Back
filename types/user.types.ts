export type TUser = {
    id: string;
    username: string;
    password: string;
}

export type TUserCreation = Omit<TUser, "id">


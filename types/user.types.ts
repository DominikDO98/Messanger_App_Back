export type TUser = {
    id: string;
    username: string;
    password: string;
}

export type TUserJWT = Omit<TUser, 'password'>
export type TUserCreation = Omit<TUser, "id">


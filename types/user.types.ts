export type TUser = {
    user_id: string;
    username: string;
    password: string;
}

export type TUserJWT = Omit<TUser, 'password'>
export type TUserCreation = Omit<TUser, "user_id">


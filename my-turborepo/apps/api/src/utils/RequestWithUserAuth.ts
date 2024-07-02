interface RequestWithUser {
    isAuth?: boolean;
    userId?: string;
    isAdmin?: boolean;
    get: CallableFunction
}

export default RequestWithUser;
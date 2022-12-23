export interface IUserContextProps {
    loggedUser: IUser | null;
    formError: string | null;
    handleLogin: (values: {email: string, password: string}) => void;
};

export interface IUser {
    user_id: string;
    displayName: string;
    email: string;
    profession: string;
    research_location: string;
    password: string;
};

export interface ILoginResponseObject {
    values: string | null;
    message: string;
};
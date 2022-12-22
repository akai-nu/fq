import { IUser } from "../interfaces/IUserContextProps";

export const ACTIONS = {
    SET_LOGGED_USER: "SET_LOGGED_USER",
};

export const UserReducer = (
    state: any,
    action: {
        type: string,
        loggedUser?: IUser,
    }
) => {
    switch (action.type) {
        case ACTIONS.SET_LOGGED_USER:
            return { ...state, loggedUser: action.loggedUser };

        default:
            return state;
    }
};
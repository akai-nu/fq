import { IUser } from "../interfaces/IUserContextProps";

export const ACTIONS = {
    SET_LOGGED_USER: "SET_LOGGED_USER",
    SET_FORM_ERROR: "SET_FORM_ERROR",
};

export const UserReducer = (
    state: any,
    action: {
        type: string,
        loggedUser?: IUser,
        formError?: string | null,
    }
) => {
    switch (action.type) {
        case ACTIONS.SET_LOGGED_USER:
            return { ...state, loggedUser: action.loggedUser };
        case ACTIONS.SET_FORM_ERROR:
            return { ...state, formError: action.formError };

        default:
            return state;
    }
};
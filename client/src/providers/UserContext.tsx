import { ReactNode, createContext, useContext, useReducer } from "react";
import { SettingsHelper } from "../helpers/SettingsHelper";
import { IUserContextProps } from "../interfaces/IUserContextProps";
import { UserReducer } from "../reducers/UserReducer";

type Props = {
    children: ReactNode;
};

const defaultState = SettingsHelper.user_context_default_values;

const UserContext = createContext<IUserContextProps>(defaultState);

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(UserReducer, defaultState);

    const _getLoggedUser = () => {
        
    };

    const propsValues = {
        loggedUser: state.loggedUser,
    };

    return (
        <UserContext.Provider value={propsValues}>
            {children}
        </UserContext.Provider>
    );
};
import { useAtom } from "jotai";
import { ReactNode, createContext, useContext, useReducer, useEffect } from "react";
import { userTokenAtom } from "../helpers/AtomHelper";
import { createUserToken } from "../helpers/QueryHelper";
import { SettingsHelper } from "../helpers/SettingsHelper";
import { ILoginResponseObject, IUserContextProps } from "../interfaces/IUserContextProps";
import { UserReducer, ACTIONS } from "../reducers/UserReducer";

type Props = {
    children: ReactNode;
};

const defaultState = SettingsHelper.user_context_default_values;

const UserContext = createContext<IUserContextProps>(defaultState);

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(UserReducer, defaultState);
    const [userToken, setUserToken] = useAtom(userTokenAtom);

    const handleLogin = (values: {email: string, password: string}) => {
        createUserToken(values).then((result: ILoginResponseObject | null) => {
            // console.log("~> createUserToken > RESULT", result);
            if (result) {
               const { values, message } = result;

               if (values) {
                    setUserToken(values);
                    dispatch({ type: ACTIONS.SET_FORM_ERROR, formError: null });

               } else {
                    dispatch({ type: ACTIONS.SET_FORM_ERROR, formError: message });
               }
            }
        });
    };

    useEffect(() => {
        console.log("~> UserContextProvider > userToken", userToken);
    }, [userToken]);

    const propsValues = {
        loggedUser: state.loggedUser,
        formError: state.formError,
        handleLogin
    };

    return (
        <UserContext.Provider value={propsValues}>
            {children}
        </UserContext.Provider>
    );
};
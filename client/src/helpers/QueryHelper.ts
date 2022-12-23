import { ILoginResponseObject } from "../interfaces/IUserContextProps";
import { SettingsHelper } from "./SettingsHelper";

export const createUserToken = async (values: {email: string, password: string}): Promise<ILoginResponseObject | null> => {
    try {
        const res = await fetch(SettingsHelper.api_login_endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values),
        });
        const data = await res.json();

        console.log('~> data', data)

        return data;

    } catch (error) {
        console.error(error);
        return null;
    }
};
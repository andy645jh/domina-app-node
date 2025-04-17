import { LoginMdl } from "../models/LoginMdl";
import { ResponseMdl } from "../models/ResponseMdl";
import { UserMdl } from "../models/UserMdl";
import { BASE_URL_USER } from "../utils/Constants";

export default class LoginService {
    static readonly makeLogin = async (credData: LoginMdl): Promise<ResponseMdl> => {
        try {
            const response = await fetch(BASE_URL_USER + 'users/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: credData.username,
                    password: credData.password,
                })
            });

            const json = await response.json();
            console.log("Result Login: ", json);
            return json;

        } catch (error) {
            console.error("Error: ", error);
            return { status: 'failed', message: String(error) };
        }
    }

    static readonly createUser = async (userData: UserMdl): Promise<ResponseMdl> => {
        try {
            const response = await fetch(BASE_URL_USER + 'users/', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            const json = await response.json();
            console.log("Result User: ", json);
            return json;

        } catch (error) {
            console.error("Error: ", error);
            return { status: 'failed', message: String(error) };
        }
    }
}
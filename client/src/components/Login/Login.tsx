import { useState } from "react";
import { useUserContext } from "../../providers/UserContext";
import CSS from "./style.module.css";

const Login = () => {
    const { formError, handleLogin } = useUserContext();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const _onClickLoginSubmit = () => {
        handleLogin({email, password});
        setEmail("");
        setPassword("");
    };

    return (
       <div className={CSS.login__form}>
            <div className={CSS.login__form__input}>
                <label>Email</label>
                <input type="text" value={email} onChange={(ev) => setEmail(ev.target.value)}/>
            </div>
            <div className={CSS.login__form__input}>
                <label>Password</label>
                <input type="text" value={password} onChange={(ev) => setPassword(ev.target.value)}/>
            </div>
            <div className={CSS.login__form__input}>
                <button onClick={_onClickLoginSubmit}>Submit</button>
            </div>

            {formError && <div className={CSS.login__form__error}>{formError}</div>}
       </div>
    );
};

export default Login;
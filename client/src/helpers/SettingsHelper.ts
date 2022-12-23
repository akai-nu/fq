export const SettingsHelper = {
    "user_context_default_values": {
        loggedUser: null,
        formError: null,
        handleLogin: (values: {email: string, password: string}) => {}
    },
    "api_login_endpoint": "http://localhost:5000/api/v2/auth/login",
};
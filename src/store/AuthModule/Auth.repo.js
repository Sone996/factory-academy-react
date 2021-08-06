import { api } from "../../api/api";
const ROUTES = {
    LOGIN: '/login',
    REGISTER: '/register',
    FETCH_ACCOUNT: '/user/session',
    LOGOUT: '/logout',
};

class AuthRepo {
    login(data) {
        return api.post(ROUTES.LOGIN, data)
    }

    register(data) {
        // return api.post(ROUTES.REGISTER, data);
    }

    fetchActiveAccount() {
        // return api.get(ROUTES.FETCH_ACCOUNT);
    }
    logout() {
        // return api.post(ROUTES.LOGOUT);
    }
}

export const authRepo = new AuthRepo();

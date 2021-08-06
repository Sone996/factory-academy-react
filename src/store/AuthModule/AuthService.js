import { authRepo } from "./Auth.repo";
import SHA512 from "crypto-js/sha512";
import { TOKEN_LS_NAME } from "../../constants/constants";

class AuthService {
    async login(data) {
        try {
            data.password = SHA512(data.password).toString();
            const res = await authRepo.login(data)
            //this.setLoggedUser(res.data)
			localStorage.setItem(TOKEN_LS_NAME, res.data['session-id']);
            console.log(res)
            return Promise.resolve(res);
        } catch (error) {
            return Promise.reject(error)
        }
        
        // return authRepo.login(data);
    }

    register(data) {
        //return authRepo.register(data);
    }

    fetchActiveAccount() {
        //return authRepo.fetchActiveAccount();
    }
    logout() {
        //return authRepo.logout();
    }
}

export const authService = new AuthService();
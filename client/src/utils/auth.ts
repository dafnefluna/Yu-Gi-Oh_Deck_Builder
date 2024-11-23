import { jwtDecode, JwtPayload } from "jwt-decode";

interface ExtendedJwt extends JwtPayload {
    data: {
        username: string,
        exp: number,
    }
};

class AuthService {
    getProfile() {
        return jwtDecode<ExtendedJwt>(this.getToken());
    }

    getUsername() {
        const token = this.getToken();
        console.log('Token:', token);  // Add this log for debugging
        if (!token) return null;
        
        const decoded = jwtDecode<ExtendedJwt>(token);
        console.log('Decoded JWT:', decoded);  // Add this log for debugging
        return decoded?.data?.username;
    }

    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    isTokenExpired(token: string) {
        try {
            const decoded = jwtDecode<JwtPayload>(token);

            if(decoded?.exp && decoded?.exp < Date.now() / 1000) {
                return true;
            }
        } catch (error) {
            return false;
        }
    }

    getToken(): string {
        const loggedUser = localStorage.getItem('id_token') || '';

        return loggedUser;
    }

    login(idToken: string) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/Profile');
    }

    logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/');
    }
}

export default new AuthService();
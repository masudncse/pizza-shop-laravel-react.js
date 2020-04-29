/**
 * Auth Service
 */
class AuthLibrary {
    /**
     *
     * @return {*}
     */
    logout = () => {
        localStorage.clear();
        sessionStorage.clear();
    };

    /**
     *
     * @return {*}
     */
    status = () => {
        return Boolean(localStorage.getItem('AUTH_EMAIL'));
    };

    /**
     *
     * @return {*}
     */
    email = () => {
        return localStorage.getItem('AUTH_EMAIL') || "";
    };
}

export default new AuthLibrary();

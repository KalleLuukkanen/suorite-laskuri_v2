import { authClient } from "../utils/auth.js";
import { browser } from "$app/environment";

let userState = $state({ loading: true, email: null });
let userStatePromise = null;

const getUserFromSession = () => {
    if (userStatePromise) {
        return;
    }

    userStatePromise = userStatePromise || authClient.getSession();
    userStatePromise.then((session) => {
        if (session?.data?.user?.email) {
            userState = session?.data?.user;
        } else {
            userState = { email: null, loading: false };
        }
    });
};

const logout = async () => {
    await authClient.signOut();
    window.location.href = "/kirjaudu"
}

const deleteAccount = async () => {
    await authClient.deleteUser();
    window.location.href = "/kirjaudu";
}

const useUserState = () => {
    if (!browser) {
        return { loading: true, email: null };
    } else if (!userState?.email) {
        getUserFromSession();
    }
    return {
        get loading() {
            return userState?.loading;
        },
        get email() {
            return userState?.email;
        },
    };
};

export { useUserState, logout, deleteAccount };
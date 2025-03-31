export const useAuth = () => {
    if (!document.cookie) {
        console.log("No cookie found");
        return;
    }

    const token = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("token="))
        ?.split("=")[1];

    if (token) {
        return token;
    }
};

export const getToken = () => {
  if (typeof document === "undefined" || !document.cookie) {
    console.log("No cookie found or not in browser");
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

export const getAdminToken = () => {
  if (typeof document === "undefined" || !document.cookie) {
    console.log("No admin cookie found or not in browser");
    return;
  }

  const token = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("admin-token="))
    ?.split("=")[1];

  if (token) {
    return token;
  }
};
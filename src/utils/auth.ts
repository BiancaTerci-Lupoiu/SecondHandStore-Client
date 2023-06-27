import { redirect } from "react-router";

export function getAuthToken() {
  const token = localStorage.getItem("token");
  const expires = parseInt(localStorage.getItem("expires") || "0");
  if (!token) {
    return "";
  }

  if (expires && new Date().getTime() > expires) {
    localStorage.removeItem("token");
    localStorage.removeItem("expires");
    return "";
  }
  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/login");
  }
}

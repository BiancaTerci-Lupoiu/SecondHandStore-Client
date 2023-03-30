import { redirect } from "react-router";

export function getAuthToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
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

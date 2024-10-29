import {
  LoginCredentials,
  LoginResponse,
  SignUpCredentials,
} from "../types/auth";

const API_URL = import.meta.env.VITE_API_URL;

export async function login({
  email,
  password,
}: LoginCredentials): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.msg);
  }

  return res.json();
}

export async function signUp({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
}: SignUpCredentials) {
  const res = await fetch(`${API_URL}/auth/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    return { success: false, errors: error.errors };
  }

  return { success: true, data: await res.json() };
}

export async function logout() {
  await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}

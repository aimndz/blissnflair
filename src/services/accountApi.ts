import { Account, AccountCreate } from "../types/account";

const API_URL = import.meta.env.VITE_API_URL;

//// GET ALL ACCOUNTS
export async function getAllAccounts() {
  const res = await fetch(`${API_URL}/account`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    return { success: false, errors: error.errors };
  }

  return { success: true, data: await res.json() };
}

//// GET ACCOUNT BY ID
export async function getAccountById(id: string) {
  const res = await fetch(`${API_URL}/account/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    return { success: false, errors: error.errors };
  }

  return { success: true, data: await res.json() };
}

//// CREATE ACCOUNT
export async function createAccount(account: AccountCreate) {
  const res = await fetch(`${API_URL}/account`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(account),
  });

  if (!res.ok) {
    const error = await res.json();
    return { success: false, errors: error.errors };
  }

  return { success: true, data: await res.json() };
}

//// UPDATE ACCOUNT
export async function updateAccount(id: string, account: Account) {
  const res = await fetch(`${API_URL}/account/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(account),
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    return { success: false, errors: error.errors };
  }

  return { success: true, data: await res.json() };
}

//// DELETE ACCOUNT
export async function deleteAccount(id: string) {
  const res = await fetch(`${API_URL}/account/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    return { success: false, errors: error.errors };
  }

  return { success: true, data: await res.json() };
}

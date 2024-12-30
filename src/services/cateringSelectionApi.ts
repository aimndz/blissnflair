import { Catering, CateringRequestData } from "../types/catering";

const API_URL = import.meta.env.VITE_API_URL;

//-------- Catering API --------//
// GET ALL CATERING OPTIONS
export async function getAllCatering() {
  const res = await fetch(`${API_URL}/catering-selection`, {
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

// GET CATERING OPTION BY ID
export async function getCateringById(id: string) {
  const res = await fetch(`${API_URL}/catering-selection/${id}`, {
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

// CREATE A NEW CATERING OPTION
export async function createCatering(catering: CateringRequestData) {
  const res = await fetch(`${API_URL}/catering-selection`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(catering),
  });

  if (!res.ok) {
    const error = await res.json();
    return { success: false, errors: error.errors };
  }

  return { success: true, data: await res.json() };
}

// UPDATE AN EXISTING CATERING OPTION
export async function updateCatering(id: string, catering: Catering) {
  const res = await fetch(`${API_URL}/catering-selection/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(catering),
  });

  if (!res.ok) {
    const error = await res.json();
    return { success: false, errors: error.errors };
  }

  return { success: true, data: await res.json() };
}

// DELETE A CATERING OPTION
export async function deleteCatering(id: string) {
  const res = await fetch(`${API_URL}/catering-selection/${id}`, {
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

  return { success: true, message: "Catering option deleted successfully" };
}

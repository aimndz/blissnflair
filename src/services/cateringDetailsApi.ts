import {
  AddOn,
  Inclusion,
  MainDish,
  MainDishPackage,
  SnackCorner,
} from "../types/catering";

const API_URL = import.meta.env.VITE_API_URL;

//-------- Main Dishes API --------//
// GET ALL MAIN DISHES
export async function getAllMainDishes() {
  const res = await fetch(`${API_URL}/catering-details/main-dishes`, {
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

// CREATE MAIN DISH
export async function createMainDish(mainDish: MainDish) {
  const res = await fetch(`${API_URL}/catering-details/main-dishes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(mainDish),
  });

  if (!res.ok) {
    const error = await res.json();
    return { success: false, errors: error.errors };
  }

  return { success: true, data: await res.json() };
}

// UPDATE MAIN DISH
export async function updateMainDish(id: string, mainDish: MainDish) {
  const res = await fetch(`${API_URL}/catering-details/main-dishes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(mainDish),
  });

  if (!res.ok) {
    const error = await res.json();
    return { success: false, errors: error.errors };
  }

  return { success: true, data: await res.json() };
}

// DELETE MAIN DISH
export async function deleteMainDish(id: string) {
  const res = await fetch(`${API_URL}/catering-details/main-dishes/${id}`, {
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

//-------- Snack Corner API --------//
// GET ALL SNACK CORNERS
export async function getAllSnackCorners() {
  const res = await fetch(`${API_URL}/catering-details/snack-corner`, {
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

// CREATE SNACK CORNER
export async function createSnackCorner(snackCorner: SnackCorner) {
  const res = await fetch(`${API_URL}/catering-details/snack-corner`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(snackCorner),
  });

  if (!res.ok) {
    const error = await res.json();
    return { success: false, errors: error.errors };
  }

  return { success: true, data: await res.json() };
}

// UPDATE SNACK CORNER
export async function updateSnackCorner(id: string, snackCorner: SnackCorner) {
  const res = await fetch(`${API_URL}/catering-details/snack-corner/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(snackCorner),
  });

  if (!res.ok) {
    const error = await res.json();
    return { success: false, errors: error.errors };
  }

  return { success: true, data: await res.json() };
}

// DELETE SNACK CORNER
export async function deleteSnackCorner(id: string) {
  const res = await fetch(`${API_URL}/catering-details/snack-corner/${id}`, {
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

//-------- Add-Ons API --------//
// GET ALL ADD-ONS
export async function getAllAddOns() {
  const res = await fetch(`${API_URL}/catering-details/add-ons`, {
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

// CREATE ADD-ON
export async function createAddOn(addOn: AddOn) {
  const res = await fetch(`${API_URL}/catering-details/add-ons`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(addOn),
  });

  if (!res.ok) {
    const error = await res.json();
    return { success: false, errors: error.errors };
  }

  return { success: true, data: await res.json() };
}

// UPDATE ADD-ON
export async function updateAddOn(id: string, addOn: AddOn) {
  const res = await fetch(`${API_URL}/catering-details/add-ons/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(addOn),
  });

  if (!res.ok) {
    const error = await res.json();
    return { success: false, errors: error.errors };
  }

  return { success: true, data: await res.json() };
}

// DELETE ADD-ON
export async function deleteAddOn(id: string) {
  const res = await fetch(`${API_URL}/catering-details/add-ons/${id}`, {
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

//-------- Packages API --------//
// GET ALL PACKAGES
export async function getAllPackages() {
  const res = await fetch(`${API_URL}/catering-details/packages`, {
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

// CREATE PACKAGE
export async function createPackage(packageData: MainDishPackage) {
  const res = await fetch(`${API_URL}/catering-details/packages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(packageData),
  });

  if (!res.ok) {
    const error = await res.json();
    return { success: false, errors: error.errors };
  }

  return { success: true, data: await res.json() };
}

// UPDATE PACKAGE
export async function updatePackage(id: string, packageData: MainDishPackage) {
  const res = await fetch(`${API_URL}/catering-details/packages/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(packageData),
  });

  if (!res.ok) {
    const error = await res.json();
    return { success: false, errors: error.errors };
  }

  return { success: true, data: await res.json() };
}

// DELETE PACKAGE
export async function deletePackage(id: string) {
  const res = await fetch(`${API_URL}/catering-details/packages/${id}`, {
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

//-------- Inclusions API --------//
// GET ALL INCLUSIONS
export async function getAllInclusions() {
  const res = await fetch(`${API_URL}/catering-details/inclusions`, {
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

// CREATE INCLUSION
export async function createInclusion(inclusion: Inclusion) {
  const res = await fetch(`${API_URL}/catering-details/inclusions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(inclusion),
  });

  if (!res.ok) {
    const error = await res.json();
    return { success: false, errors: error.errors };
  }

  return { success: true, data: await res.json() };
}

// UPDATE INCLUSION
export async function updateInclusion(id: string, inclusion: Inclusion) {
  const res = await fetch(`${API_URL}/catering-details/inclusions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(inclusion),
  });

  if (!res.ok) {
    const error = await res.json();
    return { success: false, errors: error.errors };
  }

  return { success: true, data: await res.json() };
}

// DELETE INCLUSION
export async function deleteInclusion(id: string) {
  const res = await fetch(`${API_URL}/catering-details/inclusions/${id}`, {
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

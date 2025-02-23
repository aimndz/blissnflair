const API_URL = import.meta.env.VITE_API_URL;

//// GET ALL EVENTS
export async function getAllEvents() {
  const res = await fetch(`${API_URL}/event`, {
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

//// GET EVENT BY ID
export async function getEventById(id: string) {
  const res = await fetch(`${API_URL}/event/${id}`, {
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

//// CREATE EVENT
export async function createEvent(event: FormData) {
  const res = await fetch(`${API_URL}/event`, {
    method: "POST",
    credentials: "include",
    body: event,
  });

  if (!res.ok) {
    const error = await res.json();
    console.log(error);
    return { success: false, errors: error.errors };
  }

  return { success: true, data: await res.json() };
}

//// UPDATE EVENT
export async function updateEvent(id: string, event: FormData) {
  const res = await fetch(`${API_URL}/event/${id}`, {
    method: "PUT",
    body: event,
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    console.log(error);
    return { success: false, errors: error.errors };
  }

  return { success: true, data: await res.json() };
}

//// DELETE EVENT
export async function deleteEvent(id: string) {
  const res = await fetch(`${API_URL}/event/${id}`, {
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

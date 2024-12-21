const API_URL = import.meta.env.VITE_API_URL;

export async function getUserProfile() {
  const res = await fetch(`${API_URL}/utils/verify-token`, {
    method: "GET",
    credentials: "include",
  });

  if (res.ok) {
    const data = await res.json();
    const { id, email, firstName, lastName, phoneNumber, role, imageUrl } =
      data.user;

    return {
      authenticated: true,
      user: { id, email, firstName, lastName, phoneNumber, role, imageUrl },
    };
  } else {
    return { authenticated: false };
  }
}

const API_URL = import.meta.env.VITE_API_URL;

const verifyAuth = async () => {
  const res = await fetch(`${API_URL}/utils/verify-token`, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) return { authenticated: false, role: null };

  return { authenticated: true, role: data.user.role };
};

export default verifyAuth;

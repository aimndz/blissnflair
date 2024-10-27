export interface Account {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  role: string;
  password?: string;
  confirmPassword?: string;
}

export interface AccountProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  role: string;
}

export interface UserContextType {
  user: AccountProfile | null;
  setUser: (user: AccountProfile | null) => void;
}

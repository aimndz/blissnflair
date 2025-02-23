export interface Account {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  role: string;
  password?: string;
  confirmPassword?: string;
  imageUrl?: string;
  createdAt?: Date;
}

export interface AccountCreate {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  role: string;
  password: string;
  confirmPassword: string;
}

export interface AccountProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  role: string;
  imageUrl?: string;
}

export interface UserContextType {
  user: AccountProfile | null;
  setUser: (user: AccountProfile | null) => void;
}

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

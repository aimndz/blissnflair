export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  msg: string;
  token: string;
}

export interface SignUpCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

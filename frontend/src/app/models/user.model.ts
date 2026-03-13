export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: 'PATIENT' | 'DOCTOR' | 'ADMIN';
  phoneNumber?: string;
  dateOfBirth?: string;
  createdAt: string;
}

export interface AuthToken {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'PATIENT' | 'DOCTOR';
  phoneNumber?: string;
}

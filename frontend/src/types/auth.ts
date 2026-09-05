export interface LoginRequest {
    email: string;
    password: string;
}

export interface SignupRequest {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface LoginResponse {
    user: User;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
  };
}
export interface GetMeResponse {
  success: boolean;
  data: {
    user: User;
  };
}
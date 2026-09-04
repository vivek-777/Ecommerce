import apiClient from "@/services/api/axios";
import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
} from "@/types/auth";

export async function login( payload: LoginRequest ): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>(
    "/api/auth/login",
    payload
  );

  return data;
}

export async function signup( payload: SignupRequest ): Promise<SignupResponse> {
  const { data } = await apiClient.post<SignupResponse>(
    "/api/auth/signup",
    payload
  );

  return data;
}
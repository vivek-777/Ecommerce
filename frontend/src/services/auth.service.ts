import apiClient from "@/services/api/axios";
import type {
  GetMeResponse,
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  User,
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

export async function getMe(): Promise<User> {
  const { data } = await apiClient.get<GetMeResponse>("/api/auth/me");

  return data.data.user;
}
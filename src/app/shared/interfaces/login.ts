export interface LoginForm {
  data: LoginResponse;
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
}

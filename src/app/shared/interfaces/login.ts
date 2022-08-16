export interface LoginForm {
  email: string;
  senha: string;
}

export interface LoginResponse {
  data: Data;
  errors: any[];
  links: any[];
}

export interface Data {
  token: string;
}

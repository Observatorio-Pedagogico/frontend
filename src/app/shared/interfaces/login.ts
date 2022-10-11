export interface LoginForm {
  data: LoginResponse;
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
}


export interface Profile {
  matricula: string;
  email: string;
  nome: string;
  sexo: string;
}

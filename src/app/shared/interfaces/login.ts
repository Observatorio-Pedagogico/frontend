export interface LoginForm {
  data: LoginResponse;
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
}

export interface Funcionario {
  matricula: string;
  email: string;
  nome: string;
  sexo: string;
}

export interface EnvelopeFuncionario {
  funcionario: Funcionario;
  tipoFuncionario: TipoFuncionario;
}

export enum TipoFuncionario {
  FUNCIONARIO_COPED = "COPED",
  PROFESSOR = "Professor"
}

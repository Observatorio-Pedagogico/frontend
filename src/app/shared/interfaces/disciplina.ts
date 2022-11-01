import { AlunoResumido } from './aluno';
export interface DisciplinaResumido {
   id: number;
   codigo: string;
   cargaHoraria: number;
   nome: string;
   periodoMatriz: string;
   periodoLetivo: string;
   alunos: AlunoResumido[]
}

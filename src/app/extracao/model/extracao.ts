export interface Extracao {
  id: number,
  titulo: string,
  arquivosMultipartFile: Arquivo[],
  descricao: string
}

export interface ExtracaoResumido {
  id: BigInt,
  titulo: string,
  periodoLetivoTipo: string,
  status: Status,
  dataCadastro: Date,
  ultimaDataHoraAtualizacao: Date
}

export interface Arquivo {
    conteudo: File
}

export interface ExtracaoThread {
  porcentagemEnvio: number,
  extracao: ExtracaoResumido
}

export enum Status {
  ATIVA,
  ERRO
}

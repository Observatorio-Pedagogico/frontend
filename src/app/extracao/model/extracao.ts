export interface Extracao {
  id: number,
  titulo: string,
  periodoLetivoTipo: string,
  periodoLetivo: string,
  arquivo: Arquivo,
  descricao: string
}

export interface ExtracaoResumido {
  id: number,
  titulo: string,
  periodoLetivoTipo: string,
  periodoLetivo: string,
  status: string,
  dataCadastro: Date,
  dataUltimaAtualizacao: Date
}

export interface Arquivo {
    conteudo: File
}

export interface ExtracaoThread {
  porcentagemEnvio: number,
  extracao: ExtracaoResumido
}

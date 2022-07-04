export interface Extracao {
  id: number,
  titulo: string,
  periodoLetivoTipo: string,
  periodoLetivo: string,
  arquivo: Arquivo,
  descricao: string
}

export interface ExtracaoResumido {
  titulo: string,
  periodoLetivoTipo: string,
  periodoLetivo: string,
  status: string
}

export interface Arquivo {
    conteudo: File
}

export interface ExtracaoThread {
  porcentagemEnvio: number,
  extracao: ExtracaoResumido
}

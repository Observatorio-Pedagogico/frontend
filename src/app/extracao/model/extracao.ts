export interface Extracao {
    id: number,
    titulo: string,
    periodoLetivoTipo: string,
    periodoLetivo: string,
    arquivo: Arquivo,
    descricao: string
}

export interface Arquivo {
    conteudo: File
}

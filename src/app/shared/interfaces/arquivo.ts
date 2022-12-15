export interface PdfArquivoSubParte {
  conteudo: string;
  tituloConteudo?: string;
  tipo: PdfArquivoSubParteTipo;
}

export interface PdfArquivoRequest {
  subPartes: PdfArquivoSubParte[];
}

export interface PdfArquivoResponse {
  conteudo: string;
}

export enum PdfArquivoSubParteTipo {
  TITULO,
  IMAGEM,
  TEXTO
}

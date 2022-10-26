export interface ArquivoSubParte {
  conteudo: string;
  tituloConteudo?: string;
  tipo: ArquivoSubParteTipo;
}

export interface ArquivoRequest {
  subPartes: ArquivoSubParte[];
}

export interface ArquivoResponse {
  conteudo: string;
}

export enum ArquivoSubParteTipo {
  TITULO,
  IMAGEM,
  TEXTO
}


export interface ConjuntoDadosResponse {
  legenda: string;
  dados: number[];
}

export interface DashboardResponse {
  legendas: string[];
  conjuntoDados: ConjuntoDadosResponse[];
}

export interface DataSets {
  label: string;
  backgroundColor: string;
  data: number[];
}

export interface Dashboard {
  labels: string[];
  datasets: DataSets[];
}



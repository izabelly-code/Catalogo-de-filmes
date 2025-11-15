export interface PrimaryImage {
  url: string;
  width?: number;
  height?: number;
}

export interface Rating {
  aggregateRating?: number;
  voteCount?: number;
}

export interface TitleItem {
  id: string;
  originalTitle?: string;
  primaryImage?: PrimaryImage;
}

export interface SearchResponse {
  titles: TitleItem[];
  // outros campos que a API possa retornar podem ser adicionados aqui
}

export interface MovieDetails {
  primaryTitle?: string;
  startYear?: number;
  primaryImage?: PrimaryImage;
  plot?: string;
  rating?: Rating;
  // adicionar campos conforme necessário
}



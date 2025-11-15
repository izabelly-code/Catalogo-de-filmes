import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchResponse, MovieDetails } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class ImdbService {

  private readonly API_URL = 'https://api.imdbapi.dev/';

  constructor(private readonly http: HttpClient) {}

  // Buscar filmes pelo título (Batman, Matrix, etc.)
  buscarFilmes(termo: string, page: number = 1): Observable<SearchResponse> {
    const query = encodeURIComponent((termo || '').trim());
    const url = `${this.API_URL}search/titles?query=${query}&page=${page}`;
    return this.http.get<SearchResponse>(url);
  }

  // Buscar detalhes por IMDb ID
  buscarDetalhes(imdbId: string): Observable<MovieDetails> {
    const url = `${this.API_URL}titles/${imdbId}`;
    return this.http.get<MovieDetails>(url);
  }
}

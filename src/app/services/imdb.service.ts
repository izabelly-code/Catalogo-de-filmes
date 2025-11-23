import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OmdbSearchResponse, OmdbMovieDetails } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class OmdbService {

  private readonly API_URL = 'https://www.omdbapi.com/';
  private readonly API_KEY = '6b775eac'; // sua API key

  constructor(private readonly http: HttpClient) {}

  // Buscar filmes pelo título
  buscarFilmes(termo: string): Observable<OmdbSearchResponse> {
    const query = encodeURIComponent((termo || '').trim());
    const url = `${this.API_URL}?apikey=${this.API_KEY}&s=${query}`;
    return this.http.get<OmdbSearchResponse>(url);
  }

  // Buscar detalhes por IMDb ID
  buscarDetalhes(imdbId: string): Observable<OmdbMovieDetails> {
    const url = `${this.API_URL}?apikey=${this.API_KEY}&i=${imdbId}&plot=full`;
    return this.http.get<OmdbMovieDetails>(url);
  }
}

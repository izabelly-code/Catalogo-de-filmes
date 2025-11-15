import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImdbService } from '../../services/imdb.service';
import { StorageService } from '../../services/storage.service';
import { MovieDetails } from '../../models/movie.model';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  favorites: MovieDetails[] = [];
  loading = false;
  noFavorites = false;

  constructor(
    private readonly imdbService: ImdbService,
    private readonly storage: StorageService
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  private getCurrentUserEmail(): string | null {
    const current = this.storage.get<any>('currentUser');
    return current?.email || null;
  }

  loadFavorites(): void {
    const email = this.getCurrentUserEmail();
    if (!email) {
      this.favorites = [];
      this.noFavorites = true;
      return;
    }

    const current = this.storage.get<any>('currentUser');
    type FavObj = { id: string; rating?: number };
    let favObjs: FavObj[] = [];

    if (current && Array.isArray(current.favorites)) {
      const raw = (current.favorites as any[]).flat(Infinity);
      favObjs = raw
        .map(item => {
          if (!item) return null;
          if (typeof item === 'string') return { id: String(item), rating: undefined } as FavObj;
          if (typeof item === 'object') {
            const idField = item.id ?? item.imdbID ?? item._imdbId ?? item.movieId ?? item;
            const ratingField = item.rating ?? item.userRating ?? undefined;
            return { id: String(idField), rating: ratingField } as FavObj;
          }
          return null;
        })
        .filter(Boolean) as FavObj[];
    }

    const ids = favObjs.map(f => f.id);
    if (!ids.length) {
      this.favorites = [];
      this.noFavorites = true;
      return;
    }

    this.loading = true;
    const calls = ids.map(id =>
      this.imdbService.buscarDetalhes(id).pipe(
        catchError(() => of(null))
      )
    );

    forkJoin(calls).subscribe(results => {
      // associar o id original (ids) ao objeto de detalhes para permitir ações (remover, link)
      const mapped: MovieDetails[] = results
          .map((res, i) => {
            if (!res) return null;
            // anexa um campo não tipado com o id do imdb usado e a avaliação do usuário
            const rating = favObjs[i]?.rating;
            return { ...(res as any), _imdbId: ids[i], _userRating: rating } as MovieDetails & { _imdbId?: string; _userRating?: number };
          })
          .filter(Boolean) as MovieDetails[];

      this.favorites = mapped;
      this.noFavorites = this.favorites.length === 0;
      this.loading = false;
    });
  }

  getImdbId(movie: MovieDetails): string {
    return ((movie as any)?._imdbId) || '';
  }

  getUserRating(movie: MovieDetails): number | undefined {
    return (movie as any)?._userRating;
  }

}

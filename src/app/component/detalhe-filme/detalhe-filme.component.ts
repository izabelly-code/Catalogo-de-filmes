import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ImdbService } from '../../services/imdb.service';
import { MovieDetails } from '../../models/movie.model';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-detalhe-filme',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalhe-filme.component.html',
  styleUrls: ['./detalhe-filme.component.css']
})
export class DetalheFilmeComponent implements OnInit {
  id: string | null = null;
  details: MovieDetails | null = null;
  loading = false;
  userRating: number | null = null;
  hoverRating = 0;
  readonly stars = [1, 2, 3, 4, 5];
  isFavorited = false;
  

  constructor(
    private readonly route: ActivatedRoute,
    private readonly imdbService: ImdbService,
    private readonly storage: StorageService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParamMap.get('id');
    if (this.id) {
      this.loading = true;
      this.imdbService.buscarDetalhes(this.id).subscribe({
        next: (d) => {
          this.details = d;
          this.checkFavorited();
          this.loading = false;
        },
        error: (err) => {
          console.error('Erro ao carregar detalhes', err);
          this.loading = false;
        }
      });
    }
  }

  setRating(value: number): void {
    this.userRating = value;
  }

  setHover(value: number): void {
    this.hoverRating = value;
  }

  clearHover(): void {
    this.hoverRating = 0;
  }

  private getCurrentUserEmail(): string | null {
    const current = this.storage.get<any>('currentUser');
    return current?.email || null;
  }

    // ...existing code...
    toggleFavorite(): void {
      const email = this.getCurrentUserEmail();
      const id = this.id;
      if (!email || !id) return;
  
      const users = this.storage.get<any[]>('users') || [];
      const idx = users.findIndex(u => u.email === email);
      if (idx === -1) return;
  //usuario atual
      const found = users[idx];
  
        // normaliza favorites: garante array plana de objetos { id, rating? }
        type FavObj = { id: string; rating?: number };
        let favs: FavObj[] = [];
        if (Array.isArray(found.favorites)) {
          const raw = (found.favorites as any[]).flat(Infinity);
          favs = raw
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

        const alreadyIndex = favs.findIndex(f => f.id === id);
        let updatedObjs: FavObj[];
        if (alreadyIndex >= 0) {
          // já está nos favoritos — não permitimos remoção pelo detalhe
          // mantém o estado e informa o usuário
          this.isFavorited = true;
          alert('Este filme já foi avaliado.');
          return;
        }

        // ao favoritar, a avaliação passa a ser obrigatória
        if (this.userRating == null) {
          alert('É obrigatório enviar uma avaliação antes de favoritar o filme.');
          return;
        }

        // adicionar com a avaliação atual
        const rating = this.userRating;
        updatedObjs = [...favs, { id, rating }];
        // garantir unicidade por id (último prevalece)
        const map = new Map<string, FavObj>();
        for (const f of updatedObjs) map.set(f.id, f);
        updatedObjs = Array.from(map.values());
        this.isFavorited = true;

        // atualiza o usuário na lista
        found.favorites = updatedObjs;
        users[idx] = { ...found };

        this.storage.set('users', users);
        this.storage.set('currentUser', users[idx]);
    }

  private checkFavorited(): void {
    const email = this.getCurrentUserEmail();
    const id = this.id;
    if (!email || !id) return;
    const users = this.storage.get<any[]>('users') || [];
    const found = users.find(u => u.email === email);
    if (!found || !Array.isArray(found.favorites)) {
      this.isFavorited = false;
      return;
    }
    // normaliza favoritos para objetos e verifica se existe o id
    const raw = (found.favorites as any[]).flat(Infinity);
    const favObjs = raw
      .map(item => {
        if (!item) return null;
        if (typeof item === 'string') return { id: String(item), rating: undefined };
        if (typeof item === 'object') {
          const idField = item.id ?? item.imdbID ?? item._imdbId ?? item.movieId ?? item;
          const ratingField = item.rating ?? item.userRating ?? undefined;
          return { id: String(idField), rating: ratingField };
        }
        return null;
      })
      .filter(Boolean) as { id: string; rating?: number }[];

    const foundFav = favObjs.find(f => f.id === id);
    this.isFavorited = !!foundFav;
    if (foundFav?.rating != null) {
      this.userRating = foundFav.rating;
    }
  }
  
}

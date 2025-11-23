import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OmdbService } from '../../services/imdb.service';
import { OmdbSearchItem, OmdbMovieDetails } from '../../models/movie.model';

@Component({
  selector: 'app-busca-filmes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './busca-filmes.component.html',
  styleUrls: ['./busca-filmes.component.css']
})
export class BuscaFilmesComponent {
  menuAberto = false;
  searchTerm = '';
  titles: OmdbSearchItem[] = [];
  loading = false;
  selectedDetails: OmdbMovieDetails | null = null;

  constructor(private readonly router: Router,
              private readonly omdbService: OmdbService
  ) {}
  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }

  fecharMenu(rota: string): void {
    this.menuAberto = false;
    this.router.navigate([rota]);
  }

  onSearch(): void {
    const termo = (this.searchTerm || '').trim();
    if (!termo) {
      this.titles = [];
      return;
    }
    this.loading = true;
    this.selectedDetails = null;
    this.omdbService.buscarFilmes(termo).subscribe({
      next: (res) =>{
        const items = Array.isArray(res?.Search) ? res.Search: [];
        this.titles = items;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      }
    });  

  }


  selectTitle(item: OmdbSearchItem): void {
    this.selectedDetails = null;
    this.router.navigate(['/detalhe-filme'], { queryParams: { id: item.imdbID } });
  }

}

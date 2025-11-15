import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ImdbService } from '../../services/imdb.service';
import { TitleItem, MovieDetails } from '../../models/movie.model';

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
  titles: TitleItem[] = [];
  loading = false;
  selectedDetails: MovieDetails | null = null;

  constructor(private readonly router: Router,
              private readonly imdbService: ImdbService
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
    this.imdbService.buscarFilmes(termo).subscribe({
      next: (res) => {
        this.titles = (res.titles || []).slice(0, 10);
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar filmes', err);
        this.titles = [];
        this.loading = false;
      }
    });
  }

  selectTitle(item: TitleItem): void {
    this.selectedDetails = null;
    this.router.navigate(['/detalhe-filme'], { queryParams: { id: item.id } });
  }

}

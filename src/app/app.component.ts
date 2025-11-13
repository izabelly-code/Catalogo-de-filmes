import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  title = 'movie-cataloger';

  ngOnInit(): void {
    // se não estivermos já na rota de login, encaminha para /login
    try {
      if (this.router.url !== '/login') {
        this.router.navigate(['/login']);
      }
    } catch (e) {
      // evita quebrar o app caso a navegação falhe no bootstrap
      // eslint-disable-next-line no-console
      console.error('Erro ao redirecionar para /login', e);
    }
  }
}

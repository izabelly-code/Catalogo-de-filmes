import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { CadastroComponent } from './component/cadastro/cadastro.component';
import { TirarFotoComponent } from './component/tirar-foto/tirar-foto.component';
import { BuscaFilmesComponent } from './component/busca-filmes/busca-filmes.component';
import { PerfilComponent } from './component/perfil/perfil.component';
import { DetalheFilmeComponent } from './component/detalhe-filme/detalhe-filme.component';
import { FavoritosComponent } from './component/favoritos/favoritos.component';

export const routes: Routes = [
	{ path: 'login', component: LoginComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'tirar-foto', component: TirarFotoComponent },
    { path: 'busca-filmes', component: BuscaFilmesComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'detalhe-filme', component: DetalheFilmeComponent },
    { path: 'favoritos', component: FavoritosComponent },
];

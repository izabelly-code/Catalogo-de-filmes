import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { CadastroComponent } from './component/cadastro/cadastro.component';
import { TirarFotoComponent } from './component/tirar-foto/tirar-foto.component';

export const routes: Routes = [
	{ path: 'login', component: LoginComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'tirar-foto', component: TirarFotoComponent }
];

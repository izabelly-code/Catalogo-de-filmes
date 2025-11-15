import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class LoginComponent {
  email = '';
  password = '';

  private readonly storage: StorageService
  constructor(private readonly router: Router, storage: StorageService) {
    this.storage = storage;
  }

  onSubmit(): void {
    const users = this.storage.get<any[]>('users') || [];
    const found = users.find(u => u.email === this.email && u.password === this.password);
    if (found) {
      this.storage.set('currentUser', found);
      this.router.navigate(['/busca-filmes']);
    } else {
      alert('Credenciais inválidas. Tente novamente.');
    }
  }

  irCadastro(): void {
    this.router.navigate(['/cadastro']);

  } 
}

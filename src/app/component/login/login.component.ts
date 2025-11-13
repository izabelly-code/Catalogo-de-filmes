import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
})
export class LoginComponent {

  private readonly storage: StorageService
  constructor(private readonly router: Router, storage: StorageService) {
    this.storage = storage;
  }

  onSubmit(): void {
    
  }

  irCadastro(): void {
    this.router.navigate(['/cadastro']);

  } 
}

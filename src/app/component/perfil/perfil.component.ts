import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  name = '';
  email = '';
  profileImage: string | null = null;

  constructor(private readonly storage: StorageService, private readonly router: Router) {}

  ngOnInit(): void {
    const current = this.storage.get<any>('currentUser');
    if (current) {
      this.name = current.name || '';
      this.email = current.email || '';
      // profileImage might be stored as profileImage or profileImageDataUrl
      this.profileImage = current.profileImage || current.profileImageDataUrl || null;
    }
  }

  irLogin(): void {
    this.storage.remove('currentUser');
    this.router.navigate(['/login']);
  }
}

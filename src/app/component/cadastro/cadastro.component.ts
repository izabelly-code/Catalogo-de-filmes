import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
  import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../../service/storage.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  name = '';
  email = '';
  password = '';
  profileImageDataUrl: string | null = null;

  @ViewChild('fileInput') fileInput?: ElementRef<HTMLInputElement>;
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

    stream: MediaStream | null = null;

  constructor(private readonly router: Router, private readonly route: ActivatedRoute, private readonly storage: StorageService) {
    // constructor apenas injeta dependências; inicialização ocorre em ngOnInit
  }

  ngOnInit(): void {
    const photoParam = this.route.snapshot.queryParamMap.get('photo');
    if (photoParam) {
      this.profileImageDataUrl = photoParam;
    }
  }

  onSubmit(): void {
    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
      profileImage: this.profileImageDataUrl,
    };

    // salvar localmente em uma lista simples de usuários
    const existing = this.storage.get<any[]>('users') || [];
    existing.push(user);
    this.storage.set('users', existing);

    console.log('Cadastro enviado', user);
    // após cadastro, redireciona para login
    this.router.navigate(['/login']);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.profileImageDataUrl = reader.result as string;
      // salva no storage (base64)
      this.storage.set('profileImage', this.profileImageDataUrl);
    };
    reader.readAsDataURL(file);
  }

  triggerFileInput(): void {
    this.fileInput?.nativeElement.click();
  }

  removePhoto(): void {
    this.profileImageDataUrl = null;
    this.storage.remove('profileImage');
    if (this.fileInput) this.fileInput.nativeElement.value = '';
  }

  irLogin(): void {
      this.router.navigate(['/login']); 
  } 

  irCamera(): void {
      this.router.navigate(['/tirar-foto']); 
  }
  
}

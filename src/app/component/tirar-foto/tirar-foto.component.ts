import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tirar-foto',
  standalone: true,
  imports: [],
  templateUrl: './tirar-foto.component.html',
  styleUrls: ['./tirar-foto.component.css']
})
export class TirarFotoComponent implements OnInit {
  @ViewChild('video', {static: true}) video!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', {static: true}) canvas!: ElementRef<HTMLCanvasElement>;
  private stream: MediaStream | null = null;

  constructor(private readonly router: Router) {}


  ngOnInit() {
    this.iniciarCamera();
  }
  iniciarCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(s => {
        this.stream = s;
        const video = this.video.nativeElement;
        video.srcObject = s;
        video.play();
      })
      .catch(err => {
        console.error("Erro ao acessar a câmera: ", err);
      });
  }

  tirarFoto() {
    const video = this.video.nativeElement;
    const canvas = this.canvas.nativeElement;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/png');
      // parar a câmera para liberar recursos
      if (this.stream) {
        for (const t of this.stream.getTracks()) {
          t.stop();
        }
        this.stream = null;
      }
      // navegar para o cadastro passando a foto como query param
      // OBS: se for um dataURL muito grande, pode ultrapassar limites de URL
      this.router.navigate(['/cadastro'], { queryParams: { photo: dataUrl } });
    }

  }
  cancel(): void {
    this.router.navigate(['/cadastro']);
  }
}

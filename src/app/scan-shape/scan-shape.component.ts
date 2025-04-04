import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-scan-shape',
  imports: [CommonModule],
  templateUrl: './scan-shape.component.html',
  styleUrl: './scan-shape.component.css'
})

export class ScanShapeComponent implements OnInit {
  shapeId!: string; // Variable para almacenar el ID de la URL
  isCameraActive = false; // Controla si la cámara está activa

  @ViewChild('canvasElement', { static: false }) canvasElement!: ElementRef<HTMLCanvasElement>;

  private videoStream!: MediaStream;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Obtener el parámetro 'id' de la URL
    this.shapeId = this.route.snapshot.paramMap.get('id') || '';
    console.log('Shape ID:', this.shapeId);
  }

  async startCamera(): Promise<void> {
    try {
      // Solicitar acceso a la cámara
      this.videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.isCameraActive = true;

      // Esperar a que Angular renderice el canvas
      setTimeout(() => {
        const canvas = this.canvasElement.nativeElement;
        const ctx = canvas.getContext('2d');

        if (ctx) {
          const video = document.createElement('video');
          video.srcObject = this.videoStream;
          video.play();

          // Dibujar el video en el canvas
          const drawFrame = () => {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            requestAnimationFrame(drawFrame);
          };

          drawFrame();
        }
      }, 0); // Espera mínima para asegurar que el DOM esté actualizado
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
      alert('No se pudo acceder a la cámara. Por favor, verifica los permisos.');
    }
  }

  ngOnDestroy(): void {
    // Detener la cámara cuando el componente se destruya
    if (this.videoStream) {
      this.videoStream.getTracks().forEach(track => track.stop());
    }
  }
}
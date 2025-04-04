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
      // Detectar si el dispositivo es móvil
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
      if (isMobile) {
        // Intentar usar la cámara trasera en dispositivos móviles
        this.videoStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { exact: 'environment' } } // Cámara trasera
        });
      } else {
        // Configuración genérica para escritorio
        this.videoStream = await navigator.mediaDevices.getUserMedia({
          video: true // Sin restricciones específicas
        });
      }
    } catch (error) {
      console.warn('No se pudo acceder a la cámara trasera, intentando con la cámara frontal:', error);
  
      // Si no se puede acceder a la cámara trasera, usar la cámara frontal
      this.videoStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' } // Cámara frontal
      });
    }
  
    this.isCameraActive = true;
  
    // Esperar a que Angular renderice el canvas
    setTimeout(() => {
      const canvas = this.canvasElement.nativeElement;
      const ctx = canvas.getContext('2d');
  
      if (ctx) {
        const video = document.createElement('video');
        video.srcObject = this.videoStream;
        video.play();
  
        const drawFrame = () => {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          requestAnimationFrame(drawFrame);
        };
  
        drawFrame();
      }
    }, 0); // Espera mínima para asegurar que el DOM esté actualizado
  }

  ngOnDestroy(): void {
    // Detener la cámara cuando el componente se destruya
    if (this.videoStream) {
      this.videoStream.getTracks().forEach(track => track.stop());
    }
  }
}
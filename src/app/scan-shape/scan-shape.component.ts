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

  @ViewChild('canvasElement', { static: false }) canvasElement!: ElementRef<HTMLCanvasElement>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Obtener el parámetro 'id' de la URL
    this.shapeId = this.route.snapshot.paramMap.get('id') || '';
    console.log('Shape ID:', this.shapeId);
  }

  handlePhotoCapture(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const selectedFile = input.files[0];
      console.log('Foto capturada:', selectedFile);

      // Crear una URL para mostrar la imagen capturada
      const imageUrl = URL.createObjectURL(selectedFile);

      // Renderizar la imagen en el canvas
      const canvas = this.canvasElement.nativeElement;
      const ctx = canvas.getContext('2d');

      const img = new Image();
      img.onload = () => {
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        // Liberar la URL creada
        URL.revokeObjectURL(imageUrl);
      };
      img.src = imageUrl;
    }
  }
}
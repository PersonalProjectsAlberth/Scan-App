import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TensorflowService } from '../services/tensorflow.service';

@Component({
  selector: 'app-scan-shape',
  imports: [CommonModule],
  templateUrl: './scan-shape.component.html',
  styleUrl: './scan-shape.component.css',
})
export class ScanShapeComponent implements OnInit {
  shapeId!: string; // Variable para almacenar el ID de la URL
  isCameraActive: boolean = false;
  predictionMessageG: string = '';
  predictionMessageB: string = '';

  @ViewChild('canvasElement', { static: false })
  canvasElement!: ElementRef<HTMLCanvasElement>;

  constructor(
    private route: ActivatedRoute,
    private tfService: TensorflowService
  ) {}

  async ngOnInit(): Promise<void> {
    // Obtener el parámetro 'id' de la URL
    this.shapeId = this.route.snapshot.paramMap.get('id') || '';
    console.log('Shape ID:', this.shapeId);

    // Cargar el modelo TensorFlow
    await this.tfService.loadModel('assets/my_model/model.json'); // Ruta al modelo
  }

  async handlePhotoCapture(event: Event): Promise<void> {
    this.predictionMessageG = '';
    this.predictionMessageB = '';
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const selectedFile = input.files[0];
      console.log('Foto capturada:', selectedFile);

      // Cambiar el estado para mostrar el canvas
      this.isCameraActive = true;

      // Esperar a que Angular renderice el canvas
      setTimeout(async () => {
        const canvas = this.canvasElement?.nativeElement;
        if (!canvas) {
          console.error('El canvas no está disponible en el DOM.');
          return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          console.error('No se pudo obtener el contexto 2D del canvas.');
          return;
        }

        const imageUrl = URL.createObjectURL(selectedFile);
        const img = new Image();
        img.onload = async () => {
          // Ajustar el tamaño del canvas manteniendo las proporciones
          const aspectRatio = img.width / img.height;
          const maxWidth = 400; // Ancho máximo deseado
          const maxHeight = 400; // Alto máximo deseado

          if (aspectRatio > 1) {
            canvas.width = maxWidth;
            canvas.height = maxWidth / aspectRatio;
          } else {
            canvas.height = maxHeight;
            canvas.width = maxHeight * aspectRatio;
          }

          // Dibujar la imagen en el canvas
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Aplicar el modelo TensorFlow a la imagen
          try {
            const prediction = await this.tfService.predict(canvas);

            console.log('Predicción del modelo:', prediction);

            const predictionreuslt = Array.from(prediction) as number[];
            
            // Obtener el valor máximo
            const maxValue = Math.max(...predictionreuslt);

            // Obtener la posición (índice) del valor máximo
            const maxIndex = predictionreuslt.indexOf(maxValue);

            // console.log('Índice del valor máximo:', maxIndex+1);
            if (maxIndex + 1 === Number(this.shapeId)) {
              this.predictionMessageG = '✅ La predicción es correcta';
            } else {
              this.predictionMessageB = '❌ La predicción es incorrecta';
            }
            // console.log('Valor máximo:', maxValue);
          } catch (error) {
            console.error('Error al hacer la predicción:', error);
          }

          // Liberar la URL creada
          URL.revokeObjectURL(imageUrl);
        };
        img.src = imageUrl;
      }, 10); // Espera mínima para asegurar que el DOM esté actualizado
    }
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shape-card',
  imports: [],
  templateUrl: './shape-card.component.html',
  styleUrl: './shape-card.component.css'
})

export class ShapeCardComponent implements OnInit {
  shapeId!: number;

  ngOnInit(): void {
    // Obtener la URL actual
    const url = window.location.href;

    // Extraer el último número de la URL usando una expresión regular
    const match = url.match(/(\d+)$/);
    if (match) {
      this.shapeId = Number(match[1]); // Convertir a número
      console.log('Shape ID:', this.shapeId);
    }
  }

  private _router = inject(Router);

  navegate(id: number): void {
    this._router.navigate([`/shape${this.shapeId}`, id]);
  }

}

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shape-card',
  imports: [],
  templateUrl: './shape-card.component.html',
  styleUrl: './shape-card.component.css'
})

export class ShapeCardComponent {

  private _router = inject(Router);

  navegate(id: number): void {
    this._router.navigate(['/shape', id]);
  }

}

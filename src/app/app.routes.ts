import { Routes } from '@angular/router';
import { PuzzleCardComponent } from './puzzle-card/puzzle-card.component';
import { ShapeCardComponent } from './shape-card/shape-card.component';
import { ScanShapeComponent } from './scan-shape/scan-shape.component';

export const routes: Routes = [
    {path: '', component: PuzzleCardComponent},
    {path: 'shape', component: ShapeCardComponent},
    {path: 'shape/:id', component: ScanShapeComponent},

    {path: '**', redirectTo: '', pathMatch: 'full'},
];

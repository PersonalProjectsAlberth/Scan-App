import { Routes } from '@angular/router';
import { PuzzleCardComponent } from './puzzle-card/puzzle-card.component';
import { ShapeCardComponent } from './shape-card/shape-card.component';
import { ScanShapeComponent } from './scan-shape/scan-shape.component';

export const routes: Routes = [
    {path: '', component: PuzzleCardComponent},
    {path: 'shape1', component: ShapeCardComponent},
    {path: 'shape2', component: ShapeCardComponent},
    {path: 'shape3', component: ShapeCardComponent},
    {path: 'shape4', component: ShapeCardComponent},
    {path: 'shape1/:id', component: ScanShapeComponent},
    {path: 'shape2/:id', component: ScanShapeComponent},
    {path: 'shape3/:id', component: ScanShapeComponent},
    {path: 'shape4/:id', component: ScanShapeComponent},

    {path: '**', redirectTo: '', pathMatch: 'full'},
];

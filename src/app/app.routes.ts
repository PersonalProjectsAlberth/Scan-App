import { Routes } from '@angular/router';
import { PuzzleCardComponent } from './puzzle-card/puzzle-card.component';

export const routes: Routes = [
    {path: '', component: PuzzleCardComponent},
    {path: '**', redirectTo: '', pathMatch: 'full' }
];

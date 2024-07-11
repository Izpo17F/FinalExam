// src/app/app.route.ts
import { Routes } from '@angular/router';
import { IMCCalculatorComponent } from './components/imc-calculator/imc-calculator.component';

export const appRoutes: Routes = [
  { path: '', component: IMCCalculatorComponent }
];

// src/app/services/imc-calculation.service.ts
import { Injectable } from '@angular/core';
import { IMCCalculationRequest } from '../models/IMCCaculationRequest.interface';
import { IMCCalculationResult } from '../models/IMCCalculationResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class IMCCalculationService {

  calculateIMC(request: IMCCalculationRequest): IMCCalculationResult {
    const heightInMeters = request.height / 100;
    const imc = request.weight / (heightInMeters * heightInMeters);
    const category = this.getIMCCategory(imc);

    return {
      weight: request.weight,
      height: request.height,
      imc: parseFloat(imc.toFixed(2)),
      category: category
    };
  }

  private getIMCCategory(imc: number): string {
    if (imc < 18.5) {
      return 'Bajo peso';
    } else if (imc >= 18.5 && imc < 24.9) {
      return 'Peso normal';
    } else if (imc >= 25 && imc < 29.9) {
      return 'Sobrepeso';
    } else {
      return 'Obesidad';
    }
  }
}

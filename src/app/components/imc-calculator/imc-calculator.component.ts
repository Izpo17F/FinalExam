// src/app/components/imc-calculator/imc-calculator.component.ts
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IMCCalculationService } from '../../service/imccalculation.service';
import { IMCCalculationResult } from '../../models/IMCCalculationResponse.interface';
import { IMCCalculationRequest } from '../../models/IMCCaculationRequest.interface';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-imc-calculator',
  templateUrl: './imc-calculator.component.html',
  styleUrls: ['./imc-calculator.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class IMCCalculatorComponent {
  imcForm: FormGroup;
  result!: IMCCalculationResult;

  constructor(
    private fb: FormBuilder,
    private imcService: IMCCalculationService
  ) {
    this.imcForm = this.fb.group({
      weight: [0, [Validators.required, Validators.min(1), this.negativeValueValidator]],
      height: [0, [Validators.required, Validators.min(1), this.negativeValueValidator]]
    });
  }

  controlHasError(control: string, error: string) {
    return this.imcForm.controls[control].hasError(error) && (this.imcForm.controls[control].touched || this.imcForm.controls[control].dirty);
  }

  negativeValueValidator(control: AbstractControl) {
    const value = control.value;
    if (value < 0) {
      return { negative: true };
    }
    return null;
  }

  onSubmit() {
    if (this.imcForm.valid) {
      const formValues: IMCCalculationRequest = this.imcForm.value;
      this.result = this.imcService.calculateIMC(formValues);
    }
  }
}

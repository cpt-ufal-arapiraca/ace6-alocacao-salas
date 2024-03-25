import { NgClass } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CadastroService } from '../../../services/cadastro.service';
import { Cadastro } from '../../../interfaces/cadastro.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NgClass, 
    FormsModule,
    ReactiveFormsModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  cadastro!: FormGroup;
  @HostListener('document:keydown.enter', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.cadastrar();
  }
  constructor(private cadastroUser: CadastroService){}

  ngOnInit(): void {
    this.cadastro = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(7),Validators.pattern('^[a-zA-ZÀ-ú\\s]+$'), this.noWhitespaceValidatorName, this.noMultipleSpacesValidator]),
      cpf: new FormControl('', [Validators.required,Validators.pattern(/^[0-9]*$/),  this.ValidateCPF]),
      email: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),this.noWhitespaceValidator]),
      tipo_usuario: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/)]),
      confirmaSenha: new FormControl('', [Validators.required, this.checkPasswords.bind(this)]),
    });
  }

  get nome() {
    return this.cadastro.get('nome')!;
  }
  get cpf() {
    return this.cadastro.get('cpf')!;
  }
  get email() {
    return this.cadastro.get('email')!;
  }
  get tipo_usuario() {
    return this.cadastro.get('tipo_usuario')!;
  }
  get senha() {
    return this.cadastro.get('senha')!;
  }
  get confirmaSenha() {
    return this.cadastro.get('confirmaSenha')!;
  }

  noWhitespaceValidatorName(control: AbstractControl): { [key: string]: boolean } | null  {
    const isWhitespace = (control.value || '').trim().length < 7;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  
  noMultipleSpacesValidator(control: AbstractControl): { [key: string]: boolean } | null  {
    const hasMultipleSpaces = (control.value || '').includes('  ');
    const isValid = !hasMultipleSpaces;
    return isValid ? null : { 'multipleSpaces': true };
  }

  noWhitespaceValidator(control: AbstractControl): { [key: string]: boolean } | null  {
    const isWhitespace = (control.value || '').indexOf(' ') >= 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  ValidateCPF(control: AbstractControl) {
    const cpf = control.value;
    if (cpf) {
      const cpfString = cpf.toString();
      let numbers, digits, sum, i, result, equalDigits;
      equalDigits = 1;
      if (cpfString.length < 11 || cpfString.length > 11) {
        return { maxLength: true };
      }
      for (i = 0; i < cpfString.length - 1; i++) {
        if (cpfString.charAt(i) !== cpfString.charAt(i + 1)) {
          equalDigits = 0;
          break;
        }
      }
      if (!equalDigits) {
        numbers = cpfString.substring(0, 9);
        digits = cpfString.substring(9);
        sum = 0;
        for (i = 10; i > 1; i--) {
          sum += numbers.charAt(10 - i) * i;
        }
        result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        if (result !== Number(digits.charAt(0))) {
          return { cpfNotValid: true };
        }
        numbers = cpfString.substring(0, 10);
        sum = 0;
        for (i = 11; i > 1; i--) {
          sum += numbers.charAt(11 - i) * i;
        }
        result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        if (result !== Number(digits.charAt(1))) {
          return { cpfNotValid: true };
        }
        return null;
      } else {
        return { cpfNotValid: true };
      }
    }
    return null;
  } 
  
  processInput(controlName: string, event: any, maxLength?: number) {
    const control = this.cadastro.get(controlName) as FormControl;
    let value = event.target.value.replace(/\D/g, '');
    if (maxLength && value.length > maxLength) {
      value = value.substr(0, maxLength);
    }
    if (value < 0) {
      value = '';
    }
    control.setValue(value);
  }
  
  hasUppercase() {
    const senha = this.cadastro.get('senha')!.value;
    return /[A-Z]/.test(senha);
  }
  
  hasSpecialCharacter() {
    const senha = this.cadastro.get('senha')!.value;
    return /[@#$!%*?&]/.test(senha);
  }
  
  hasNumber() {
    const senha = this.cadastro.get('senha')!.value;
    return /\d/.test(senha);
  }
  
  hasMinLength() {
    const senha = this.cadastro.get('senha')!.value;
    return senha.length > 8;
  }

  checkPasswords(control: AbstractControl) {
    if (!this.cadastro) {
      return null;
    }
    const password = this.cadastro.get('senha')!.value;
    return password === control.value ? null : { notSame: true };
  }

  validacaoCadastro() {
    if (
      this.cadastro.get('nome')!.invalid ||
      this.cadastro.get('cpf')!.invalid ||
      this.cadastro.get('email')!.invalid ||
      this.cadastro.get('tipo_usuario')!.invalid ||
      this.cadastro.get('confirmaSenha')!.invalid
    ) {
      return false;
    }
    return true;
  }

  cadastrar(){
    Object.keys(this.cadastro.controls).forEach(field => {
      const control = this.cadastro.get(field);
      control!.markAsTouched({ onlySelf: true });
    });
    if(this.validacaoCadastro()){
      this.cadastroUser.registerStudent({
        nome: this.cadastro.get('nome')!.value,
        cpf: this.cadastro.get('cpf')!.value,
        email: this.cadastro.get('email')!.value,
        tipo_usuario: this.cadastro.get('tipo_usuario')!.value,
        senha: this.cadastro.get('senha')!.value
      }).subscribe((response: Cadastro) => {
        if(response.ok){

        }else{

        }
      })
    }
  }
}

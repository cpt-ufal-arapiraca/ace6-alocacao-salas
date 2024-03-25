import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cadastro } from '../interfaces/cadastro.interface';
import { cadastroUser } from '../environments/url/cadastro.user';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  private CadastroUser  = cadastroUser.cadastrarUsuario;

  constructor(private http: HttpClient) { }

  registerStudent(formData: object): Observable<Cadastro> {
    return this.http.post<Cadastro>(this.CadastroUser, formData);
  }
}

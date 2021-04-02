import { Postagem } from './../model/Postagem';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  baseUrl = environment.server + environment.port;

  constructor(
    private http: HttpClient
  ) { }

  token = { /* objeto token - para permitir acesso apenas após login(que recebe um token) */
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllPostagens(): Observable<Postagem[]>{
    return this.http.get<Postagem[]>(`${this.baseUrl}/postagens`, this.token)
  }

  postPostagem(postagem: Postagem): Observable<Postagem>{
    return this.http.post<Postagem>(`${this.baseUrl}/postagens`, postagem, this.token)

  }

}
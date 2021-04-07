import { AuthService } from './../service/auth.service';
import { Tema } from './../model/Tema';
import { TemaService } from './../service/tema.service';
import { PostagemService } from './../service/postagem.service';
import { Postagem } from './../model/Postagem';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]
  tituloPost :string

  listaTemas: Tema[]
  idTema: number
  tema: Tema =  new Tema()
  nomeTema:string

  user: User = new User()
  idUser = environment.id

  key = 'data'
  reverse = true

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private auth: AuthService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {

    if (environment.token === ''){

      this.router.navigate(['/entrar']);
    }

    this.getAllTemas()

    this.getAllPostagens()
  }

  getAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[]) =>{
      this.listaTemas = resp
    })
  }

  findByIdUser(){
    this.auth.getByIdUser(this.idUser).subscribe((resp: User) => {
      this.user = resp
    })
  }


  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  findByTituloPostagem(){
    if(this.tituloPost == ''){
      this.getAllPostagens()
    } else {
      this.postagemService.getByNomePostagem(this.tituloPost).subscribe((resp: Postagem[])=>{
        this.listaPostagens = resp
      })
    }

  }

  findByNomeTema(){
    if(this.nomeTema == ''){
      this.getAllTemas()
    } else {
      this.temaService.getByNomeTema(this.nomeTema).subscribe((resp: Tema[])=>{
        this.listaTemas = resp
      })
    }

  }

  getAllPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }

  

  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.user.id = this.idUser
    this.postagem.usuario = this.user

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      console.log(this.postagem)
      this.alertas.showAlertSuccess('Postagem realizada com sucesso!')
      this.postagem = new Postagem()
      this.getAllPostagens()
    })
  }

}
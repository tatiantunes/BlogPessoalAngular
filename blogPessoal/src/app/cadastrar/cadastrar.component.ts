import { AuthService } from './../service/auth.service';
import{Router} from '@angular/router'
import { User } from './../model/User';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {
  user: User = new User
  confirmarSenha:string
  tipo:string
  constructor(private authService:AuthService,
    private router:Router) { }

  ngOnInit()  {
    window.scroll(0,0)

  }

  confirmSenha(event:any){
    this.confirmarSenha = event.target.value
  }

  tipoUser(event:any){
    this.tipo = event.target.value
  }
  cadastrar(){
    this.user.tipoUsuario = this.tipo
    if(this.user.senha != this.confirmarSenha){
      alert('As Senhas estão incorretas')
    }
    else{
        this.authService.cadastrar(this.user).subscribe((resp:User) =>{
          this.user = resp
          this.router.navigate(['/entrar'])
          alert('Usuario cadastrado com sucesso')
        })
    }
  }
}

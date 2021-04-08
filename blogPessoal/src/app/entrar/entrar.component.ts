import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../model/UserLogin';
import { AuthService } from '../service/auth.service';
import{Router} from '@angular/router'
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {
  userLogin:UserLogin = new UserLogin()
  hide = true
  constructor(
    private auth:AuthService,
    private router: Router
  ) { }

  ngOnInit()  {
    window.scroll(0,0)
  }

  entrar(){
    this.auth.entrar(this.userLogin).subscribe((resp: UserLogin) =>{
      this.userLogin = resp
      environment.token = this.userLogin.token
      environment.nome = this.userLogin.nome
      environment.foto = this.userLogin.foto
      environment.id = this.userLogin.id
      environment.tipo = this.userLogin.tipoUsuario

      console.log(environment.token)
      console.log(environment.nome)
      this.router.navigate(['/inicio'])
    },erro =>{
        if(erro.status == 500){
          Swal.fire({  
            icon: 'error',  
            title: 'Ops...',  
            text: 'usuario ou a senha estão incorretos!!'  
            
          }) 
          
        }

    })

  }

}

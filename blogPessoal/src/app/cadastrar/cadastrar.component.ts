import { AuthService } from './../service/auth.service';
import{Router} from '@angular/router'
import { User } from './../model/User';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgForm, Validators, FormBuilder } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {
  user: User = new User
  confirmarSenha:string
  tipo:string
  nome = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(7)]);


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
    
    if(this.user.senha != this.confirmarSenha){
      Swal.fire({  
        icon: 'error',  
        title: 'Ops...',  
        text: 'As Senhas estao incorretas!'  
        
      }) 
    }
    else{
        this.authService.cadastrar(this.user).subscribe((resp:User) =>{
          this.user = resp
          this.router.navigate(['/entrar'])
          Swal.fire({  
            icon: 'success',  
            title: 'Show',  
            text: 'Usuario cadastrado com sucesso'  
            
          }) 
         
        })
    }
  }

  getErrorMessageNome() {
    if (this.nome.hasError('required')) {
      return 'O nome é obrigatorio';
    }
    return null;

  }
}

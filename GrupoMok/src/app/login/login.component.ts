import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { loginI } from '../Models/login.interface';
import { AuthService } from '../Services/AuthService';
import {Router} from '@angular/router';

//prueba de commit en git
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  login: loginI;

  constructor(private fb: FormBuilder, private Api: AuthService, private router: Router)  {

    this.form = this.fb.group({
      correo: ['', [Validators.required, Validators.email, Validators.minLength(8)]],
      contraseña: ['', [Validators.required, Validators.minLength(8)]],
    })
  }
  ngOnInit(): void {
  }

  errorStatus:boolean = false;
  errorMsj: any = "";

  LoginUsuario(){
    console.log(this.form)

    this.login = {
      Usuario: this.form.get('correo').value,
      Clave: this.form.get('contraseña').value
    }

    //this.toastr.success('Registo exitoso');
    //this.form.reset();
    this.Login(this.login)
  }

  Login (login: loginI){
    console.log(login)
    this.Api.login(login).subscribe (data =>{
      console.log(data)
         if (data.respuesta.pCodigo == 50002) {
          console.log(data.respuesta.pMensaje)
          this.errorStatus = true;
          this.errorMsj= data.respuesta.pMensaje
      }
       else{
        // salta a l componente
        this.router.navigate(['/registro']);
      }
    })
  }
}

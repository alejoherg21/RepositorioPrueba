import { Component, OnInit } from '@angular/core';
import { registroParqueoI } from '../../Models/registroParqueo.interface';
import { ParqueaderoService } from '../../Services/ParqueaderoService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  form: FormGroup;
  registroParqueo: registroParqueoI;

  constructor(private fb: FormBuilder, private router: Router, private Api: ParqueaderoService,)  {

    this.form = this.fb.group({
      Placa: ['', [Validators.required]],
      TipoVehiculoID: ['', [Validators.required]],
      Nombre: ['', [Validators.required]],
      Documento: ['', [Validators.required]],
      NumeroParqueadero: ['', [Validators.required]],
      UsuarioID: ['', [Validators.required]],
    })
  }
  ngOnInit(): void {
  }

  errorStatus:boolean = false;
  errorMsj: any = "";

  Registro(){
    console.log(this.form)

    this.registroParqueo = {
      Placa: this.form.get('Placa')!.value,
      TipoVehiculoID: this.form.get('TipoVehiculoID')!.value,
      Nombre: this.form.get('Nombre')!.value,
      Documento: this.form.get('Documento')!.value,
      NumeroParqueadero: this.form.get('NumeroParqueadero')!.value,
      UsuarioID: "1",
    }

    //this.toastr.success('Registo exitoso');
    //this.form.reset();
    this.RegistroApi(this.registroParqueo)
  }

  RegistroApi (registroParqueo: registroParqueoI){
    console.log(registroParqueo)
    this.Api.registro(registroParqueo).subscribe (data =>{
      console.log(data)
         if (data.pCodigo == 50002) {
          console.log(data.pMensaje)
          this.errorStatus = true;
          this.errorMsj= data.pMensaje
      }
       else{
        // salta a l componente
        this.router.navigate(['/consulta']);
      }
    })
  }

}

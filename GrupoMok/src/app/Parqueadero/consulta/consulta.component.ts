import { Component, OnInit, ViewChild } from '@angular/core';
import { ConsultaParqueo } from '../../Models/ApiConsultaParqueo';
import { ConsultaParqueoI } from '../../Models/consultaParqueo.Interface';
import { ParqueaderoService } from '../../Services/ParqueaderoService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  form: FormGroup;
  consultaParqueo: ConsultaParqueo;
  consulta: any[]=[];
  dataTable: any;
  dtOptions: any;
  //tableData = [];

  //@ViewChild('dataTable',{static: true}) table;

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
    this.ConsultaApi('0')
  }

  errorStatus:boolean = false;
  errorMsj: any = "";

  ConsultaApi (placa: string){
    this.Api.consulta(placa).subscribe (data =>{
      if (data.respuesta.pCodigo == 50002) {
          console.log(data.respuesta.pMensaje)
          this.errorStatus = true;
          this.errorMsj= data.respuesta.pMensaje
      }
       else{
        // salta a l componente
        this.consulta=Array.of(data.consulta);
        console.log(this.consulta)
      }
    })
  }

  Agregar(){
    this.router.navigate(['/registro']);
  }

  Eliminar(parqueoID: number){
    console.log('Entro eliminar ' + parqueoID)
    this.EliminarApi(parqueoID)
  }

  EliminarApi (parqueoID: number){
    this.Api.eliminar(parqueoID).subscribe (data =>{
      if (data.pCodigo == 50002) {
          console.log(data.pMensaje)
          this.errorStatus = true;
          this.errorMsj= data.pMensaje
      }
       else{
        // salta a l componente
        this.ConsultaApi('0');
      }
    })
  }

  Editar(parqueoID: number){
    console.log('Entro editar ' + parqueoID)

  }
}

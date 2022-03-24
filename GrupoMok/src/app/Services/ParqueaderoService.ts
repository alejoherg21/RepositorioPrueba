import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/User';
import { Error } from '../Models/Error';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConsultaParqueo } from '../Models/ApiConsultaParqueo';
import { registroParqueoI } from '../Models/registroParqueo.interface';
// import { ApiError } from '../classes/ApiError';
// import { JsonRequest } from '../classes/JsonRequest';
// import { ProductService } from "../../shared/services/product.service";
// import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class ParqueaderoService {
  url = environment.url;
  baseUrlRegistro = this.url + environment.urlRegistro;
  baseUrlConsulta = this.url + environment.urlConsulta;
  baseUrlEliminar = this.url + environment.urlEliminar;

  authSubjet = new BehaviorSubject(false);
  private token: string;
  constructor(private httpClient: HttpClient) { }

 registro(registroParqueo: registroParqueoI) : Observable<Error>{

  const url = this.baseUrlRegistro;
  var jsonObject ={
        "Placa": registroParqueo.Placa,
        "TipoVehiculoID": registroParqueo.TipoVehiculoID,
        "Nombre": registroParqueo.Nombre,
        "Documento": registroParqueo.Documento,
        "NumeroParqueadero": registroParqueo.NumeroParqueadero,
        "UsuarioID": registroParqueo.UsuarioID,
    }

    return this.httpClient.post<Error>(url,
      jsonObject).pipe(tap(
        (response: Error) => {
          return response;
        })
      );
  }

  consulta(placa: string) : Observable<ConsultaParqueo>{

    const url = this.baseUrlConsulta + placa;
      return this.httpClient.get<ConsultaParqueo>(url).pipe(tap(
          (response: ConsultaParqueo) => {
            return response;
          })
        );
    }

    eliminar(parqueoID: number) : Observable<Error>{

      const url = this.baseUrlEliminar + parqueoID;
        return this.httpClient.get<Error>(url).pipe(tap(
            (response: Error) => {
              return response;
            })
          );
      }
    }

import { Error } from './Error';
import { ConsultaParqueoI } from './consultaParqueo.Interface';

export interface ConsultaParqueo {
    respuesta: Error;
    consulta: ConsultaParqueoI;
}

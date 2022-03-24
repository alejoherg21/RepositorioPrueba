import { Error } from './Error';
import { User } from './User';

export interface AuthResponse {
    respuesta: Error;
    user: User;
}

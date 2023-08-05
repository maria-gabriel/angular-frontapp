import { Injectable } from "@angular/core";
import { Cliente } from "./cliente";
import { CLIENTES } from "./clientes.json";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import Swal from "sweetalert2";
import { formatDate } from "@angular/common";

@Injectable()
export class ClienteService {

  private urlEndPoint: string = "http://localhost:8080/api/clientes";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router: Router,){ }

  getClientes(): Observable<Cliente[]>{
    //return of(CLIENTES);
    return this.http.get<Cliente[]>(this.urlEndPoint).pipe(
      map(response => {
        let clientes = response as Cliente[];
        return clientes.map(cliente => {
          cliente.createdAt = formatDate(cliente.createdAt, 'dd-MM-yyyy', 'en-US');
          return cliente;
        });
      }
    ))
  }

  create(cliente: Cliente): Observable<any>{
    return this.http.post<any>(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(

      catchError( e => {
        if(e.status === 400){
          return throwError(e);
        }
        Swal.fire(`${e.error.mensaje}:`, `${e.error.error}`,'error');
        return throwError(e);
      })
    );
  }

  getCliente(id: any): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError( e => {
        this.router.navigate(['/clientes']);
        Swal.fire('Operación fallida', `${e.error.mensaje}`,'error');
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError( e => {
        Swal.fire(`${e.error.mensaje}:`, `${e.error.error}`,'error');
        return throwError(e);
      })
    );
  }

  public delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError( e => {
        Swal.fire(`${e.error.mensaje}:`, `${e.error.error}`,'error');
        return throwError(e);
      })
    );
  }

}

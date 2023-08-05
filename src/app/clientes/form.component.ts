import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})

export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public titulo: string = "Nuevo registro";
  public clientes: Cliente[] = [];
  public errores: string[] = [];

  constructor(private clienteService: ClienteService,
    private router: Router,
    private activateRoute: ActivatedRoute){ }

  ngOnInit(): void {
    this.getCliente();
  }

  getErrorSize(): boolean {
    if(this.errores.length == 0 || this.errores.length == null || this.errores.length < 0){
      return false;
    }
    return true;
  }

  create(): void {
    console.log(this.cliente);
    this.clienteService.create(this.cliente).subscribe(
      json => {
        this.router.navigate(['/clientes'])
        Swal.fire('Nuevo registro', `${json.mensaje}: ${json.cliente.nombre}`,'success')
      },
      err => {
        this.errores = err.error.errors
      }
    )
  }

  getCliente(): void {
    this.activateRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente)
      }
    })
  }

  update(): void {
    this.clienteService.update(this.cliente).subscribe(
      json => {
        this.router.navigate(['/clientes'])
        Swal.fire('Registro actualizado', `${json.mensaje}: ${json.cliente.nombre}`,'success')
      }
    )
  }

}

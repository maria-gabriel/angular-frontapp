import { Component, OnInit } from '@angular/core';
import { Cliente } from "./cliente";
import { ClienteService } from "./cliente.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  public clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService){ }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    );

  }

  getClienteSize(): boolean {
    if(this.clientes.length == 0 || this.clientes.length == null || this.clientes.length < 0){
      return false;
    }
    return true;
  }

  delete(cliente: Cliente): void {
    Swal.fire({
      title: `Seguro que deseas eliminar el registro ${cliente.id}?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if(result.value){
        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(c => c !== cliente)
            Swal.fire('Registro eliminado', `Cliente ${cliente.nombre} eliminado con éxito!`,'success')
          }
        )
      }
    })
  }

}

import { Component, OnInit } from "@angular/core";
import { Clientes } from "../../models/clientes";
import { ClientesService } from "../../services/clientes.service";

@Component({
  selector: "app-clientes",
  templateUrl: "./clientes.component.html",
  styleUrls: ["./clientes.component.css"]
})
export class ClientesComponent implements OnInit {
  Lista: Clientes[] = [];
  constructor(private clientesService: ClientesService) {}

  ngOnInit() {
    this.getClientes();
  }
  getClientes() {
    this.clientesService.get().subscribe((res: Clientes[]) => {
      this.Lista = res;
      console.log(this.Lista);
    });
  }
  Alta() {
    this.clientesService.post();
  }
}

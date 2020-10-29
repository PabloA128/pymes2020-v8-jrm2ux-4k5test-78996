import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Clientes } from "../../models/clientes";
import { ClientesService } from "../../services/clientes.service";
import { ModalDialogService } from "../../services/modal-dialog.service";

@Component({
  selector: "app-clientes",
  templateUrl: "./clientes.component.html",
  styleUrls: ["./clientes.component.css"]
})
export class ClientesComponent implements OnInit {
  Lista: Clientes[] = [];
  Titulo = "Articulos";
  TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)"
  };
  AccionABMC = "L"; // inicialmente inicia en el listado de articulos (buscar con parametros)
  Mensajes = {
    SD: " No se encontraron registros...",
    RD: " Revisar los datos ingresados..."
  };
  OpcionesActivo = [
    { Id: null, Nombre: "" },
    { Id: true, Nombre: "SI" },
    { Id: false, Nombre: "NO" }
  ];
  FormFiltro: FormGroup;
  FormReg: FormGroup;
  submitted = false;
  constructor(
    private clientesService: ClientesService,
    public formBuilder: FormBuilder,
    private modalDialogService: ModalDialogService
  ) {}

  ngOnInit() {
    this.FormFiltro = this.formBuilder.group({
      Nombre: [""],
      TieneTrabajo: [null]
    });
    this.FormReg = this.formBuilder.group({
      IdCliente: [0],
      Nombre: [
        "",
        [Validators.required, Validators.minLength(4), Validators.maxLength(55)]
      ],
      NumeroDocumento: ["", [Validators.required]],
      Activo: [this.OpcionesActivo]
    });

    this.getClientes();
  }
  getClientes() {
    this.clientesService.get().subscribe((res: Clientes[]) => {
      this.Lista = res;
      console.log(this.Lista);
    });
  }
  Agregar() {
    this.AccionABMC = "A";
    this.FormReg.reset();
    this.submitted = false;
    //this.FormReg.markAsPristine();
    this.FormReg.markAsUntouched();
  }
  // grabar tanto altas como modificaciones
  Grabar() {
    this.submitted = true;
    // verificar que los validadores esten OK
    if (this.FormReg.invalid) {
      return;
    }
    //hacemos una copia de los datos del formulario, para modificar la fecha y luego enviarlo al servidor
    const itemCopy = { ...this.FormReg.value };
    // agregar post
    if (itemCopy.IdArticulo == 0 || itemCopy.IdArticulo == null) {
      itemCopy.IdArticulo = 0;
      this.clientesService.post(itemCopy).subscribe((res: any) => {
        this.Volver();
        this.modalDialogService.Alert("Registro agregado correctamente.");
      });
    }
  }
  Volver() {
    this.AccionABMC = "L";
  }
}

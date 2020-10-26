import { Component, OnInit } from "@angular/core";
import { Servicios } from "../../models/servicios";
import { ServiciosService } from "../../services/servicios.service";
@Component({
  selector: "app-servicios",
  templateUrl: "./servicios.component.html",
  styleUrls: ["./servicios.component.css"]
})
export class ServiciosComponent implements OnInit {
  Lista: Servicios[] = [];
  constructor(private serviciosService: ServiciosService) {}

  ngOnInit() {
    this.getServicios();
  }
  getServicios() {
    this.serviciosService.get().subscribe((res: Servicios[]) => {
      this.Lista = res;
      console.log(this.Lista);
    });
  }
}

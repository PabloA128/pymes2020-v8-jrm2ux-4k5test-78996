import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Clientes } from "../models/clientes";

@Injectable({ providedIn: "root" })
export class ClientesService {
  resourceUrl: string;

  constructor(private httpClient: HttpClient) {
    this.resourceUrl = "https://demo3151356.mockable.io/clientes";
  }
  get() {
    return this.httpClient.get(this.resourceUrl);
  }
  post(obj: Clientes) {
    return this.httpClient.post(this.resourceUrl, obj);
  }
}

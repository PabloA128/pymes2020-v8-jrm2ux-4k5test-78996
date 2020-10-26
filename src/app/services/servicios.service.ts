import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";

@Injectable()
export class ServiciosService {
  resourceUrl: string;
  constructor(private httpClient: HttpClient) {
    this.resourceUrl = "https://pavii.duckdns.org/api/servicios";
  }

  get() {
    return this.httpClient.get(this.resourceUrl);
  }
}

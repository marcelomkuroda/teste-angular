import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  Url = environment.url;

  constructor(private http: HttpClient) { }

  selectOptionState(estados, texto): any {
    var obj = estados.filter(est => est.nome == texto)[0];
    if (obj)
      return obj["cidades"];
  }

  public create(data: any): Observable<any> {
    return this.http.post(this.Url + "profissao", data);
  }

  public update(data: any): Observable<any> {
    return this.http.put(this.Url + "profissao", data);
  }

  public get(): Observable<any> {
    return this.http.get(this.Url + "profissao");
  }

  public getById(id:any): Observable<any> {
    return this.http.get(this.Url + "profissao/" + id);
  }

  public delete(id: any): Observable<any> {
    return this.http.delete(this.Url + "profissao/" + id);
  }

  public find(texto: any): Observable<any> {
    return this.http.get(this.Url + "profissao/busca/" + texto);
  }

  public getEstadosCidades(): Observable<any> {
    return this.http.get('assets/json/estados-cidades.json');
  }

  public getProfissoes(): Observable<any> {
    return this.http.get('assets/json/profissoes.json');
  }

}
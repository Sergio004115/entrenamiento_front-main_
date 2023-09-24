import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListTeams } from '../interfaces/listTeams.interface';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  public apiUrl = `http://143.244.154.127:40651`;

  constructor(private http: HttpClient) { }


  getTeam(){
    return this.http.get<ListTeams[]>(`${this.apiUrl}/api/equipos`);
  }


}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListTeams } from '../interfaces/listTeams.interface';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  constructor(private http: HttpClient) { }


  getTeam(){
    return this.http.get<ListTeams[]>(`${baseUrl}api/Equipos/GetTeams`);
  }


}

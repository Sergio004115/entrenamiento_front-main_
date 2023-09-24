import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListPlayers } from '../interfaces/listPlayers.interface';
import { environment } from '../../environments/environment';

const baseUrl = environment.baseUrl;


@Injectable({
  providedIn: 'root'
})
export class JugadoresService {

  constructor(private http: HttpClient) { }

  getPlayers(){
    return this.http.get<ListPlayers[]>(`${baseUrl}api/Jugadores/GetPlayers`);
  }

  newPlayer(formData){
    return this.http.post(`${baseUrl}api/jugadores`, formData);
  }

  updatePlayer(formData){
    return this.http.put(`${baseUrl}api/jugadores`, formData);
  }

}

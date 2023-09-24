import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { JugadoresService } from '../services/jugadores.service';
import { ListPlayers } from '../interfaces/listPlayers.interface';
import { EquiposService } from '../services/equipos.service';
import { ListTeams } from '../interfaces/listTeams.interface';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.scss']
})
export class JugadoresComponent implements OnInit {

  public players: ListPlayers[] = [];
  public teams: ListTeams[] = []
  public letras: any[] = [];

  public newPlayerForm = this.fb.group({
    codigo: ['', [Validators.required]],
    nombres: ['', [Validators.required]],
    camiseta: ['', [Validators.required]],
    equipo: ['', [Validators.required]],
    campeonatos: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, private jugadoresService: JugadoresService, private equiposService: EquiposService) { }

  ngOnInit(): void {
    this.ocultarCampeonatos();
    this.getPlayers();
  }

  getPlayers(){
    this.jugadoresService.getPlayers()
      .subscribe((players: any) => {
        if(players.ok == true){
          this.players = players.data;
          console.log('estos son los jugadores', players);
        }

      });
  }

  // getTeam(){
  //   this.equiposService.getTeam()
  //     .subscribe(team => {
  //       this.teams = team;
  //     });
  // }

  newPlayer(){
    if(this.newPlayerForm.invalid){
      return this.newPlayerForm.markAllAsTouched();
    }
    //TODO: HACER EL POST DEL JUGADOR
    this.jugadoresService.newPlayer(this.newPlayerForm)
      .subscribe(resp => {
      });
    
  }

  updatePlayer(){

  }

  camposValidos(campo: string){
    return this.newPlayerForm.controls[campo].errors && this.newPlayerForm.controls[campo].touched; 
  }

  ocultarCampeonatos() {
    const equiposFiltrados = this.players.filter(player => {
    const nombreEquipo = player.nombreEquipo.toUpperCase().replace(/[^A-Z0-9]/g, '');  // Convertir a mayúsculas y quitar caracteres no alfanuméricos
    return /^[AB]/.test(nombreEquipo) && nombreEquipo.length > 0;  // Nombre comienza con "A" o "B" y es alfanumérico
    });
  }

  // ocultarCampeonatos(){   
  //   var primeraLetra: any;
  //   for (let i = 0; i < this.players.length; i++) {
  //     primeraLetra = this.players[i].nombreEquipo.charAt(0);     
  //     this.letras.push(primeraLetra);  
  //     if(this.players[i].nombreEquipo.charAt(0).includes("A")){
  //      const filtro = this.players.filter((equipo: any) => equipo.length <= 9)
  //      console.log('ESTE ES EL FILTRO', filtro);
  //     }
  //   }   
  // }

}

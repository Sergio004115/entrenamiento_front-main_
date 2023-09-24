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
  public btnCreate: boolean = true;
  public isChampionships: boolean = true;

  public newPlayerForm = this.fb.group({
    codigo: ['', [Validators.required]],
    nombres: ['', [Validators.required]],
    camiseta: ['', [Validators.required]],
    idEquipo: ['', [Validators.required]],
    campeonatos: ['', [Validators.required]],
    idJugador:[''],

  });

  constructor(private fb: FormBuilder, private jugadoresService: JugadoresService, private equiposService: EquiposService) { }

  ngOnInit(): void {
    this.getTeam();
    this.getPlayers();
  }

  getPlayers(){
    this.jugadoresService.getPlayers()
      .subscribe((players: any) => {
        if(players.ok == true){
          this.players = players.data;
        }
      });
  }

  getTeam(){
    this.equiposService.getTeam()
      .subscribe(team => {
        this.teams = team
      });
  }
  validateForm(){
    
  }
  newPlayer(){
    if(this.isChampionships == true){
      if(this.newPlayerForm.invalid){
        return this.newPlayerForm.markAllAsTouched();
      }
    }
    this.jugadoresService.newPlayer(this.newPlayerForm.value)
      .subscribe(resp => {
        if(resp == false){
          return alert("usuario ya se encuentra registrado");
        }else{
          this.getPlayers();
          alert("Jugador Creado correctamente");
          this.newPlayerForm.reset();
          return this.isChampionships = true;
        }
      });
    
  }

  isUpdatePlayer(player){
    console.log(player);
    console.log(player);
    this.btnCreate = false;
    this.newPlayerForm.patchValue(player);
  }

  updatePlayer(){
    if(this.newPlayerForm.invalid){
      return this.newPlayerForm.markAllAsTouched();
    }
    this.jugadoresService.updatePlayer(this.newPlayerForm.value)
      .subscribe(resp => {
        if(resp == true){
          this.getPlayers();
          this.newPlayerForm.reset();
          return alert("Jugador Actualizado correctamente");
        }else{
          return alert("Error al Actualizar Jugador");
        }
      })
;
  }

  camposValidos(campo: string){
    return this.newPlayerForm.controls[campo].errors && this.newPlayerForm.controls[campo].touched; 
  }

  isShowChampionships(){
    const idEquipo = this.newPlayerForm.value.idEquipo;
    const equipoEncontradoIndex = this.teams.findIndex(team => team.idEquipo === idEquipo);
  
    if (equipoEncontradoIndex !== -1) {
      const equipoEncontrado = this.teams[equipoEncontradoIndex].nombre;
      this.isChampionships = false;
      return !equipoEncontrado.match(/^[aAbB]/);
    }
    this.isChampionships = true;
    return true;
  }
  

  generateNewPlayer(){
    this.btnCreate = true;
    this.newPlayerForm.reset();
  }

}

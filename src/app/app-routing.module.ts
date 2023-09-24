import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EjerciciosComponent } from './ejercicios/ejercicios.component';
import { JugadoresComponent } from './jugadores/jugadores.component';


const routes: Routes = [
  { path: 'jugadores', component: JugadoresComponent },
  { path: 'ejercicios', component: EjerciciosComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

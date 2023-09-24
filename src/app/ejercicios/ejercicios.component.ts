import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.component.html',
  styleUrls: ['./ejercicios.component.scss']
})
export class EjerciciosComponent implements OnInit {


  public numeroParImpar: number;
  public resultado: string;
  public texto1: any;
  public texto2: any;
  public texto1Original: string;
  public texto2Original: string;
  public resultadoAnagrama: string;

  constructor() { }

  ngOnInit(): void {
  }

  parOImpar(){
    if(this.numeroParImpar % 2 == 0){
     return this.resultado = `El número ${this.numeroParImpar} es Par`;
    }
    this.resultado = `El número ${this.numeroParImpar} es Impar`;
  }

  convertirAnagrama(){
    this.texto1Original = this.texto1;
    this.texto2Original = this.texto2;
    
    this.texto1 = this.texto1.toLowerCase();
    this.texto2 = this.texto2.toLowerCase();

    this.texto1 = this.texto1.split("");
    this.texto2 = this.texto2.split("");

    this.texto1 = this.texto1.sort();
    this.texto2 = this.texto2.sort();

    this.texto1 =  this.texto1.join("");
    this.texto2 = this.texto2.join("");

    if(this.texto1 === this.texto2){
      this.texto1 = this.texto1Original;
      this.texto2 = this.texto2Original;
       this.resultadoAnagrama = `La palabra ${this.texto1Original} es anagrama de ${this.texto2Original}`;
    }else{
       this.resultadoAnagrama = `La palabra ${this.texto1Original} NO es anagrama ${this.texto2Original}`;
    }    
    this.texto1 = this.texto1Original;
    this.texto2 = this.texto2Original;
  }

  verificarAnagrama(){
    
  }

  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const maxLength = 4;

    // Limitar la longitud máxima
    if (inputElement.value.length > maxLength) {
      alert("el Número ingresado es mayor a 4 digitos, se tomara solo los cuatro primeros");
      inputElement.value = inputElement.value.slice(0, maxLength);
      this.numeroParImpar = parseInt(inputElement.value, 10); // Actualiza el modelo si es necesario
    }

    if(this.numeroParImpar % 2 == 0){
      return this.resultado = `El número ${this.numeroParImpar} es Par`;
     }
     this.resultado = `El número ${this.numeroParImpar} es Impar`;
  }

}

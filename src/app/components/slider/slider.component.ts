import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
declare var $: any;

@Component({
	selector: 'slider',
	templateUrl: './slider.component.html',
	styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

	//Recogemos la propiedad enviada desde otro componente
	@Input() ancho: number;
	@Input('etiquetas') captions: boolean;
	@Output() conseguirAutor = new EventEmitter();

	public autor: any;


	constructor() {

		this.autor = {
			nombre: "Daniel Rubio",
			website: "linkedin.com/in/daniel-rubio-rubia"
		}
	}

	ngOnInit(): void {
		$('.galeria').bxSlider({
			mode: 'fade',
			captions: this.captions,
			slideWidth: this.ancho

		});	
	}

	lanzar(event){
		//Emitimos el objeto json al otro componente
		this.conseguirAutor.emit(this.autor);
	}

}

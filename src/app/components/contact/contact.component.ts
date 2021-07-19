import { Component, OnInit, ViewChild } from '@angular/core';
//import * as $ from 'JQuery';
declare const $:any;

@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
	public widthSlider: number;
	public anchoToSlider: any;
	public etiquetas: boolean;
	public autor: any;

	@ViewChild('textos', {static: true}) textos;


	constructor() {
		this.widthSlider = 800;
	}

	ngOnInit(): void {
		this.eventosJquery();
		this.cargarSlider();
		//var opcion_clasica = document.querySelector('#texto').innerHTML;

	}

	ngAfterViewInit():void {
		//console.log(this.textos.nativeElement.textContent);
	}

	cargarSlider(){
		this.anchoToSlider = this.widthSlider;
		this.etiquetas = true;
	}

	resetSlider(){
		this.anchoToSlider = false;
	}

	getAutor(event){
		this.autor = event;
	}

	eventosJquery(){
		var click = false;

		$("#logo").click(function(e){
			//Ignoramos la accion
			e.preventDefault();

			var header = 	$("header");

			if(!click){
				header.css("background", "green")
				.css("font-size", "25px");
				click = true;
			}else{
				header.css("background", "")
				.css("font-size", "");
				click = false;
			}
		});
	}

}

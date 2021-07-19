import { Injectable } from '@angular/core';
import { Global } from './global';

@Injectable()
export class UploadService{
	public url: string;

	constructor(){
		this.url = Global.url;
	}

	makeFileRequest(url: string, params: Array<string>, files: Array<File>, name: string){
		//Devolvemos una promesa AJAX
		return new Promise(function(resolve, reject){
			var formData: any = new FormData();

			//Ajax
			var xhr = new XMLHttpRequest();

			//Recorremos el array de archivos y los adjuntamos en el formulario
			for(var i = 0; i < files.length; i++){
				formData.append(name, files[i], files[i].name);
			}

			//Cuando hay algun cambio en la peticion
			xhr.onreadystatechange = function(){
				//Comprobamos si la peticion ha sido exitosa
				if(xhr.readyState == 4){
					if(xhr.status == 200){
						resolve(JSON.parse(xhr.response));
						
					}else{
						reject("Error en la peticion" +  xhr.response);
					}
				}
			}

			//Realizamos la peticion enviando los datos
			xhr.open('POST', url, true);
			xhr.send(formData);

		});
	}
}
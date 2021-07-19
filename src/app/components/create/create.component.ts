import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.css'],
	providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {
	//Atributos
	public title: string;
	public project: Project;
	public save_project: Project; 
	public status: string;
	public filesToUpload: Array<File>;
	public url: string;

	constructor(
		private _projectService: ProjectService,
		private _uploadService: UploadService
		)
	{
		this.title = "Crear proyecto";
		this.project = new Project('', '', '', '', 2021, '', '');
		this.status = '';
		this.filesToUpload = new Array();
		this.save_project = new Project('', '', '', '', 0, '', '');
		this.url = Global.url;
	}

	ngOnInit(): void {
	}

	onSubmit(form: any){
		//Llamamos al metodo del CONTROLADOR que guarda el PROYECTO
		// Guardar datos básicos
		this._projectService.saveProject(this.project).subscribe(
			response => {

				//Comprobamos si el proyecto ha llegado
				if(response.project){
					if(this.filesToUpload.length > 0){
						// Subir la imagen
						this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id, [], this.filesToUpload, 'image')
						.then((result: any) => {
							
						});
					}

					this.save_project = response.project;
					this.status = 'success';
					form.reset();
					
				}else{
					this.status = 'failed';
				}
			},
			error => {
				console.log(<any>error);
			}
			);
	}

	fileChangeEvent(fileInput: any){
		//Obtenemos los archivos para subir
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}

}

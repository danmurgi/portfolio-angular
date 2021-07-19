import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
	selector: 'app-edit',
	templateUrl: '../create/create.component.html',
	styleUrls: ['./edit.component.css'],
	providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {
	//Atributos
	public title: string;
	public project: Project;
	public save_project: Project; 
	public status: string;
	public filesToUpload: Array<File>;
	public url: string;


	constructor(
		private _projectService: ProjectService,
		private _uploadService: UploadService,
		private _router: Router,
		private _route: ActivatedRoute
		)
	{
		this.title = "Editar proyecto";
		this.project = new Project();
		this.status = '';
		this.filesToUpload = new Array();
		this.save_project = new Project();
		this.url = Global.url;
	}

	ngOnInit(): void {
		// Recogemos los parametros de la URL
		this._route.params.subscribe(params => {
			//Obtenemos el ID
			let id = params.id;

			//Obtenemos el proyecto
			this.getProject(id)
		});
	}

	getProject(id: any){
		this._projectService.getProject(id).subscribe(
			response => {
				//Obtenemos el proyecto
				this.project = response.project;
			},
			error => {
				console.log(<any>error);
			}
			);
	}

	onSubmit(form){
		this._projectService.updateProject(this.project).subscribe(
			response => {
				//Comprobamos si el proyecto ha llegado
				if(response.project){
					if(this.filesToUpload.length >= 1){
						// Subir la imagen
						this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id, [], this.filesToUpload, 'image')
						.then((result: any) => {
							
						});
					}

					this.save_project = response.project;
					this.status = 'success';
					
					
				}else{
					this.status = 'failed';
				}
			},
			error => {
				console.log(<any>error);
			});
	}

	fileChangeEvent(fileInput: any){
		//Obtenemos los archivos para subir
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}

}

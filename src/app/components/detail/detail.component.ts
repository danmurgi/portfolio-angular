import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
	selector: 'app-detail',
	templateUrl: './detail.component.html',
	styleUrls: ['./detail.component.css'],
	providers: [ProjectService]
})
export class DetailComponent implements OnInit {
	public url: string;
	public project: Project;
	public confirm: boolean;

	constructor(
		private _projectService: ProjectService,
		private _router: Router,
		private _route: ActivatedRoute
		) 
	{
		this.url = Global.url; 
		this.project = new Project();
		this.confirm = false;
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

	setConfirm(confirm){
		this.confirm = confirm;
	}

	deleteProject(id: any){
		this._projectService.deleteProject(id).subscribe(
			response => {

				//Si se ha borrado nos dirigimos a proyectos
				if(response.project){
					this._router.navigate(['/proyectos']);
				}
			}, 
			error => {
				console.log(error);
			}
			);
	}

}

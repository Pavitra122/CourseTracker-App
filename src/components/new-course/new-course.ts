import { Component } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
/**
 * Generated class for the NewCourseComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'new-course',
  templateUrl: 'new-course.html'
})
export class NewCourseComponent {

	public departments : any;
	public selectedDepartment : any;
	public courseNumbers : any;
	public selectedNumber : any;

  constructor( public http : Http) {

			this.http.get('http://localhost:5000/v1/get_departments').map(res=> res.json()).subscribe(data =>{
				this.departments = data
				console.log(this.departments[0])
			});

  }
	getCourseNumbers(department)
	{
		console.log(department);
		let body = {
			"department" : department
		};


		this.http.post('http://localhost:5000/v1/get_course_numbers',body).map(res=> res.json()).subscribe(data =>{
			this.courseNumbers = data;
		});
	}

}

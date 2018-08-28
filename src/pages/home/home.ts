import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import {NewCourseComponent} from '../../components/new-course/new-course'
import { AlertController } from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


	public courses : Array<{department: any, courseNumber: any, crn: any, status: any}> = [];
	public server: String;
  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public http : Http, private storage: Storage, private auth: AuthService) {

		//this.server = 'http://localhost:5000';
		this.server = 'http://course-tracker-course-tracker.193b.starter-ca-central-1.openshiftapps.com'


		this.storage.get('courses').then(courses => {
				if(courses == null)
					this.courses = [];
				else
					this.courses = courses;
		});
  }


	addNewCourse()
	{
		// console.log('Adding New Course')
		// let popover = this.popoverCtrl.create(NewCourseComponent);
		// popover.present({
    //
		// });

		let alert = this.alertCtrl.create({
      title: 'Enter CRN',
      //message: 'Enter a name for this new album you\'re so keen on adding',
      inputs: [
        {
          name: 'crn',
          placeholder: 'CRN goes here'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Track',
          handler: data => {
		            console.log(data.crn);
								let body = {
									"crn" : data.crn
								};


								this.http.post(this.server+'/v1/get_course',body).map(res=> res.json()).subscribe(data_temp =>{

									if(data_temp.success == 0)
									{
										this.errorInAddingCourse();
									}
									else
									{
										let body = {
											"CRN": data.crn,
											"department" : data_temp[0],
											"courseNumber" : data_temp[1]
										};
										//this.course = data;
										this.http.post(this.server+'/v1/course_track/add',body).map(res=> res.json()).subscribe(data =>{
												if (data.success == 1)
												{
													let alert = this.alertCtrl.create({
													title: 'Course Added',
													subTitle: "We'll send you a notification once a spot opens up",
													buttons: ['Ok']
													});

													alert.present();

													this.courses.push({department : body['department'] , courseNumber: body['courseNumber'] , crn: body['CRN'], status : "Closed"})
													this.storage.set('courses',this.courses).then(()=>{
									                  console.log('Added new course to storage');
									        });
												}
												else
												{
													this.errorInAddingCourse();
												}
										}, error => {
											this.errorInAddingCourse();
										});

									}
								}, error=>{
									this.errorInAddingCourse();
								});
          }
        }
      ]
    });

    alert.present();

	}

	removeCourse(course)
	{

		let body = {
			"CRN": course.crn,
			"department" : course.department,
			"courseNumber" : course.courseNumber
		};
		this.http.post(this.server+'/v1/course_track/delete',body).map(res=> res.json()).subscribe(data =>{
				if (data.success == 1)
				{
					const index: number = this.courses.indexOf(course);
					if (index !== -1) {
							this.courses.splice(index, 1);
					}
					let alert = this.alertCtrl.create({
					title: 'Course Removed',
					subTitle: "This course is no longer being tracked",
					buttons: ['Ok']
					});

					alert.present();

					this.storage.set('courses',this.courses).then(()=>{
										console.log('Removed  a course');
					});
				}
				else
				{
					this.errorInAddingCourse();
				}
		}, error => {
			this.errorInAddingCourse();
		});

	}

	errorInAddingCourse()
	{
		let alert = this.alertCtrl.create({
		title: 'Error Occured',
		subTitle: 'Please Check your CRN and try again. This can be a server issue as well',
		buttons: ['Ok']
		});

		alert.present();

	}
	signout() {
		this.auth.signOut();
		this.navCtrl.setRoot(HomePage);
	}

}

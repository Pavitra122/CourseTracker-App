import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import {NewCourseComponent} from '../../components/new-course/new-course'
import { AlertController } from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


	public course : any;
  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public http : Http) {

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


								this.http.post('http://localhost:5000/v1/get_course',body).map(res=> res.json()).subscribe(data_temp =>{

									if(data_temp.success == 0)
									{
											let alert = this.alertCtrl.create({
											title: 'CRN Not Found',
											subTitle: 'Please Check your CRN and try again',
											buttons: ['Ok']
											});

											alert.present();
									}
									else
									{
										let body = {
											"courseNumber" : data.crn,
											"department" : data_temp[0],
											"CRN" : data_temp[1]
										};
										this.course = data;
										this.http.post('http://localhost:5000/v1/course_track/add',body).map(res=> res.json()).subscribe(data =>{
												if (data.success == 1)
												{
													let alert = this.alertCtrl.create({
													title: 'Course Added',
													subTitle: "We'll send you a notification once a spot opens up",
													buttons: ['Ok']
													});

													alert.present();
												}
												else
												{
													let alert = this.alertCtrl.create({
													title: 'CRN Not Found',
													subTitle: 'Please Check your CRN and try again',
													buttons: ['Ok']
													});

													alert.present();
												}
										}, error => {
											let alert = this.alertCtrl.create({
											title: 'CRN Not Found',
											subTitle: 'Please Check your CRN and try again',
											buttons: ['Ok']
											});

											alert.present();
										});

									}
								});
          }
        }
      ]
    });

    alert.present();

	}

}

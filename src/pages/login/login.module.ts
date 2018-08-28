import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';

@NgModule({
  declarations: [
    //LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
})
export class LoginPageModule {}
/*
<ion-menu [content]="content">
  <ion-header>
    <ion-toolbar>
      <ion-title>Menu</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content>
    <ion-list>
      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
        {{p.title}}
      </button>
      <ion-item>
        <button ion-button color="primary"  class = 'submitButton'  (click)="signout()" menuToggle>Sign Out</button>
      </ion-item>
      <ion-list radio-group >

            <ion-list-header>
              Datasets
            </ion-list-header>


          <ion-item  *ngFor= "let d of globals.dataset1" (ionSelect)="setDataset(d)">
              <ion-label >
                {{d.req_title}}
              </ion-label>
              <ion-radio  value="{{d.req_title}}" menuToggle></ion-radio>
          </ion-item>

    </ion-list>


    </ion-list>
  </ion-content>

</ion-menu>

<!-- Disable swipe-to-go-back because it's poor UX to combine STGB with side menus -->
<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>
*/

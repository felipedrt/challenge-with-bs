import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  
  //#region Constructor

  constructor(private router: Router) {}

  //#endregion

  //#region Methods

  public navigate(pageName: string) {
    switch(pageName) {
      case 'device':
        this.router.navigate(['deviceManagement']) 
      break;

      case 'category':
        this.router.navigate(['categoryManagement']) 
      break;
    }
  }

  //#endregion

  //#endregion
}

import { PagerService } from './../_services/pager.service';
import { AlertService } from './../_services/alert.service';
import { AdminService } from './../_services/admin.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: any[] = [];
  flag = false; flag1 = false;
  images = [];
  // array of all items to be paged
  private allItems = new Array();
  constructor(private adminService: AdminService,
              private alertService: AlertService
              ) { }

  ngOnInit() {
  }

  activeUsers() {
    /*
    this.adminService.getUsers()
        .subscribe(data => {this.users = data; this.allItems = data; this.pagedItems = data; },
          error => { this.alertService.error = error; } );
     */
    const tempusers = this.adminService.getUsers();
    this.users = tempusers;
    this.flag = true;
  }

  getInfo(tempUser) {
    this.alertService.success(' Comming soon !!! ') ;
  }

  back() {
    this.flag = false;
  }
back1() {
  this.flag1 = false;
}

getImages() {
  let tempimages;
  let temp = { fieldname: '' ,
  originalname: '',
  destination: 'uploads/',
  filename: '',
  path: ''};

  this.adminService.getImages()
        .subscribe(data => { this.images = data; },
          error => { this.alertService.error = error ; } );

          /*
  tempimages.forEach(e1 => {
    console.log('e1 : ' + e1);
    temp = { fieldname: e1.fieldname, originalname: e1.originalname,
            destination: e1.destination, filename: e1.filename,
          path: e1.path + '.jpg'};
    this.images.push(temp);
  });
  */
  this.flag1 = true;
}


}

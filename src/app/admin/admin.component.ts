import { PagerService } from './../_services/pager.service';
import { AlertService } from './../_services/alert.service';
import { AdminService } from './../_services/admin.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users = [];
  flag = false;
  pager: any = {};
  // paged items
  pagedItems: any[];
  // array of all items to be paged
  private allItems: any[];
  constructor(private adminService: AdminService,
              private alertService: AlertService,
              private http: HttpClient,
              private pagerService: PagerService) { }

  ngOnInit() {
    // get dummy data
    this.http.get('./dummy-data.json')
    .subscribe( data => {
      this.allItems = data;
      this.setPage(1);
    },
                                                  error => {}
                                                  );
  }

  activeUsers() {
    this.adminService.getUsers()
        .subscribe(data => {this.users = data; },
          error => { this.alertService.error = error; } );
    this.flag = true;
  }

  getInfo(tempUser) {
    this.alertService.success(' Comming soon !!! ') ;
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
}

}
